import { suppliers, workflowKeys, workflows, type WorkflowKey } from "./demo-data";
import { getPersonaPolicy, normalizePersona } from "./permissions";

export function normalizeWorkflowKey(value: unknown): WorkflowKey {
  return typeof value === "string" && workflowKeys.includes(value as WorkflowKey)
    ? (value as WorkflowKey)
    : "risks";
}

export function buildAppContext(value: unknown, personaValue?: unknown) {
  const key = normalizeWorkflowKey(value);
  const persona = normalizePersona(personaValue);
  const policy = getPersonaPolicy(persona);
  const workflow = workflows[key];
  const visibleSuppliers = suppliers.map(({ impact, ...supplier }) =>
    policy.canViewSupplierImpact ? { ...supplier, impact } : supplier,
  );

  return {
    persona: {
      id: persona,
      canViewSupplierImpact: policy.canViewSupplierImpact,
    },
    workflow: {
      key,
      question: workflow.question,
      confidence: workflow.confidence,
    },
    answer: {
      headline: workflow.headline,
      summary: workflow.summary,
      impacts: workflow.impacts,
    },
    recommendedActions: workflow.actions,
    suppliers: visibleSuppliers,
    highlightedSuppliers: workflow.highlights,
    metrics: {
      supplierCount: suppliers.length,
      openAlerts: suppliers.filter((supplier) => supplier.risk !== "Low").length * 2,
      revenueAtRisk: workflows.risks.impacts[1][1],
    },
  };
}

export type AppContext = ReturnType<typeof buildAppContext>;
