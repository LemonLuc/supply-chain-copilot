# Supply Chain Hub Slidev Demo Video Scripts

Target length: 5:00-5:30 each. Recording structure for all versions:

1. **Slidev Slide 5, camera visible**: "Supply Chain Hub as the enterprise decision interface."
2. **Switch to the live Supply Chain Hub frontend, camera hidden**: this should take most of the video.
3. **Return to Slidev Slide 6, camera visible**: explain the architecture and close with the cliff hanger.

Keep the live tool section tight: settings, prompt, records, actions, human-in-the-loop handoff.

## Script 1: Governed Decision Layer

**0:00-0:45 - Slide 5, Camera Visible**

Meet Supply Chain Hub: the enterprise decision interface for supply-chain teams that need to move from fragmented signals to governed action.

The reason we need this is simple. In complex manufacturing, the data usually exists, but the decision context is scattered across SAP, warehouse systems, carrier milestones, supplier updates, files, and email threads. Slide 5 shows the proposition: a ChatGPT-style communication interface, an enterprise operating model, and an OpenAI API / SDK integration layer that connects tools and workflows without replacing systems of record.

Now I will move from the proposal into the live tool.

**0:45-4:30 - Live Tool, Camera Hidden**

Here we are in Supply Chain Hub. I start with the configuration a new user would see. In settings, I can choose the model and reasoning level, and more importantly, I can choose the enterprise tools this workflow is allowed to use.

For this logistics view, the authorized sources are SAP S/4HANA, shipping providers like DHL and FedEx, the EWM warehouse, and Outlook for operational follow-ups. The design principle is least privilege: the interface is conversational, but the context is assembled server-side from only the sources this role is allowed to access.

Now I ask the business question: "Show me potential delivery risks for this week."

The user does not need to know which system contains the answer. Behind the scenes, the OpenAI-powered layer frames the request, checks the selected tools, retrieves the relevant operational records, and returns a concise answer with evidence.

Here we see the risk: DHL Freight shipment 00340434161094000012 missed its Leipzig hub departure. It contains 480 N-FK5 optical glass blanks. The expected arrival moved to Thursday, 25 June, and current stock covers production until Thursday afternoon.

Now I move from the assistant answer to the records below. This is where trust is built. The findings table shows the affected material, the status, the expected arrival, and the production buffer. DHL has the exception. FedEx is still on schedule and protects the line start. The user can inspect why this is an attention item rather than just another alert.

The next step is where Supply Chain Hub becomes more than a dashboard. I open Actions. I can draft an email to DHL Freight asking for recovery routing and a confirmed ETA. I can create an Outlook follow-up task to track the recovery confirmation before noon. And I can write Dana Narid for review, so the procurement lead sees the summary, the evidence, and the requested action.

The boundary is deliberate. Supply Chain Hub can stage or draft actions, but consequential decisions stay human-controlled. The pattern is: ground, reason, recommend, and route for approval.

**4:30-5:30 - Slide 6, Camera Visible**

Back on Slide 6, this is the architecture behind what we just saw. The Supply Chain Hub app is where the user asks, reviews evidence, and approves. The OpenAI integration layer uses the API, SDK, chat route, and MCP tools to ground the answer and coordinate tool calls. Governance applies role scope, source filtering, masking, and approvals. ZEISS systems remain the source of truth.

The interesting question is what happens next. What action appears on Dana Narid's desk? How does that feedback improve reliability with DHL as a freight partner? And what happens when the same decision layer is applied to alternate sourcing and supplier portfolio governance?

That is where we continue at the onsite appointment at ZEISS HQ in Oberkochen next week. I am looking forward to showing the full capabilities of Supply Chain Hub.

## Script 2: Trailer Style

**0:00-0:40 - Slide 5, Camera Visible**

Meet Supply Chain Hub: an AI decision interface for the moment when a supply-chain signal becomes an executive decision.

Every manufacturer knows this pattern. A carrier milestone changes. SAP has the purchase order. The warehouse has the buffer. Procurement understands the supplier relationship. Someone has the latest spreadsheet. And the team spends precious time reconstructing what is true.

Slide 5 is the promise: one decision surface where leaders and operators can ask, inspect evidence, align on action, and keep governance intact.

**0:40-4:25 - Live Tool, Camera Hidden**

I will now switch from the slide into the tool. I start in settings because this is where the enterprise story begins. A user connects approved tools once, then reselects them per workflow. Here I have SAP, carrier data, warehouse stock, and Outlook.

