import { describe, expect, it } from "vitest";

import { buildAppContext, buildRoleToolSources, normalizeWorkflowKey, resolveWorkflowForPrompt } from "./context";

describe("buildAppContext", () => {
  it("builds a least-privilege operational context for logistics", () => {
    const context = buildAppContext("risks");

    expect(context.workflow).toEqual({
      key: "risks",
      question: "Is there any delivery risk this week for N-FK5 optical glass blanks used in the Axioscan 7 objective module?",
      accessAllowed: true,
    });
    expect(context.answer.headline).toBe("Delivery exception found");
    expect(context.answer).not.toHaveProperty("financialMetrics");
    expect(context.rows[0]).not.toHaveProperty("financial");
    expect(context.persona).toEqual({
      id: "logistics",
      canViewFinancials: false,
      allowedWorkflows: ["risks"],
    });
  });

  it("includes financial fields for procurement leads", () => {
    const context = buildAppContext("risks", "procurement");

    expect(context.persona.canViewFinancials).toBe(true);
    expect(context.answer.financialMetrics).toEqual([
      ["Expedite option", "€8,400"],
      ["Avoided downtime", "€185,000"],
    ]);
    expect(context.rows[0]).toHaveProperty("financial", "€185K downtime exposure");
  });

  it("limits operational evidence to multiple selected authorized sources", () => {
    const context = buildAppContext("risks", "logistics", ["dhl", "warehouse", "unknown"]);

    expect(context.sources.map((source) => source.id)).toEqual(["dhl", "warehouse"]);
    expect(context.selectedAuthorizedSources.map((source) => source.id)).toEqual(["dhl", "warehouse"]);
    expect(context.activity.map((step) => step.tool)).toEqual(["DHL Freight MCP", "SAP EWM MCP"]);
    expect(context.rows.map((row) => row.subject)).toEqual(["PO 4500872319 · DHL Freight"]);
  });

  it("limits operational evidence to one selected authorized source", () => {
    const context = buildAppContext("risks", "logistics", ["fedex"]);

    expect(context.sources.map((source) => source.id)).toEqual(["fedex"]);
    expect(context.selectedAuthorizedSources.map((source) => source.id)).toEqual(["fedex"]);
    expect(context.activity.map((step) => step.tool)).toEqual(["FedEx MCP"]);
    expect(context.rows.map((row) => row.subject)).toEqual(["PO 4500872481 · FedEx Priority"]);
  });

  it("falls back to the risk radar when logistics requests a restricted workflow", () => {
    const context = buildAppContext("delay", "logistics");

    expect(context.workflow.key).toBe("risks");
    expect(context.workflow.accessAllowed).toBe(false);
    expect(context.answer.headline).toBe("Delivery exception found");
    expect(context).not.toHaveProperty("decisionSupport");
  });

  it("includes workflow-specific synthetic decision data for authorized executive requests", () => {
    const context = buildAppContext("consolidate", "executive");

    expect(context.workflow.key).toBe("consolidate");
    expect(context.workflow.accessAllowed).toBe(true);
    expect(context.decisionSupport?.heatMap).toEqual([
      { supplier: "Supplier H", cost: "High", resilience: "High", recommendation: "Consolidate volume" },
      { supplier: "Supplier J", cost: "Medium", resilience: "High", recommendation: "Retain as primary" },
      { supplier: "Supplier M", cost: "High", resilience: "Medium", recommendation: "Renegotiate or consolidate" },
      { supplier: "Supplier A", cost: "High", resilience: "Low", recommendation: "Protect and qualify backup" },
      { supplier: "Supplier Q", cost: "Medium", resilience: "Low", recommendation: "Retain for redundancy" },
    ]);
    expect(context.approval).toEqual({
      label: "C-level approval required",
      detail:
        "Any supplier termination or material volume reallocation remains blocked until an executive reviewer approves the decision record.",
    });
  });

  it("does not leak restricted workflow synthetic data when access is denied", () => {
    const context = buildAppContext("consolidate", "procurement");

    expect(context.workflow.key).toBe("risks");
    expect(context.workflow.accessAllowed).toBe(false);
    expect(context.answer.headline).toBe("Delivery exception found");
    expect(JSON.stringify(context)).not.toContain("Supplier H");
    expect(JSON.stringify(context)).not.toContain("C-level approval required");
  });
});

describe("buildRoleToolSources", () => {
  it("exposes only risk-radar sources to logistics planners", () => {
    const sources = buildRoleToolSources("logistics");

    expect(sources.map((source) => source.toolId)).toEqual([
      "risks:sap",
      "risks:dhl",
      "risks:fedex",
      "risks:ups",
      "risks:warehouse",
      "risks:outlook",
    ]);
    expect(sources.map((source) => source.workflowKey)).not.toContain("delay");
    expect(sources.map((source) => source.workflowKey)).not.toContain("consolidate");
  });

  it("exposes sources from all three authorized workflows to executives", () => {
    const sources = buildRoleToolSources("executive");

    expect(sources.some((source) => source.toolId === "risks:dhl")).toBe(true);
    expect(sources.some((source) => source.toolId === "delay:quality")).toBe(true);
    expect(sources.some((source) => source.toolId === "consolidate:contracts")).toBe(true);
    expect(sources).toHaveLength(18);
  });
});

describe("resolveWorkflowForPrompt", () => {
  it("selects the supplier alternatives workflow when an authorized prompt asks for alternates", () => {
    expect(resolveWorkflowForPrompt("Which approved alternatives can cover the turret delay?", "procurement")).toBe("delay");
  });

  it("falls back to an authorized workflow when the matching workflow is restricted", () => {
    expect(resolveWorkflowForPrompt("Give me a cost-versus-resilience heat map.", "procurement")).toBe("risks");
  });
});

describe("normalizeWorkflowKey", () => {
  it("falls back to risks for an unknown workflow", () => {
    expect(normalizeWorkflowKey("unknown")).toBe("risks");
  });
});
