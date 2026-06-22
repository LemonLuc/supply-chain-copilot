import type { PersonaId } from "./permissions";

export type WorkflowKey = "risks" | "delay" | "consolidate";

export type WorkflowSource = {
  id: string;
  name: string;
  category: string;
  detail: string;
  selected: boolean;
};

export type ActivityStep = {
  tool: string;
  detail: string;
  result: string;
  sourceIds?: string[];
};

export type AnalysisTraceStep = {
  label: string;
  detail: string;
  outcome: string;
};

export type WorkflowAction = {
  label: string;
  detail: string;
  kind: "draft" | "update" | "share" | "approval";
  sourceIds?: string[];
};

export type ResultRow = {
  subject: string;
  detail: string;
  status: string;
  evidence: string;
  sourceIds: string[];
  financial?: string;
};

export type WorkflowDocument = {
  name: string;
  sourceIds: string[];
  location: string;
  version: string;
  lastModified: string;
  owner: string;
  summary: string;
  recentChanges: Array<{
    timestamp: string;
    author: string;
    worksheet: string;
    range: string;
    change: string;
    impact: string;
  }>;
  rows: Array<{
    worksheet: string;
    key: string;
    status: string;
    evidence: string;
    owner: string;
    nextReview: string;
  }>;
};

export type HeatMapItem = {
  supplier: string;
  cost: "Low" | "Medium" | "High";
  resilience: "Low" | "Medium" | "High";
  recommendation: string;
};

export type Workflow = {
  navLabel: string;
  title: string;
  question: string;
  description: string;
  minimumPersona: PersonaId;
  accessLabel: string;
  sourceStatus: string;
  suggestedPrompts: string[];
  sources: WorkflowSource[];
  activity: ActivityStep[];
  analysisTrace: AnalysisTraceStep[];
  headline: string;
  summary: string;
  metrics: Array<[string, string]>;
  financialMetrics?: Array<[string, string]>;
  actions: WorkflowAction[];
  rows: ResultRow[];
  documents?: WorkflowDocument[];
  heatMap?: HeatMapItem[];
  approval?: {
    label: string;
    detail: string;
  };
};