This matters because OpenAI is not replacing systems of record. It is orchestrating a controlled conversation across them. The model does not get everything. It gets the right evidence for this user, this role, and this decision.

Now I ask: "Show me potential delivery risks for this week."

The assistant starts from the business language and translates it into a tool-backed workflow: check open purchase orders, carrier milestones, warehouse coverage, and operational exceptions.

The answer is immediate and specific. A DHL Freight shipment with 480 N-FK5 optical glass blanks missed the Leipzig hub departure. Arrival has shifted to Thursday, 25 June. The production buffer is 2.5 days.

This is the trailer moment: not "there might be a logistics issue," but "this shipment, this material, this buffer, this decision window."

Below the answer, the records are visible. The DHL row is marked Attention. The FedEx priority shipment is on schedule. The table shows the expected arrival and the operational buffer, so a planner can quickly separate noise from the exception that needs action.

Now I open Actions. This is the shift from insight to execution. I can draft an email to DHL Freight for recovery routing. I can create an Outlook follow-up task before the pickup cutoff. And I can write Dana Narid for review.

These are staged actions, not uncontrolled automation. The system prepares the next step with evidence. The human still owns the decision.

**4:25-5:30 - Slide 6, Camera Visible**

Back on Slide 6, the architecture is the story. The app is the interaction layer. OpenAI is the reasoning and orchestration layer. Governance controls what each role can see and do. ZEISS systems remain the operational backbone.

In production, MCP tools and retrieval would connect SAP, carriers, SharePoint, supplier systems, and Microsoft 365 workflows. So the tool is not only answering questions. It is becoming a controlled operating layer for supply-chain decisions.

And this is only one workflow. What happens when Dana Narid receives the action? What happens when procurement needs an approved alternate? What happens when the executive team asks whether DHL performance should change future freight strategy?

To be continued onsite at ZEISS HQ in Oberkochen next week. I look forward to showing where Supply Chain Hub goes from here.

## Script 3: Executive Business Value

**0:00-1:05 - Slide 5, Camera Visible**

Meet Supply Chain Hub: the enterprise decision interface for moving from fragmented supply-chain signals to governed action.

The business problem is simple to describe and expensive to live with. One disruption is interpreted differently by every function. Logistics sees a carrier milestone. Planning sees a production buffer. Procurement sees a supplier relationship. Leadership sees customer commitment risk. The result is manual effort, slower decisions, and avoidable escalation meetings.

Slide 5 shows the proposed answer in three layers. First, a communication interface: a ChatGPT-style app where executives and operators ask business questions, inspect evidence, and align on next steps. Second, an enterprise operating model: role scope, source ownership, approval paths, and auditability, so this becomes a governed way of working rather than a loose chatbot. Third, a system integration layer: OpenAI API and SDK connecting ZEISS systems, MCP tools, documents, and workflow actions without replacing systems of record.

The business outcome is the part I want to make concrete in the demo: reduce manual effort, improve decision precision with source-backed recommendations, and give leaders a reliable path from signal to action and approval.

Now I will switch from the slide into the live tool.

**1:05-4:45 - Live Tool, Camera Hidden**

I start with settings. A new user can configure which tools are available for the workflow: SAP for purchase orders and material data, shipping providers for DHL and FedEx milestones, EWM warehouse for stock, and Outlook for follow-up actions.

This is important because the enterprise value is not a generic chatbot. The value is a governed interface across trusted systems. The model does not get everything. It gets the approved sources for this user, this role, and this decision.

Now I ask the tool: "Show me potential delivery risks for this week."

The system identifies the relevant risk radar workflow and returns a focused answer. We have a delivery exception. DHL Freight shipment 00340434161094000012, carrying 480 N-FK5 optical glass blanks, missed its Leipzig hub departure. The ETA moved from 24 June to Thursday, 25 June.

Just as important, the answer includes the operational implication: current stock covers production until Thursday afternoon.

The records section makes the recommendation auditable. The DHL shipment is flagged for attention. The FedEx priority shipment is still on schedule and protects the line start. The finding is not just a model-generated statement. It is tied to source evidence the user can review.

For executives, this is the key difference between another dashboard and a decision tool. The interface does not only display data. It resolves the decision context: what changed, what is exposed, what still protects us, and what should happen next.

