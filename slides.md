---
theme: default
title: Carl Zeiss AG x OpenAI | Executive Supply Chain Decision Deck
info: |
  Executive Slidev deck for selling ChatGPT + OpenAI API/SDK through the Supply Chain Hub demo.
transition: fade-out
class: se-deck
drawings:
  persist: false
---

<section class="cover-slide">
  <p class="eyebrow">OpenAI Solutions Engineering</p>
  <h1 class="cover-title">From fragmented supply-chain signals to governed decisions</h1>
  <p class="subtitle">A proposed OpenAI platform approach for ZEISS Supply Chain, Procurement and IT leadership</p>
  <p class="source-note">Customer context based on public information; demo data is synthetic.</p>
</section>

---

<section class="slide-section tldr">
  <p class="eyebrow">Executive takeaway</p>
  <h1>TL;DR</h1>
  <div class="tldr-layout">
    <div class="tldr-main">
      <span>Executive thesis</span>
      <p>OpenAI becomes the governed decision layer between ZEISS supply-chain data and operational action.</p>
      <div class="tldr-proof">
        <b>ChatGPT front end</b>
        <b>OpenAI API + SDK backend</b>
        <b>Supply Chain Hub proof point</b>
      </div>
    </div>
    <div class="tldr-stack">
      <div><h2>Problem</h2><p>Context is split across SAP, logistics, suppliers and files.</p></div>
      <div><h2>Platform move</h2><p>ChatGPT gives leaders one decision surface; the API integrates tools and controls.</p></div>
      <div><h2>Pilot ask</h2><p>Start with one high-value workflow and validate faster triage, evidence quality and governed approvals.</p></div>
    </div>
  </div>
</section>

---

<section class="slide-section customer-slide">
  <p class="eyebrow">Setting the stage</p>
  <h1>What we need to validate with ZEISS leadership</h1>
  <div class="split-60">
    <div class="statement-panel">
      <div class="zeiss-logo" aria-label="ZEISS logo"></div>
      <h2>Context</h2>
      <ul>
        <li>Global optics and optoelectronics leader founded in 1846</li>
        <li>Semiconductor, industrial quality, microscopy, medical technology and consumer optics</li>
        <li>Publicly reported 2024/25 scale: about EUR 11.9B revenue and 46K+ employees</li>
      </ul>
    </div>
    <div class="assumption-list">
      <h2>Validate live</h2>
      <ul>
        <li>Which disruptions consume the most planner time?</li>
        <li>Where do SAP, carrier and supplier handoffs slow decisions?</li>
        <li>Which actions need human approval before execution?</li>
      </ul>
    </div>
  </div>
</section>

---

<section class="slide-section problem-slide">
  <p class="eyebrow">Business problem</p>
  <h1>The data exists. The decision context arrives too late.</h1>
  <div class="signal-flow">
    <div><b>SAP</b><ul><li>POs</li><li>Material master</li><li>MRP exceptions</li></ul></div>
    <div><b>Warehouse</b><ul><li>EWM stock</li><li>Goods receipts</li><li>Production buffers</li></ul></div>
    <div><b>Carriers</b><ul><li>DHL / FedEx</li><li>ETA changes</li><li>Customs events</li></ul></div>
    <div><b>Suppliers</b><ul><li>Commit dates</li><li>Capacity</li><li>Quality status</li></ul></div>
    <div><b>Files</b><ul><li>Scorecards</li><li>Excel trackers</li><li>Contracts</li></ul></div>
  </div>
  <div class="problem-strip">
    <div><strong>Pain</strong><p>One delayed optical component can affect line sequencing, customer commitments and escalation meetings.</p></div>
    <div><strong>Friction</strong><p>Planner, procurement, logistics and quality teams each see a partial version of the truth.</p></div>
    <div><strong>Cost</strong><p>Late decisions create expedite spend, schedule churn and avoidable management attention.</p></div>
  </div>