export const workflows: Record<WorkflowKey, Workflow> = {
  risks: {
    navLabel: "Risk radar",
    title: "Monday delivery radar",
    question: "Is there any delivery risk this week for N-FK5 optical glass blanks used in the Axioscan 7 objective module?",
    description:
      "Checks open purchase orders and live carrier milestones, then reports only operational exceptions relevant to your role.",
    minimumPersona: "logistics",
    accessLabel: "Available to all supply chain roles",
    sourceStatus: "6 available tools · live demo data",
    suggestedPrompts: [
      "Show me potential delivery risks for this week.",
      "Review Supplier Risk & Capacity Register.xlsx and show me recent changes.",
      "Check whether any carrier milestone changed overnight.",
    ],
    sources: [
      { id: "sap", name: "SAP S/4HANA", category: "ERP MCP", detail: "POs, material master, promised dates", selected: true },
      { id: "dhl", name: "DHL Freight", category: "Carrier MCP", detail: "Road freight milestones and exceptions", selected: true },
      { id: "fedex", name: "FedEx", category: "Carrier MCP", detail: "Priority shipment tracking", selected: true },
      { id: "ups", name: "UPS", category: "Carrier MCP", detail: "Parcel and customs events", selected: false },
      { id: "warehouse", name: "EWM warehouse", category: "SAP MCP", detail: "Goods receipts and available stock", selected: true },
      { id: "outlook", name: "Outlook", category: "Microsoft 365 MCP", detail: "Draft operational follow-ups", selected: false },
    ],
    activity: [
      { tool: "SAP S/4HANA MCP", detail: "Read PO 4500872319 and material N-FK5-110-32", result: "480 blanks due 24 June", sourceIds: ["sap", "dhl"] },
      { tool: "DHL Freight MCP", detail: "Checked shipment 00340434161094000012", result: "Hub departure missed by 19 hours", sourceIds: ["dhl"] },
      { tool: "FedEx MCP", detail: "Checked backup parcel 771924603189", result: "On schedule for 23 June", sourceIds: ["fedex"] },
      { tool: "SAP EWM MCP", detail: "Read Jena receiving stock and reservations", result: "2.5 production days available", sourceIds: ["warehouse"] },
    ],
    analysisTrace: [
      { label: "Understand request", detail: "Identify material, product context and requested delivery window.", outcome: "N-FK5-110-32 · current week" },
      { label: "Check access", detail: "Apply the signed-in role and selected source permissions.", outcome: "Operational fields allowed; financial fields filtered" },
      { label: "Retrieve evidence", detail: "Query the authorized ERP, warehouse and carrier records.", outcome: "Four current records returned" },
      { label: "Validate evidence", detail: "Compare promised dates, carrier milestones and available production stock.", outcome: "One confirmed exception; one shipment on schedule" },
      { label: "Prepare response", detail: "Summarize the exception and offer reversible operational actions.", outcome: "Draft and staged actions only" },
    ],
    headline: "Delivery exception found",
    summary:
      "DHL Freight shipment 00340434161094000012, containing 480 N-FK5 blanks, missed its Leipzig hub departure and is now expected on Thursday, 25 June. The smaller FedEx priority shipment remains on schedule. Current stock covers production until Thursday afternoon.",
    metrics: [
      ["Affected material", "N-FK5-110-32"],
      ["Expected arrival", "Thu, 25 Jun"],
      ["Production buffer", "2.5 days"],
    ],
    financialMetrics: [
      ["Expedite option", "€8,400"],
      ["Avoided downtime", "€185,000"],
    ],
    actions: [
      { label: "Draft email to DHL Freight", detail: "Ask for recovery routing and confirmed ETA.", kind: "draft", sourceIds: ["dhl"] },
      { label: "Notify logistics team lead", detail: "Prepare a concise Teams and email update.", kind: "draft" },
      { label: "Update SAP promised date", detail: "Write 25 June to PO 4500872319 after confirmation.", kind: "update", sourceIds: ["sap", "dhl"] },
    ],
    rows: [
      {
        subject: "PO 4500872319 · DHL Freight",
        detail: "480 N-FK5 optical glass blanks",
        status: "Attention",
        evidence: "Leipzig departure missed; ETA moved from 24 to 25 June",
        sourceIds: ["dhl"],
        financial: "€185K downtime exposure",
      },
      {
        subject: "PO 4500872481 · FedEx Priority",
        detail: "60 N-FK5 optical glass blanks",
        status: "On schedule",
        evidence: "Departed Frankfurt; delivery due 23 June, 10:30",
        sourceIds: ["fedex"],
        financial: "€8.4K expedite charge",
      },
    ],
  },
  delay: {
    navLabel: "Supplier alternatives",
    title: "Operational alternate sourcing",
    question: "What are our approved alternatives if the objective turret supplier for Axioscan 7 is delayed by 12 days?",
    description:
      "Traces the affected orders, checks qualified substitutes and prepares the operational handoffs needed to keep production moving.",
    minimumPersona: "procurement",
    accessLabel: "Procurement Team Lead or higher",
    sourceStatus: "6 available tools · restricted workflow",
    suggestedPrompts: [
      "What approved alternates can cover the delayed turret assemblies?",
      "Which production orders can use an approved alternate turret?",
      "Prepare the supplier risk register update for the logistics lead.",
    ],
    sources: [
      { id: "sap", name: "SAP S/4HANA", category: "ERP MCP", detail: "BOM where-used, orders, inventory", selected: true },
      { id: "quality", name: "Supplier qualification database", category: "Quality MCP", detail: "Approved parts and deviations", selected: true },
      { id: "excel", name: "Supplier Risk & Capacity Register.xlsx", category: "SharePoint MCP", detail: "Operational supplier tracker", selected: true },
      { id: "capacity", name: "Supplier capacity portal", category: "Supplier MCP", detail: "Available capacity and lead time", selected: true },
      { id: "outlook", name: "Outlook", category: "Microsoft 365 MCP", detail: "Draft supplier and team emails", selected: true },
      { id: "teams", name: "Microsoft Teams", category: "Microsoft 365 MCP", detail: "Share approved operational update", selected: false },
    ],
    activity: [
      { tool: "SAP S/4HANA MCP", detail: "Ran BOM where-used for turret assembly 000113-8821", result: "14 released Axioscan 7 orders affected" },
      { tool: "Quality MCP", detail: "Checked approved manufacturer list and deviations", result: "One alternate approved with a torque-test condition" },
      { tool: "Supplier capacity MCP", detail: "Requested current capacity from Mechatronik Süd", result: "Eight units available within six days" },
      { tool: "SharePoint MCP", detail: "Opened Supplier Risk & Capacity Register.xlsx", result: "Row and comment targets identified" },
    ],
    analysisTrace: [
      { label: "Understand request", detail: "Identify the delayed assembly, duration and affected product.", outcome: "Objective turret 000113-8821 · 12 days" },
      { label: "Check access", detail: "Verify team-lead sourcing and supplier qualification access.", outcome: "Operational and commercial fields allowed" },
      { label: "Retrieve evidence", detail: "Trace BOM usage, approved alternates, capacity and supplier tracker records.", outcome: "14 builds and two candidate alternates found" },
      { label: "Validate evidence", detail: "Exclude unapproved substitutes and apply incoming inspection conditions.", outcome: "One conditional alternate remains" },
      { label: "Prepare response", detail: "Build a coverage plan and reversible follow-up actions.", outcome: "Eight builds protected; six require resequencing" },
    ],
    headline: "One approved alternate can protect the first eight builds",
    summary:
      "Mechatronik Süd assembly MT-440B is approved for Axioscan 7 with an incoming torque-test requirement. Eight units can arrive within six days. The remaining six orders should be resequenced while the primary supplier recovers.",
    metrics: [
      ["Affected builds", "14"],
      ["Alternate units", "8"],
      ["Coverage gap", "6 builds"],
    ],
    financialMetrics: [
      ["Alternate premium", "€21,600"],
      ["Expedite estimate", "€4,900"],
    ],
    actions: [
      { label: "Add comment to supplier risk register", detail: "Update the primary supplier row with delay, owner and next review.", kind: "update" },
      { label: "Share risk register with logistics lead", detail: "Prepare the current Excel view for the department lead.", kind: "share" },
      { label: "Draft alternate capacity request", detail: "Ask Mechatronik Süd to reserve eight MT-440B units.", kind: "draft" },
    ],
    rows: [
      {
        subject: "Mechatronik Süd · MT-440B",
        detail: "Approved alternate objective turret",
        status: "Conditional approval",
        evidence: "8 units in 6 days; incoming torque test required",
        sourceIds: ["quality", "capacity", "sap"],
        financial: "€2,700 premium per unit",
      },
      {
        subject: "OptoMotion Brno · OM-17",
        detail: "Potential second alternate",
        status: "Not approved",
        evidence: "Dimensional review complete; endurance validation still open",
        sourceIds: ["quality", "excel"],
        financial: "Commercial quote pending",
      },
    ],
    documents: [
      {
        name: "Supplier Risk & Capacity Register.xlsx",
        sourceIds: ["excel"],
        location: "SharePoint / SMT Procurement / Critical Supplier Continuity",
        version: "version 24.06.21-rc3",
        lastModified: "2026-06-21 17:40 CET",
        owner: "Dana Narid",
        summary:
          "Operational workbook tracking approved alternates, supplier capacity, qualification status, and action owners for Axioscan 7 turret assemblies.",
        recentChanges: [
          {
            timestamp: "2026-06-21 17:40 CET",
            author: "Dana Narid",
            worksheet: "Alternate Coverage",
            range: "F18:H18",
            change: "Mechatronik Süd capacity increased from 6 to 8 units and the reservation expiry moved to 24 June 12:00 CET.",
            impact: "Eight of fourteen affected Axioscan 7 builds can be protected if procurement confirms the reservation today.",
          },
          {
            timestamp: "2026-06-21 12:10 CET",
            author: "Quality MCP sync",
            worksheet: "Qualification Status",
            range: "C27:E27",
            change: "OptoMotion Brno remains marked Not approved because endurance validation is still open.",
            impact: "Do not use OM-17 for released builds until the quality gate changes from open to passed.",
          },
          {
            timestamp: "2026-06-20 16:05 CET",
            author: "Lukas Weber",
            worksheet: "Production Impact",
            range: "B8:D13",
            change: "Six build orders were tagged for resequencing after alternate coverage was capped below total demand.",
            impact: "Logistics needs a resequencing proposal for the remaining six builds before the next production meeting.",
          },
        ],
        rows: [
          {
            worksheet: "Alternate Coverage",
            key: "Mechatronik Süd · MT-440B",
            status: "Conditional approval",
            evidence: "8 units available within 6 days; incoming torque test required.",
            owner: "Dana Narid",
            nextReview: "2026-06-22 09:00 CET",
          },
          {
            worksheet: "Qualification Status",
            key: "OptoMotion Brno · OM-17",
            status: "Not approved",
            evidence: "Dimensional review complete; endurance validation still open.",
            owner: "Supplier Quality",
            nextReview: "2026-06-26 15:00 CET",
          },
          {
            worksheet: "Production Impact",
            key: "AX7 released build set",
            status: "Resequence required",
            evidence: "14 builds affected; 8 covered by approved alternate; 6 remain uncovered.",
            owner: "Lukas Weber",
            nextReview: "2026-06-22 11:30 CET",
          },
        ],
      },
    ],
  },
  consolidate: {
    navLabel: "Executive supplier portfolio",
    title: "Supplier portfolio governance",
    question: "Give me a cost-versus-resilience heat map and recommend where we can consolidate suppliers without weakening continuity.",
    description:
      "Combines commercial and operational evidence, applies resilience guardrails, and routes consequential actions to accountable human reviewers.",
    minimumPersona: "executive",
    accessLabel: "Chief Logistics Officer only · executive approval enforced",
    sourceStatus: "7 available tools · governance policy active",
    suggestedPrompts: [
      "Show supplier consolidation options with cost and resilience tradeoffs.",
      "Which tail-spend suppliers can be consolidated under our dual-source guardrail?",
      "Prepare an executive review pack for the recommended changes.",
    ],
    sources: [
      { id: "sap", name: "SAP spend analytics", category: "ERP MCP", detail: "Category spend and purchase history", selected: true },
      { id: "contracts", name: "Contract repository", category: "Legal RAG", detail: "Terms, notice periods and obligations", selected: true },
      { id: "quality", name: "Supplier scorecards", category: "Quality MCP", detail: "OTD, defects and corrective actions", selected: true },
      { id: "resilience", name: "Resilience signals", category: "Risk MCP", detail: "Capacity, geography and single-source data", selected: true },
      { id: "policy", name: "Procurement policy", category: "Policy RAG", detail: "Approval and dual-source guardrails", selected: true },
      { id: "word", name: "Microsoft Word", category: "Microsoft 365 MCP", detail: "Draft review documents only", selected: false },
    ],
    activity: [
      { tool: "SAP Spend MCP", detail: "Aggregated 12 months of spend by category and supplier", result: "42 active suppliers across 9 categories" },
      { tool: "Contract RAG", detail: "Retrieved notice periods and volume commitments", result: "Three contracts eligible for review this quarter" },
      { tool: "Resilience MCP", detail: "Scored capacity, location and qualification redundancy", result: "Two consolidation options pass dual-source policy" },
      { tool: "Policy RAG", detail: "Applied procurement policy SC-17 and approval matrix", result: "Contract termination requires C-level approval" },
    ],
    analysisTrace: [
      { label: "Understand request", detail: "Identify the portfolio scope, decision criteria and requested action.", outcome: "Cost versus resilience · consolidation" },
      { label: "Check access", detail: "Verify Chief Logistics Officer access to portfolio and financial data.", outcome: "Executive view authorized" },
      { label: "Retrieve evidence", detail: "Combine spend, contracts, quality, capacity and resilience records.", outcome: "42 suppliers across nine categories" },
      { label: "Validate evidence", detail: "Apply dual-source, quality, notice-period and continuity guardrails.", outcome: "Two candidates pass all checks" },
      { label: "Prepare response", detail: "Create recommendations while blocking irreversible supplier actions.", outcome: "Executive review required before termination" },
    ],
    headline: "Two consolidation candidates pass the resilience guardrails",
    summary:
      "Sterile packaging and standard machined brackets show overlapping capacity, stable quality and qualified backups. Optical glass and motion-control assemblies remain protected. The tool may prepare review materials, but it cannot terminate a supplier contract.",
    metrics: [
      ["Candidates", "2"],
      ["Protected categories", "4"],
      ["Policy checks", "12 passed"],
    ],
    financialMetrics: [
      ["Annual opportunity", "€740K–€960K"],
      ["Transition budget", "€180K"],
    ],
    actions: [
      { label: "Prepare executive review pack", detail: "Create the evidence summary, heat map and decision record.", kind: "draft" },
      { label: "Request executive review", detail: "Route the recommendation to the C-level approval queue.", kind: "approval" },
      { label: "Draft contract termination", detail: "Prepare a non-binding draft; no notice is sent.", kind: "draft" },
    ],
    rows: [
      {
        subject: "Sterile packaging",
        detail: "Suppliers H, J and K",
        status: "Consolidation candidate",
        evidence: "Validated capacity at two suppliers; stable service and quality",
        sourceIds: ["sap", "contracts", "quality", "resilience", "policy"],
        financial: "€410K–€520K opportunity",
      },
      {
        subject: "Standard machined brackets",
        detail: "Suppliers M, N and P",
        status: "Consolidation candidate",
        evidence: "Interchangeable drawings; three qualified sources in Germany",
        sourceIds: ["sap", "contracts", "quality", "resilience", "policy"],
        financial: "€330K–€440K opportunity",
      },
      {
        subject: "Optical glass blanks",
        detail: "Suppliers A and Q",
        status: "Protected",
        evidence: "Limited qualified furnace capacity; dual-source guardrail applies",
        sourceIds: ["sap", "contracts", "quality", "resilience", "policy"],
        financial: "No consolidation recommended",
      },
    ],
    heatMap: [
      { supplier: "Supplier H", cost: "High", resilience: "High", recommendation: "Consolidate volume" },
      { supplier: "Supplier J", cost: "Medium", resilience: "High", recommendation: "Retain as primary" },
      { supplier: "Supplier M", cost: "High", resilience: "Medium", recommendation: "Renegotiate or consolidate" },
      { supplier: "Supplier A", cost: "High", resilience: "Low", recommendation: "Protect and qualify backup" },
      { supplier: "Supplier Q", cost: "Medium", resilience: "Low", recommendation: "Retain for redundancy" },
    ],
    approval: {
      label: "C-level approval required",
      detail:
        "Any supplier termination or material volume reallocation remains blocked until an executive reviewer approves the decision record.",
    },
  },
};

export const workflowKeys = Object.keys(workflows) as WorkflowKey[];