Now I trigger the operational next step. From the Actions menu, I can draft the DHL Freight email asking for recovery routing and confirmed ETA. I can create the Outlook follow-up task to track the recovery confirmation before noon. And I can send Dana Narid the summary for review.

This is human in the loop by design. Supply Chain Hub stages actions and routes approval. It does not silently change the supply chain. It packages the recommendation, evidence, owner, and next step so the responsible human can decide quickly and with context.

That is the business value of the workflow: one operational question becomes an evidence-backed recommendation and a controlled action path.

**4:45-6:00 - Slide 6, Camera Visible**

Back on Slide 6, this is the reference architecture behind what we just saw.

On the left, Supply Chain Hub is the ChatGPT-style front end: ask, review evidence, and align next steps. Next is the OpenAI API / SDK layer. That layer connects reasoning to ZEISS backend MCP integration, source context, and workflow actions. Then governance applies role scope, approved sources, financial masking, human review, and auditability. And on the right, ZEISS systems stay systems of record: SAP, logistics, supplier, warehouse, and document context.

The rail underneath is the operating pattern: ground, reason, act. Ground the answer in approved supply-chain context. Reason over risk, options, trade-offs, and assumptions. Act by routing high-impact recommendations to owners and approval paths.

The bottom row shows why this can scale: MCP tools for risk, scenario, supplier, and policy functions; retrieval over approved documents and operational records; and a scale path into procurement, quality, manufacturing, and finance.

So the cliff hanger is this: we saw one DHL delivery exception. But what lands on Dana Narid's desk next? Does her decision only recover one shipment, or does it change how ZEISS measures DHL reliability as a freight partner? And if the recovery fails, which alternate supplier, production, or executive workflow should fire next?

That is the story I will continue onsite at ZEISS HQ in Oberkochen next week.

## Script 4: Technical Solutions Engineering

**0:00-0:40 - Slide 5, Camera Visible**

Meet Supply Chain Hub: a technical prototype for turning enterprise supply-chain data into grounded, auditable workflow recommendations.

The reason this matters is that supply-chain teams already have data, but the context is fragmented. The decision usually spans ERP records, logistics events, warehouse buffers, supplier documents, and approval policy.

Slide 5 is the product thesis: a ChatGPT-style front end, an enterprise operating model, and an OpenAI API / SDK integration layer.

**0:40-4:30 - Live Tool, Camera Hidden**

Now I switch to the running application.

I open settings first. This is the control surface for the demo. The user can choose the model and thinking level, then select authorized tools. For this workflow, I have SAP S/4HANA, shipping providers, EWM warehouse, and Outlook.

In production, these would be implemented through governed connectors, MCP tools, and retrieval over approved enterprise knowledge. The important architecture point is that tool and source selection is not cosmetic. The app builds a server-side context snapshot and filters it by role before the model sees it.

Now I ask: "Show me potential delivery risks for this week."

The UI sends the prompt, selected workflow, model, reasoning setting, demo persona, and selected source IDs to the chat API. The server resolves the user policy, builds context, and returns the answer.

The reasoning summary shows the audit trace at a high level: role permissions, selected tools, grounded records, and response preparation. It is not private chain-of-thought. It is a user-facing operational trace.

The result: DHL missed the Leipzig hub departure for 480 N-FK5 blanks, ETA moved to Thursday, and the current buffer lasts 2.5 days.

Now I review the records. The data table is deliberately simple because the goal is not to overwhelm the user. It shows affected material, status, expected arrival, and production buffer.

This is also where role-based design becomes visible. A logistics planner sees operational risk fields. Financial exposure is filtered unless the signed-in role is authorized.

The Actions menu demonstrates agentic behavior without giving up control. I can draft the DHL Freight email, create the Outlook follow-up task, or write Dana Narid for review. The system composes a grounded action from the finding and evidence, but the human decides whether to send, approve, or deny.

**4:30-5:30 - Slide 6, Camera Visible**

Back on Slide 6, this combines four capabilities: natural-language interaction, server-grounded context, tool orchestration, and governed action routing.

The app asks, reviews evidence, and approves. The OpenAI integration uses the API, SDK, `/api/chat`, and MCP tools. Governance applies role scope, source filters, masking, and approvals. ZEISS systems remain the source of truth.

Today this is a demo application. The production version would connect real SAP data, carrier milestones, SharePoint workbooks, supplier systems, and Microsoft 365 actions. OpenAI provides the reasoning and orchestration layer; the enterprise systems remain authoritative.