</section>

---

<section class="slide-section">
  <p class="eyebrow">OpenAI capability selection</p>
  <h1>Two product surfaces, one enterprise operating model</h1>
  <div class="surface-pair">
    <div><h2>ChatGPT</h2><ul><li>Executive and team-facing front end</li><li>Ask questions, inspect evidence, coordinate next steps</li><li>Natural adoption path for planners and leaders</li></ul></div>
    <div><h2>OpenAI API + SDK</h2><ul><li>Backend integration layer for the Supply Chain Hub</li><li>Streaming answers, tool orchestration, evals and guardrails</li><li>Connects OpenAI into ZEISS workflows without replacing systems of record</li></ul></div>
  </div>
</section>

---

<section class="slide-section solution-slide">
  <p class="eyebrow">Solution thesis</p>
  <h1>The Supply Chain Hub is the platform pattern</h1>
  <div class="solution-grid">
    <div><h2>Decision surface</h2><p>ChatGPT-style experience for planners, procurement leaders and executives.</p></div>
    <div><h2>Decision intelligence</h2><p>Responses API, AI SDK streaming, reasoning summaries, tools and evaluations.</p></div>
    <div><h2>Control plane</h2><p>Role scope, source filtering, financial masking, approvals and audit logs.</p></div>
  </div>
  <div class="consequence-band">
    <span>Operational impact</span>
    <p>Supply Chain Hub turns a fragmented signal into a grounded answer, a recommended action and a controlled approval path.</p>
  </div>
</section>

---

<section class="slide-section architecture">
  <p class="eyebrow">Reference architecture</p>
  <h1>ChatGPT front end, OpenAI API backend, ZEISS systems of record</h1>
  <div class="arch-canvas">
    <div class="arch-zone"><span>01</span><h2>ChatGPT + Hub UI</h2><p>Ask, review evidence, approve.</p></div>
    <div class="arch-connector">→</div>
    <div class="arch-zone ai-zone"><span>02</span><h2>OpenAI integration</h2><p>AI SDK, <code>/api/chat</code>, Responses API, tools.</p></div>
    <div class="arch-connector">→</div>
    <div class="arch-zone governance-zone"><span>03</span><h2>Governance</h2><p>Role scope, source filters, masking, evals.</p></div>
    <div class="arch-connector">→</div>
    <div class="arch-zone"><span>04</span><h2>ZEISS systems</h2><p>SAP, carriers, suppliers, files, workflows.</p></div>
    <div class="arch-rail"><div><b>Ground</b><p>Assemble approved context.</p></div><div><b>Reason</b><p>Synthesize risk and options.</p></div><div><b>Act</b><p>Route high-impact changes to approval.</p></div></div>
    <div class="arch-subgrid"><div><h2>Tools</h2><p>Risk, scenario, supplier and policy functions.</p></div><div><h2>Retrieval</h2><p>Approved documents, trackers and records.</p></div><div><h2>Observability</h2><p>Logs, evals, adoption and quality metrics.</p></div></div>
  </div>
</section>

---

<section class="slide-section workflow-slide">
  <p class="eyebrow">Target workflow</p>
  <h1>From operational question to governed action</h1>
  <div class="process-line process-flow">
    <div><b>1</b><h2>Ask</h2><p>Business question</p></div>
    <div class="process-arrow">→</div>
    <div><b>2</b><h2>Scope</h2><p>Role, source and workflow policy</p></div>
    <div class="process-arrow">→</div>
    <div><b>3</b><h2>Ground</h2><p>Approved evidence</p></div>
    <div class="process-arrow">→</div>
    <div><b>4</b><h2>Recommend</h2><p>Risk, options and trade-offs</p></div>
    <div class="process-arrow">→</div>
    <div><b>5</b><h2>Approve</h2><p>Human-controlled action path</p></div>
  </div>
  <div class="workflow-proof">
    <div><h2>What executives see live</h2><p>A risk question becomes a grounded answer, a traceable recommendation and an approval-ready next step.</p></div>
    <div><h2>Why it creates curiosity</h2><p>The demo shows the same pattern across risk, supplier alternatives and resilience trade-offs without changing the underlying systems.</p></div>
  </div>
