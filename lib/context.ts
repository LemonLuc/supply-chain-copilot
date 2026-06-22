import { workflowKeys, workflows, type WorkflowKey, type WorkflowSource } from "./demo-data";
import { canAccessWorkflow, getPersonaPolicy, normalizePersona } from "./permissions";

export function normalizeWorkflowKey(value: unknown): WorkflowKey {
  return typeof value === "string" && workflowKeys.includes(value as WorkflowKey)
    ? (value as WorkflowKey)
    : "risks";
}

export type RoleToolSource = WorkflowSource & {
  toolId: string;
  workflowKey: WorkflowKey;
  workflowLabel: string;
};

export function buildRoleToolSources(personaValue?: unknown): RoleToolSource[] {
  const policy = getPersonaPolicy(personaValue);

  return policy.allowedWorkflows.flatMap((workflowKey) =>
    workflows[workflowKey].sources.map((source) => ({
      ...source,
      toolId: `${workflowKey}:${source.id}`,
      workflowKey,
      workflowLabel: workflows[workflowKey].navLabel,
    })),
  );
}

export function resolveWorkflowForPrompt(prompt: string, personaValue?: unknown): WorkflowKey {
  const policy = getPersonaPolicy(personaValue);
  const normalizedPrompt = prompt.toLowerCase();
  const candidates: Array<[WorkflowKey, string[]]> = [
    ["consolidate", ["heat map", "heatmap", "consolidate", "portfolio", "tail-spend", "resilience"]],
    ["delay", ["alternative", "alternatives", "alternate", "turret", "supplier overview", "supplier risk", "capacity register", "delayed", "delay"]],
    ["risks", ["risk", "delivery", "shipment", "carrier", "milestone", "freight", "fedex", "dhl"]],
  ];
  const match = candidates.find(([workflowKey, keywords]) =>
    policy.allowedWorkflows.includes(workflowKey) && keywords.some((keyword) => normalizedPrompt.includes(keyword)),
  );

  return match?.[0] ?? policy.allowedWorkflows[0] ?? "risks";
}

const sourceActivityTokens: Record<string, string[]> = {
  sap: ["SAP"],
  dhl: ["DHL"],
  fedex: ["FedEx"],
  warehouse: ["EWM"],
  quality: ["Quality"],
  excel: ["SharePoint"],
  capacity: ["capacity"],
  contracts: ["Contract"],
  resilience: ["Resilience"],
  policy: ["Policy"],
};

function sourceSetIncludesAll(selectedSourceIds: Set<string>, requiredSourceIds: string[] | undefined): boolean {
  return !requiredSourceIds?.length || requiredSourceIds.every((sourceId) => selectedSourceIds.has(sourceId));
}

function buildSelectedAnswer(
  workflow: (typeof workflows)[WorkflowKey],
  selectedRows: Array<Omit<(typeof workflow.rows)[number], "financial">>,
  allRowsAvailable: boolean,
  canViewFinancials: boolean,
) {
  if (allRowsAvailable) {
    return {
      headline: workflow.headline,
      summary: workflow.summary,
      metrics: workflow.metrics,
      ...(canViewFinancials ? { financialMetrics: workflow.financialMetrics } : {}),
    };
  }

  if (selectedRows.length === 0) {
    return {
      headline: "No records returned from selected sources",
      summary:
        "The selected authorized sources did not return enough evidence for this workflow. Re-enable the relevant source or request access to the missing connector.",
      metrics: [
        ["Selected records", "0"],
        ["Evidence status", "Incomplete"],
      ],
      ...(canViewFinancials ? { financialMetrics: undefined } : {}),
    };
  }

  return {
    headline: "Selected source records returned",
    summary: selectedRows
      .map((row) => `${row.subject}: ${row.status}. ${row.evidence}`)
      .join(" "),
    metrics: [
      ["Selected records", String(selectedRows.length)],
      ["Evidence status", "Filtered"],
    ],
    ...(canViewFinancials ? { financialMetrics: undefined } : {}),
  };
}

export function buildAppContext(
  value: unknown,
  personaValue?: unknown,
  selectedSourceValue?: unknown,
) {
  const key = normalizeWorkflowKey(value);
  const persona = normalizePersona(personaValue);
  const policy = getPersonaPolicy(persona);
  const requestedWorkflow = workflows[key];
  const allowed = canAccessWorkflow(persona, key);
  const workflow = allowed ? requestedWorkflow : workflows.risks;
  const requestedSourceIds = Array.isArray(selectedSourceValue)
    ? selectedSourceValue.filter((item): item is string => typeof item === "string")
    : workflow.sources.filter((source) => source.selected).map((source) => source.id);
  const selectedSourceIds = new Set(
    requestedSourceIds.filter((id) => workflow.sources.some((source) => source.id === id)),
  );
  const selectedSources = workflow.sources.filter((source) => selectedSourceIds.has(source.id));
  const activityTokens = selectedSources.flatMap((source) => sourceActivityTokens[source.id] ?? []);
  const selectedRows = workflow.rows
    .filter((row) => sourceSetIncludesAll(selectedSourceIds, row.sourceIds))
    .map(({ financial, ...row }) => (policy.canViewFinancials ? { ...row, financial } : row));
  const allRowsAvailable = workflow.rows.every((row) => sourceSetIncludesAll(selectedSourceIds, row.sourceIds));
  const selectedActions = workflow.actions.filter((action) =>
    sourceSetIncludesAll(selectedSourceIds, action.sourceIds),
  );
  const selectedDocuments = workflow.documents?.filter((document) =>
    sourceSetIncludesAll(selectedSourceIds, document.sourceIds),
  );

  return {
    persona: {
      id: persona,
      canViewFinancials: policy.canViewFinancials,
      allowedWorkflows: policy.allowedWorkflows,
    },
    workflow: {
      key: allowed ? key : "risks",
      question: workflow.question,
      accessAllowed: allowed,
    },
    answer: buildSelectedAnswer(workflow, selectedRows, allRowsAvailable, policy.canViewFinancials),
    sources: selectedSources,
    selectedAuthorizedSources: selectedSources,
    activity: workflow.activity.filter((step) =>
      step.sourceIds
        ? sourceSetIncludesAll(selectedSourceIds, step.sourceIds)
        : activityTokens.some((token) => step.tool.includes(token)),
    ),
    analysisTrace: workflow.analysisTrace,
    ...(workflow.heatMap ? { decisionSupport: { heatMap: workflow.heatMap } } : {}),
    ...(workflow.approval ? { approval: workflow.approval } : {}),
    recommendedActions: selectedActions,
    rows: selectedRows,
    ...(selectedDocuments?.length ? { documents: selectedDocuments } : {}),
  };
}

export type AppContext = ReturnType<typeof buildAppContext>;
