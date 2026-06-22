---
theme: default
title: Carl Zeiss AG x OpenAI | Executive Supply Chain Decision Deck
info: |
  Executive Slidev deck for selling an OpenAI API / SDK platform approach through the Supply Chain Hub demo.
transition: fade-out
class: se-deck
drawings:
  persist: false
record: true
---

<section class="cover-slide">
  <p class="eyebrow">OpenAI Solutions Engineering</p>
  <h1 class="cover-title">From fragmented supply-chain signals to governed decisions</h1>
  <p class="subtitle">A proposed OpenAI platform approach for ZEISS Supply Chain, Procurement and IT leadership</p>
</section>

---

<section class="slide-section tldr">
  <p class="eyebrow">Executive takeaway</p>
  <h1>TL;DR</h1>
  <div class="tldr-layout">
    <div class="tldr-main">
      <p>OpenAI becomes the governed decision layer between ZEISS supply-chain data and operational action.</p>
      <div class="tldr-proof">
        <b>ChatGPT style front end</b>
        <b>OpenAI API / SDK + ZEISS backend MCP integration</b>
      </div>
    </div>
    <div class="tldr-stack">
      <div><h2>Problem</h2><p>Context is split across SAP, logistics, suppliers and files.</p></div>
      <div><h2>Platform move</h2><p>A central communication interface gives leaders one decision surface; the API integrates tools and controls.</p></div>
      <div><h2>Pilot</h2><p>Start with one high-value workflow and validate faster triage, evidence quality and governed approvals.</p></div>
    </div>
  </div>
</section>

---

<section class="slide-section customer-slide">
  <p class="eyebrow">Setting the stage</p>
  <h1>What we know so far, and what we need to validate</h1>
  <div class="split-60">
    <div class="statement-panel">
      <div class="zeiss-logo" aria-label="ZEISS logo"></div>
      <h2>Known customer context</h2>
      <ul>
        <li>Global optics and optoelectronics leader founded in 1846</li>
        <li>Semiconductor, industrial quality, microscopy, medical technology and consumer optics</li>
        <li>Large, regulated, globally distributed manufacturing and supply-chain environment</li>
      </ul>
    </div>
    <div class="assumption-list">
      <h2>Discovery assumptions to validate</h2>
      <ul>
        <li>Which disruptions consume the most planner, procurement and leadership time?</li>
        <li>Where do SAP, supplier, carrier and file handoffs weaken accuracy or predictability?</li>
        <li>Which decisions need human approval, auditability and source-level evidence?</li>
      </ul>
    </div>
  </div>
</section>

---

<section class="slide-section problem-slide">
  <p class="eyebrow">Business problem</p>
  <h1>Providing a decision framework for existing data</h1>
  <div class="signal-flow">
    <div><b>SAP</b><ul><li>POs</li><li>Material master</li><li>MRP exceptions</li></ul></div>
    <div><b>Warehouse</b><ul><li>EWM stock</li><li>Goods receipts</li><li>Production buffers</li></ul></div>
    <div><b>Carriers</b><ul><li>DHL / FedEx</li><li>ETA changes</li><li>Customs events</li></ul></div>
    <div><b>Suppliers</b><ul><li>Commit dates</li><li>Capacity</li><li>Quality status</li></ul></div>
    <div><b>Files</b><ul><li>Scorecards</li><li>Excel trackers</li><li>Contracts</li></ul></div>
  </div>
  <div class="problem-strip problem-strip-two">
    <div><strong>Pain</strong><ul><li>High manual effort to reconstruct one trusted view from partial signals</li><li>Variable answer accuracy when teams work from different source snapshots</li><li>Low precision and predictability for lead-time, supplier and carrier risk</li><li>Reliability depends on expert availability instead of a repeatable decision process</li></ul></div>
    <div><strong>Cost</strong><ul><li>Expedite spend and buffer inventory used to compensate for uncertainty</li><li>Leadership time spent in escalation meetings instead of trade-off decisions</li><li>Schedule churn when mitigation options arrive too late</li><li>Quality and compliance exposure when evidence is scattered across tools</li></ul></div>
  </div>
