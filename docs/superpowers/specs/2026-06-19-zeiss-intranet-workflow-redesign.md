# ZEISS-Inspired Intranet Workflow Redesign

## Goal

Turn the existing supply-chain demo into a realistic intranet operations console for an optics and optoelectronics manufacturer. The product should show how planners and procurement teams move from manually reconciling SAP, supplier portals, Excel, quality systems, logistics updates, and email to a grounded Supply Chain Hub workflow powered by OpenAI.

## Visual Direction

The interface uses the public ZEISS color system as inspiration without copying the ZEISS logo or presenting the demo as an official ZEISS product.

- White and black dominate the interface.
- Indigo `#0F2DB3` provides a restrained identity accent.
- Azure `#0072EF` is the primary interaction color.
- Violet `#8F3CFB` may accent non-interactive analytical content sparingly.
- Lime `#D9E906` is reserved for freshness or completed-state highlights.
- No gradients. Shadows are subtle and operational density is prioritized.

## Identity And Intranet Access

Remove the editable Persona selector. A server-side `getCurrentUser()` adapter supplies a mock authenticated identity with name, role, business unit, and persona. The default mock identity is a standard logistics planner and therefore preserves least privilege.

The client receives the resolved identity as page data and displays a read-only signed-in user panel. The chat route resolves the same server-side identity and never accepts persona or permission flags from the browser.

For a real intranet deployment, the adapter can be replaced by Microsoft Entra ID, Okta, Auth.js, or an existing authentication proxy. Directory group claims map to application personas and capabilities. The demo does not add real credentials, tenant configuration, or external authentication calls.

## Product Language

All visible references to “Copilot” become “Supply Chain Hub.” The primary chat heading is “Ask Supply Chain Hub,” assistant messages are labeled “Supply Chain Hub,” and the answer region is labeled “Supply Chain Hub analysis.”

Remove the bottom Demo prompts and Talk track section and delete its unused data and styling.

## Workflow Experience

Each workflow contains an operational transformation band with two sides:

- **Before:** the manual systems, handoffs, exports, and reconciliation work.
- **With Supply Chain Hub:** the authorized retrieval, deterministic analysis, OpenAI synthesis, evidence, guardrails, and human approval path.

The band sits below chat and above the analysis so users understand the workflow while still operating the tool.

### Workflow 1: Weekly Supply Risk

Before, a planner checks SAP open purchase orders and inventory, supplier portals, Excel scorecards, quality notifications, logistics updates, and email to assemble a weekly risk view.

With Supply Chain Hub, one question retrieves authorized records, reconciles supplier signals, ranks disruption and recoverability, exposes source freshness, and proposes evidence-backed actions for human approval.

### Workflow 2: Supplier A Delayed 14 Days

Before, a planner exports BOM and inventory data, searches affected production orders, contacts procurement and production planning, and builds a spreadsheet scenario.

With Supply Chain Hub, the question triggers retrieval of inventory cover, BOM where-used, open production and customer orders, qualified alternates, logistics options, and allocation policy. Deterministic scenario logic calculates the production gap and cost; OpenAI presents the result and mitigation choices.

### Workflow 3: Procurement Optimization With Guardrails

Before, procurement reviews spend and contracts periodically, often separately from quality, delivery, capacity, disruption, and resilience signals.

With Supply Chain Hub, the tool combines spend, contract, supplier performance, capacity, and operational-risk data. Guardrails preserve critical redundancy and prevent savings recommendations that create unacceptable concentration risk.

## Synthetic Operating Data

Supplier categories and currencies become more relevant to high-precision optics and optoelectronics: optical glass blanks, precision ceramics, motion-control assemblies, vacuum components, image sensors, high-purity coatings, industrial electronics, and sterile packaging. All names and values remain synthetic and use EUR.

## Components And Data Flow

- `lib/auth.ts` owns mock session resolution and identity types.
- `app/page.tsx` resolves the user on the server and passes it to the client application.
- `app/api/chat/route.ts` resolves identity independently before building permission-filtered context.
- `lib/demo-data.ts` owns the realistic workflow transformation content, sources, dynamic suggested prompts, and operational outcomes.
- `app/supply-chain-app.tsx` renders identity, workflows, transformation band, chat, analysis, actions, and evidence.

## Error Handling

- Missing or unknown mock roles fall back to the logistics persona.
- Chat continues to use deterministic demo mode when no real OpenAI API key exists.
- Authentication is represented as always available in the mock. A production adapter would redirect unauthenticated users through corporate SSO.
- Restricted supplier fields remain absent from server-built context.

## Testing And Verification

- Authentication tests cover default identity, procurement identity, and invalid-role fallback.
- Route tests prove browser-supplied persona values cannot elevate access.
- UI tests verify read-only identity, renamed product language, all three before/with workflow narratives, removal of Talk track, and role-based supplier impact visibility.
- Existing context, mock chat, and API tests remain green.
- Final verification includes tests, typecheck, production build, and browser checks at desktop and mobile widths with no horizontal overflow or console errors.

## Scope

This iteration implements the complete visual and workflow mockup plus an intranet-ready identity boundary. It does not connect to SAP, supplier portals, Entra ID, Okta, production RAG stores, or live enterprise tools.
