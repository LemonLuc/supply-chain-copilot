# Supply Chain Hub Slidev Demo Script

Executive Business Value

**0:00-1:00 - Model Overview, Camera Visible**

Hello, I am Lucie, OpenAI Solutions Engineer, and I am delighted to present Supply Chain Hub, a tool built for Carl Zeiss AG.

Supply Chain Hub is designed for ZEISS supply-chain leaders, logistics planners, and procurement teams who need one trusted view of operational risk. The pain is practical: one disruption is often split across SAP, carrier updates, warehouse stock, supplier context, documents, and email. Before teams can act, they first have to reconstruct what is true.

This model shows the operating idea behind the tool. Supply Chain Hub is the conversation layer for asking questions and reviewing evidence. The intelligence layer turns those questions into options and next steps. Operating controls keep roles, sources, masking, and review paths clear. And ZEISS systems remain the sources of truth.

I will show one workflow: from a delivery-risk question, to evidence, to action. The full onsite demo goes much deeper, but this should make the business purpose clear.

**1:00-5:15 - Live Tool, Camera Hidden**

Here we are in the Supply Chain Hub tool. I start at the top with recommendations: open the DHL tracking delay for the N-FK5 shipment, check the Oberkochen receiving buffer, or review the purchase order promised date. These are shortcuts into work that matters now. The tool surfaces likely investigation paths instead of waiting for the user to know exactly where to click.

Next I open settings. A new user can configure tools: SAP for purchase orders and material data, shipping providers for DHL and FedEx milestones, EWM warehouse for stock, and Outlook for follow-up actions. I keep SAP, carrier data, and warehouse stock selected, and enable Outlook because I want the workflow to move from analysis into controlled follow-up. The model does not get everything. It gets the approved sources for this user, role, and decision.

Now I ask the tool: "Show me potential delivery risks for this week."

The system identifies the risk radar workflow and returns a focused answer. We have a delivery exception. DHL Freight shipment ending 0012, carrying 480 N-FK5 optical glass blanks, missed its Leipzig hub departure. The ETA moved one day from 24 June to Thursday, 25 June.

Just as important, the answer includes the operational implication: current stock covers production until Thursday afternoon.

The records section makes the recommendation auditable. The DHL shipment is flagged for attention. The FedEx priority shipment is still on schedule and protects the line start. The finding is tied to source evidence the user can review.

For executives, this is the difference between another dashboard and a decision tool. The interface resolves the context: what changed, what is exposed, what still protects us, and what should happen next, without asking every function to open five systems.

Now I, as Lukas Weber, Logistics Planner, trigger the next step. From Actions, I can request DHL recovery routing, create an Outlook recovery task to track DHL confirmation, FedEx backup status, and the Oberkochen receiving cutoff, or write Dana Narid, the procurement team lead, for review. I can also log the DHL exception on the purchase order while holding promised-date changes until the recovery ETA is confirmed.

For this walkthrough, I choose the Outlook recovery task.

This is human in the loop by design. Supply Chain Hub stages actions and routes approval. It packages the recommendation, evidence, owner, and next step so the responsible human can decide quickly.

And this is only one path. In the full demo, we can also explore role-based views, workbook grounding, approval queues, supplier alternatives, and executive portfolio decisions. The same pattern repeats: ask, ground, reason, act.

**5:15-6:00 - Model Close, Camera Visible**

Coming back to the model, this is why the architecture matters. The tool does not replace ZEISS systems. It gives teams a governed decision layer on top of them. OpenAI fits through the Responses API for grounded answers and the Agents SDK for tool-backed workflows and reviewer handoffs.

We saw one DHL delivery exception. But what lands on Dana Narid's desk next? Does her decision recover one shipment, or change how ZEISS measures DHL reliability? And if recovery fails, which alternate supplier, production, or executive workflow fires next?

If this is what Supply Chain Hub can do from one logistics signal, the bigger question is what it can do across ZEISS supply-chain operations. That is the story I will continue in the full onsite demo at ZEISS HQ in Oberkochen next week.
