# Demo Script

## 5-Minute Screen Recording Intro

**0:00-0:45 - Problem**

"Supply-chain teams have too many disconnected signals: supplier emails, logistics updates, quality issues, inventory reports, and business impact. The goal of this copilot is not to replace planners. It is to compress the first hour of triage into a few minutes."

**0:45-1:45 - What I built**

"This is a lightweight supply-chain copilot demo. It uses synthetic supplier data and three workflows: weekly risk scanning, delay scenario planning, and supplier consolidation. The important design choice is that every answer has evidence next to it, so a user can inspect why the copilot made a recommendation."

**1:45-2:45 - Tooling**

"The setup is intentionally simple. The repo lives in GitHub. Codex helps build and iterate on the app. ChatGPT helps shape business-facing prompts, demo data, and the narrative. The OpenAI API can be added behind the same UI later, but for recording reliability this version is deterministic."

**2:45-4:15 - Architecture**

"The current prototype is a static web app. The supplier table is the source data, and each workflow has a prebuilt copilot response. In a production version, the source data would come from ERP, supplier scorecards, logistics feeds, quality systems, and news or risk signals. The model would produce the same structured answer format: headline, summary, impacts, recommended actions, and evidence."

**4:15-5:00 - Transition**

"I will now demo the three user workflows. The pattern is consistent: ask the business question, review the synthesized answer, inspect the evidence, and decide what action to take."

## Workflow 1: Weekly Risk Scan, 6 Minutes

**Goal:** Identify the top supplier risks this week.

**Prompt:** "What are the current top supply chain risks across all suppliers this week?"

**Flow:**

1. Open the weekly risk scan.
2. Read the headline: three suppliers need attention.
3. Explain the evidence table: Supplier A, Supplier G, and Supplier C are highlighted.
4. Point out the different risk types: delay, weather exposure, and quality.
5. Close with the actions: escalate A, monitor G, open corrective action for C.

**Decision message:** "This turns many supplier signals into a ranked triage list."

## Workflow 2: Supplier A Delay, 6 Minutes

**Goal:** Show what happens if Supplier A is delayed by two weeks.

**Prompt:** "What happens if Supplier A is delayed by 2 weeks?"

**Flow:**

1. Switch to the Supplier A delay workflow.
2. Read the headline: week-3 production gap.
3. Explain why Supplier A is critical: semiconductor category, single-source component, and capacity slip.
4. Walk through impact metrics: production gap, at-risk orders, mitigation cost.
5. Close with mitigation: expedite, product-mix shift, and alternate qualification.

**Decision message:** "This changes the copilot from risk monitor to scenario planner."

## Workflow 3: Supplier Consolidation, 6 Minutes

**Goal:** Recommend where to consolidate suppliers without increasing fragility.

**Prompt:** "Which suppliers should we consolidate, and what is the risk impact?"

**Flow:**

1. Switch to the consolidation workflow.
2. Read the headline: consolidate low-risk tail spend, keep semiconductor redundancy.
3. Explain why some suppliers are consolidation candidates: low switching cost, backup capacity, lower risk.
4. Explain why A and G should not be consolidated: concentration risk is already high.
5. Close with savings and risk impact.

**Decision message:** "The copilot is not just chasing savings. It makes the resilience tradeoff explicit."

## Setup Checklist

- Create or push the GitHub repo.
- Run the app locally and practice clicking the three workflow buttons.
- Record the 5-minute intro separately from the three workflow demos.
- Keep the browser zoom at 90-100% so the evidence table is readable.
- Rehearse the final decision message for each workflow.