</section>

---

<section class="slide-section solution-slide solution-proposal">
  <p class="eyebrow">Solution Proposal</p>
  <h1>Supply Chain Hub as an enterprise decision operating model</h1>
  <div class="solution-grid">
    <div><h2>Communication interface</h2><p>A ChatGPT-style app where executives and operators ask business questions, inspect evidence and align on next steps.</p></div>
    <div><h2>Enterprise operating model</h2><p>Role scope, source ownership, approval paths and auditability turn the app into a governed way of working.</p></div>
    <div><h2>System integration layer</h2><p>OpenAI API / SDK connects ZEISS systems, MCP tools, documents and workflow actions without replacing systems of record.</p></div>
  </div>
  <div class="consequence-band">
    <span>Business outcome</span>
    <p>Supply Chain Hub reduces manual effort, improves decision precision and gives leaders a reliable path from signal to approved action.</p>
  </div>
</section>

---

<section class="slide-section architecture">
  <p class="eyebrow">Reference architecture</p>
  <h1>App front end, OpenAI platform backend, ZEISS systems of record</h1>
  <div class="arch-canvas">
    <div class="arch-zone"><span>01</span><h2>Supply Chain Hub app</h2><p>Ask, review evidence, approve.</p></div>
    <div class="arch-connector">→</div>
    <div class="arch-zone ai-zone"><span>02</span><h2>OpenAI integration</h2><p>API / SDK, <code>/api/chat</code>, evals, MCP tools.</p></div>
    <div class="arch-connector">→</div>
    <div class="arch-zone governance-zone"><span>03</span><h2>Governance</h2><p>Role scope, source filters, masking, evals.</p></div>
    <div class="arch-connector">→</div>
    <div class="arch-zone"><span>04</span><h2>ZEISS systems</h2><p>SAP, carriers, suppliers, files, workflows.</p></div>
    <div class="arch-rail"><div><b>Ground</b><p>Assemble approved context.</p></div><div><b>Reason</b><p>Synthesize risk and options.</p></div><div><b>Act</b><p>Route high-impact changes to approval.</p></div></div>
    <div class="arch-subgrid"><div><h2>MCP tool layer</h2><p>Risk, scenario, supplier and policy functions.</p></div><div><h2>Retrieval</h2><p>Approved documents, trackers and records.</p></div><div><h2>Cloudflare Developer Platform</h2><p>App deployed on Cloudflare for a fast, edge-ready demo path.</p></div></div>
  </div>
</section>

---

<section class="slide-section workflow-slide">
  <p class="eyebrow">Target workflow</p>
  <h1>From operational question to governed action</h1>
  <div class="process-line process-flow">
    <div><h2><b>1</b> Ask</h2><p>Business question</p></div>
    <div class="process-arrow">→</div>
    <div><h2><b>2</b> Scope</h2><p>Role, source and workflow policy</p></div>
    <div class="process-arrow">→</div>
    <div><h2><b>3</b> Ground</h2><p>Approved evidence</p></div>
    <div class="process-arrow">→</div>
    <div><h2><b>4</b> Recommend</h2><p>Risk, options and trade-offs</p></div>
    <div class="process-arrow">→</div>
    <div><h2><b>5</b> Approve</h2><p>Human-controlled action path</p></div>
  </div>
  <div class="workflow-example">
    <span>Example executive workflow</span>
    <p>The COO asks which customer commitments are exposed by a supplier delay; the Hub scopes the role, pulls approved ZEISS evidence, recommends mitigation options and routes the selected action for human approval.</p>
  </div>
</section>

---