The cliff hanger is the next workflow. Once Dana Narid receives this review, does she approve the follow-up, escalate freight reliability, or trigger a supplier mitigation workflow? That is where Supply Chain Hub becomes more than a risk radar.

I will continue the story onsite at ZEISS HQ in Oberkochen next week.

## Script 5: Human-in-the-Loop Story

**0:00-0:45 - Slide 5, Camera Visible**

Meet Supply Chain Hub: an AI-powered supply-chain workspace designed around one principle: the model proposes, the human decides.

Why is this needed? Because the first response to a disruption is often too slow. The signal may arrive through DHL, the order is in SAP, the stock position is in the warehouse system, and the approval path lives in someone's inbox.

Slide 5 frames the solution: a single decision interface, role-aware governance, and an integration layer that can connect ZEISS systems and workflow actions.

**0:45-4:25 - Live Tool, Camera Hidden**

I now switch to the frontend, where the camera is hidden so the tool gets the attention.

I start in settings. The user configures the tools for the workflow: SAP, carrier milestones, warehouse stock, and Outlook.

This is where trust starts. A supply-chain copilot should not have unlimited context and unlimited authority. It should use approved sources, respect the user's role, and prepare actions that are visible before anything changes downstream.

Now I ask the operational question: "Show me potential delivery risks for this week."

Supply Chain Hub identifies the relevant delivery-risk workflow and checks the selected tools. The answer is specific: a DHL Freight shipment with 480 N-FK5 optical glass blanks missed the Leipzig hub departure. The arrival is now Thursday, 25 June, and current stock covers production until Thursday afternoon.

This turns a logistics signal into a decision: do we wait, recover, escalate, or reroute?

The findings table gives the user a grounded view of the data. The DHL shipment is marked Attention because the ETA moved. The FedEx priority shipment is on schedule and protects the immediate line start.

This is the evidence a planner needs before acting. It avoids two common failure modes: overreacting to every alert, or underreacting because the full context is not visible.

Now I open Actions. First, I can draft the DHL email asking for recovery routing and confirmed ETA. Second, I can create an Outlook follow-up task so the recovery check does not depend on memory. Third, I can write Dana Narid for review.

That last action is the most important one for this demo. The AI is not trying to own the decision. It packages the summary, evidence, and requested next step for a responsible human reviewer.

**4:25-5:30 - Slide 6, Camera Visible**

Back on Slide 6, the architecture shows how this stays governed. The app is where the user asks and approves. The OpenAI layer grounds, reasons, and calls tools. Governance applies role scope, source filters, masking, and approvals. ZEISS systems stay in control.

With live integrations, those actions could connect to Microsoft 365, SAP, supplier systems, risk tools, and audit logs.

The next question is where the story gets interesting. What exactly lands on Dana Narid's desk? Does she approve the DHL escalation? Does this event change how ZEISS measures DHL freight reliability? And if the delivery risk cannot be recovered, which supplier or production workflow should be triggered next?

In other words, this is not only a single shipment demo. It is the first step toward a measurable operating loop: detect the exception, route the action, capture the human decision, and improve the reliability playbook over time.

That is the part I will continue at the onsite appointment at ZEISS HQ in Oberkochen next week. I am looking forward to showing the full Supply Chain Hub capability set.

## Slidev Recording Notes

Recommended recording flow:

1. Open the deck in Slidev and navigate directly to **Slide 5**.
2. Start recording with your camera visible on the slide.
3. Deliver the Slide 5 opening in about 40-45 seconds.
4. Switch from Slidev to the Supply Chain Hub frontend and hide the camera.
5. Spend most of the time in the tool: settings, prompt, answer, findings table, actions.
6. Switch back to Slidev on **Slide 6** and show your camera again.
7. Explain the architecture and close with the cliff hanger.

Timing guide:

- Slide 5: 0:00-0:45.
- Live tool: 0:45-4:25 or 4:30.
- Slide 6: 4:25-5:30.

Practical tips:

- Keep the tool browser zoom around 90-100% so the settings, assistant answer, findings table, and Actions menu are readable.
- Rehearse the two transitions: Slidev to tool, then tool back to Slidev Slide 6.
- Before recording, pre-load the tool and make sure the prompt field is ready.
- During the live tool section, do not mention that the camera is hidden; just let the screen focus on the product.
- End on Slide 6 after the cliff hanger rather than returning to the tool.