</section>

---

<section class="slide-section ops-slide">
  <p class="eyebrow">Operating model</p>
  <h1>One logistics flow, many decision handoffs</h1>
  <div class="flow-map">
    <div><span>Plan</span><p>MRP demand, safety stock and production priority</p></div>
    <div class="flow-arrow">→</div>
    <div><span>Source</span><p>Supplier commits, alternates and commercial constraints</p></div>
    <div class="flow-arrow">→</div>
    <div><span>Move</span><p>Carrier milestones, customs events and warehouse receipt</p></div>
    <div class="flow-arrow">→</div>
    <div><span>Decide</span><p>Risk triage, mitigation, approval and audit trail</p></div>
  </div>
  <div class="tool-grid">
    <div><h2>Internal tools</h2><ul><li>SAP S/4HANA and EWM</li><li>Supplier qualification database</li><li>SharePoint / Excel trackers</li></ul></div>
    <div><h2>External signals</h2><ul><li>DHL, FedEx and freight forwarder milestones</li><li>Supplier capacity portal</li><li>Customs and exception notifications</li></ul></div>
    <div><h2>Management controls</h2><ul><li>Role-based visibility</li><li>Financial masking</li><li>Human approval for high-impact actions</li></ul></div>
  </div>
</section>

---

<section class="slide-section demo-time">
  <p class="eyebrow">Demonstration</p>
  <h1>Demo time: Supply Chain Hub solving customer pain</h1>
  <div class="demo-time-layout">
    <div class="demo-time-main">
      <span>Centerpiece</span>
      <p>Show how the tool turns messy logistics signals into an evidence-backed decision path in the room.</p>
    </div>
    <div class="demo-time-list">
      <div><h2>Risk Radar</h2><p>Find material delivery risk before the escalation meeting.</p></div>
      <div><h2>Supplier alternatives</h2><p>Identify approved coverage when a critical supplier slips.</p></div>
      <div><h2>Cost vs. resilience</h2><p>Balance savings against continuity risk.</p></div>
    </div>
  </div>
</section>

---

<section class="slide-section">
  <p class="eyebrow">Business case and ROI</p>
  <h1>Make the pilot value explicit</h1>
  <div class="roi-grid">
    <div><h2>Baseline</h2><ul><li>Risk review cycle time</li><li>Escalation frequency</li><li>Manual triage hours</li></ul></div>
    <div><h2>Value lever</h2><ul><li>Faster decision cycles</li><li>Lower expedite exposure</li><li>Better planner throughput</li></ul></div>
    <div><h2>Validate</h2><ul><li>Compare before/after triage time</li><li>Track avoided expedite actions</li><li>Score answer trust and evidence quality</li></ul></div>
  </div>
  <div class="roi-equation">
    <span>Baseline</span>
    <b>×</b>
    <span>Measured improvement</span>
    <b>×</b>
    <span>Adoption</span>
    <b>=</b>
    <strong>Pilot value case</strong>
  </div>
</section>

---

<section class="slide-section scorecard-slide">
  <p class="eyebrow">Pilot scorecard</p>
  <h1>Earn the right to scale</h1>
  <div class="scorecard-grid">
    <div><h2>Decision speed</h2><b>25%</b><p>Faster weekly risk-review cycle versus baseline.</p></div>
    <div><h2>Grounding quality</h2><b>90%</b><p>Answers cite approved ZEISS sources and show assumptions.</p></div>
    <div><h2>User pull</h2><b>80%</b><p>Target users rate outputs useful for real workflows.</p></div>
    <div><h2>Governance</h2><b>100%</b><p>High-impact actions route to human approval.</p></div>
  </div>
  <p class="scorecard-thesis">Pilot instrumentation: compare triage hours, expedite exposure, avoided escalations and answer trust before deciding scale.</p>