<section class="slide-section ops-slide">
  <p class="eyebrow">Operating model</p>
  <h1>One executive workflow across existing systems</h1>
  <div class="flow-map">
    <div><span>Plan</span><p>Demand, material priority and production impact</p></div>
    <div class="flow-arrow">→</div>
    <div><span>Source</span><p>Supplier commit, alternatives and commercial constraints</p></div>
    <div class="flow-arrow">→</div>
    <div><span>Move</span><p>Carrier milestone, customs risk and warehouse receipt</p></div>
    <div class="flow-arrow">→</div>
    <div><span>Decide</span><p>Mitigation option, approval owner and audit trail</p></div>
  </div>
  <div class="workflow-example ops-example">
    <span>In action</span>
    <p>An executive accesses the app, asks for the highest-risk shipments affecting customer commitments this week and gets a source-backed recommendation with owner, confidence, cost exposure and next approval step.</p>
  </div>
</section>

---

<section class="demo-title">
  <h1>Demo</h1>
</section>

---

<section class="slide-section">
  <p class="eyebrow">Business case and ROI</p>
  <h1>Impact validation and success criteria</h1>
  <div class="roi-grid impact-grid">
    <div><h2>Baseline</h2><ul><li>Risk review cycle time</li><li>Escalation frequency</li><li>Manual triage hours</li></ul></div>
    <div><h2>Decision speed</h2><b>25%</b><p>Faster weekly risk-review cycle versus baseline.</p></div>
    <div><h2>Grounding quality</h2><b>90%</b><p>Answers cite approved ZEISS sources and show assumptions.</p></div>
    <div><h2>User pull</h2><b>80%</b><p>Target users rate outputs useful for real workflows.</p></div>
    <div><h2>Governance</h2><b>100%</b><p>High-impact actions route to human approval.</p></div>
    <div><h2>Business impact</h2><ul><li>Track avoided expedite actions</li><li>Measure planner throughput</li><li>Score answer trust and evidence quality</li></ul></div>
  </div>
</section>

---

<section class="slide-section scale-slide">
  <p class="eyebrow">Future potential</p>
  <h1>Supply Chain Hub as the business blueprint</h1>
  <div class="expansion-grid">
    <div><h2>Procurement</h2><ul><li>Supplier negotiations</li><li>Contract Q&A</li><li>Spend-risk trade-offs</li></ul></div>
    <div><h2>Quality</h2><ul><li>Deviation triage</li><li>Corrective action summaries</li><li>Supplier quality signals</li></ul></div>
    <div><h2>Manufacturing</h2><ul><li>Line impact analysis</li><li>Work instruction support</li><li>Maintenance handoffs</li></ul></div>
    <div><h2>Finance</h2><ul><li>Working capital views</li><li>Expedite-cost exposure</li><li>Scenario assumptions</li></ul></div>
  </div>
  <p class="callout">The reusable pattern is the same: governed app experience, OpenAI API / SDK integration layer, approved enterprise data and human-controlled actions.</p>
</section>

---

<section class="slide-section rollout-slide">
  <p class="eyebrow">Looking ahead</p>
  <h1>Fast proof of value with enterprise controls</h1>
  <div class="rollout-grid rollout-grid-four">
    <div><h2>Week 0</h2><ul><li>Executive sponsor</li><li>Workflow owner</li><li>Success criteria</li></ul></div>
    <div><h2>Weeks 1-2</h2><ul><li>Confirm source access</li><li>Define policy boundaries</li><li>Capture baseline metrics</li></ul></div>
    <div><h2>Weeks 3-5</h2><ul><li>Build proof of concept</li><li>Validate grounding quality</li><li>Run user feedback loops</li></ul></div>
    <div><h2>Weeks 6-8</h2><ul><li>Operate controlled pilot</li><li>Measure impact</li><li>Decide scale path</li></ul></div>
  </div>
  <p class="callout">What is needed to get started: executive sponsorship, access to representative systems and documents, a named business process owner and agreement on governance boundaries for the first controlled pilot.</p>
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
    <div><h2>Runtime</h2><ul><li>App deployed on Cloudflare Developer Platform</li><li>OpenNext + Cloudflare Worker path</li><li>Tests for chat, permissions and UI flows</li></ul></div>
  </div>
</section>