</section>

---

<section class="slide-section scale-slide">
  <p class="eyebrow">Scale thesis</p>
  <h1>Supply chain is the entry point, not the endpoint</h1>
  <div class="expansion-grid">
    <div><h2>Procurement</h2><ul><li>Supplier negotiations</li><li>Contract Q&A</li><li>Spend-risk trade-offs</li></ul></div>
    <div><h2>Quality</h2><ul><li>Deviation triage</li><li>Corrective action summaries</li><li>Supplier quality signals</li></ul></div>
    <div><h2>Manufacturing</h2><ul><li>Line impact analysis</li><li>Work instruction support</li><li>Maintenance handoffs</li></ul></div>
    <div><h2>Finance</h2><ul><li>Working capital views</li><li>Expedite-cost exposure</li><li>Scenario assumptions</li></ul></div>
  </div>
  <p class="callout">The reusable pattern is the same: governed ChatGPT experience, OpenAI API integration layer, approved enterprise data and human-controlled actions.</p>
</section>

---

<section class="slide-section rollout-slide">
  <p class="eyebrow">Close plan</p>
  <h1>Low-risk path to scale</h1>
  <div class="rollout-grid">
    <div><h2>Weeks 1-2</h2><ul><li>Select one product family</li><li>Confirm sources and policy</li><li>Capture baseline metrics</li></ul></div>
    <div><h2>Weeks 3-4</h2><ul><li>Run risk visibility workflow</li><li>Run supplier-delay workflow</li><li>Review outputs with users</li></ul></div>
    <div><h2>Weeks 5-6</h2><ul><li>Measure ROI proxy</li><li>Review evals and audit trail</li><li>Decide scale path</li></ul></div>
  </div>
  <p class="callout">Executive ask: approve a six-week pilot around weekly risk visibility and supplier-delay mitigation.</p>
</section>

---

<section class="slide-section closing-slide">
  <p class="eyebrow">Looking ahead</p>
  <h1>From Supply Chain Hub to the next ZEISS decision layer</h1>
  <div class="closing-path">
    <div><h2>Supply Chain Hub</h2><p>Prove risk visibility, supplier alternatives and resilience decisions.</p></div>
    <div class="closing-arrow">→</div>
    <div><h2>Finance Hub</h2><p>Extend to working capital, expedite exposure and scenario planning.</p></div>
    <div class="closing-arrow">→</div>
    <div><h2>Quality Hub</h2><p>Bring the same governed pattern to deviations, CAPA and supplier quality.</p></div>
  </div>
  <p class="closing-line">Looking forward to the collaboration between Carl Zeiss AG and OpenAI.</p>
</section>

---

<section class="annex-title">
  <h1>Annex</h1>
</section>

---

<section class="slide-section">
  <p class="eyebrow">Annex</p>
  <h1>Behind the scenes - how Supply Chain Hub was built</h1>
  <div class="build-grid">
    <div><h2>Experience</h2><ul><li>Next.js and React UI</li><li>AI SDK <code>useChat</code></li><li>Source controls and approval UI</li></ul></div>
    <div><h2>AI route</h2><ul><li><code>/api/chat</code> validates requests</li><li>Builds server-side context</li><li>Streams OpenAI responses or deterministic fallback</li></ul></div>
    <div><h2>Governance</h2><ul><li>Persona policy</li><li>Workflow access</li><li>Source filtering and financial masking</li></ul></div>
    <div><h2>Runtime</h2><ul><li>OpenNext + Cloudflare Worker path</li><li>Tests for chat, permissions and UI flows</li><li>Synthetic data for reliable demo delivery</li></ul></div>
  </div>
</section>
