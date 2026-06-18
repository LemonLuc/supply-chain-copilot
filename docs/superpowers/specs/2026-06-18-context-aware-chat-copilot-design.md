# Context-Aware Chat Copilot Design

Date: 2026-06-18

## Goal

Replace the current static "Run copilot" interaction with a real chat interface at the top of the application. The chat should feel like a concise ChatGPT-style control box for the supply-chain demo, understand the current page/workflow context, and be ready for future MCP connections, RAG stores, and deterministic business tools.

The first implementation should be fully runnable without a real API key. It will use mock/sample responses by default and switch to the real OpenAI-backed path when `OPENAI_API_KEY` is configured.

## Current State

The repository is a lightweight static demo:

- `index.html` renders a sidebar, workflow selector, topbar, answer cards, architecture trace, evidence table, and talk track.
- `styles.css` owns the full visual system.
- `app.js` contains synthetic supplier data, workflow data, and deterministic render logic.
- `README.md` describes a future `/api/copilot` endpoint using the OpenAI Responses API.

Because browser-side JavaScript must not hold an API key, the full chat implementation needs a server boundary.

## Recommended Architecture

Migrate the app to a Next.js App Router application using React and the Vercel AI SDK.

Reasons:

- Next.js route handlers provide the server boundary for `OPENAI_API_KEY`.
- Vercel AI SDK gives a standard streaming chat shape through `useChat`, `streamText`, and streamed UI message responses.
- The SDK already has patterns for tool calls, MCP tools, message persistence, and RAG middleware, which match the requested roadmap.
- The current app is small enough that migration is lower risk than bolting a custom backend onto static files.

## OpenAI And Model Choices

Use current OpenAI model IDs in the UI:

- `gpt-5.5` as the default flagship option.
- `gpt-5.4` as a lower-cost full model option.
- `gpt-5.4-mini` for faster/lower-cost work.
- `gpt-5.4-nano` for cheapest/fastest lightweight queries.

Expose thinking/reasoning options:

- `none`
- `low`
- `medium`
- `high`
- `xhigh`

The server should pass the selected reasoning level only when the provider/model path supports it. Mock mode should still echo the selected model and thinking level so the UI behavior remains visible before an API key is added.

## UX

Place a chat panel at the top of the workspace, above the current answer grid.

The panel includes:

- Compact message history.
- One multi-line composer.
- Send button.
- Model selector.
- Thinking selector.
- Small status text for mock mode, streaming, and errors.

The existing workflow sidebar remains the primary demo navigation. Selecting a workflow changes the page and also changes the context sent to chat. The chat should not hide the existing answer/evidence sections; it should augment them.

The UI should stay operational and executive-demo friendly on desktop and mobile. The chat panel should use the existing restrained control-tower visual language: 8px radii, quiet borders, dense but readable layout, and no landing-page styling.

## Context Payload

Every chat request sends an application context object to `/api/chat`:

- current workflow key
- current workflow question
- answer headline and summary
- impacts
- recommended actions
- architecture trace
- supplier table
- highlighted suppliers
- dataset metrics

The server converts this into a concise system/developer context for the model. This keeps the answer grounded in the visible app state and creates a future insertion point for RAG results, MCP connector outputs, and tool results.

## Server Route

Create `app/api/chat/route.ts`.

Input:

- AI SDK `messages`
- `model`
- `thinking`
- `appContext`

Behavior:

- If `OPENAI_API_KEY` is missing or equals a sample placeholder, return a streamed mock response based on `appContext` and the latest user message.
- Otherwise call the OpenAI provider through Vercel AI SDK.
- Include a supply-chain copilot system prompt that asks for concise, evidence-grounded answers, makes uncertainty visible, and avoids inventing data outside supplied context.
- Keep room for future tool registration.

Errors:

- Invalid model or thinking values fall back to safe defaults.
- Missing context uses the latest workflow default.
- API errors return a user-readable assistant message and log only minimal server-side details.

## Client Components

Use a small set of bounded client modules:

- `app/page.tsx`: overall shell, workflow state, and layout.
- `components/CopilotChat.tsx`: chat panel, selectors, message rendering, composer.
- `components/DemoDashboard.tsx`: existing answer/evidence rendering.
- `lib/demo-data.ts`: suppliers, workflows, model options, thinking options.
- `lib/context.ts`: build the context payload from selected workflow and supplier data.
- `app/api/chat/route.ts`: chat endpoint.

This keeps the implementation comprehensible and leaves future MCP/RAG work with clear places to attach.

## Testing And Verification

Minimum verification:

- `npm run lint` if configured.
- `npm run build`.
- Start the local dev server.
- Manually verify in browser:
  - chat renders at the top
  - workflow changes update dashboard context
  - mock chat responds without a real API key
  - model/thinking selectors are sent and reflected
  - mobile layout does not overlap

## Future Extensions

Future additions should not require redesigning the chat surface:

- MCP connectors can be added as AI SDK MCP tools or server-side tool adapters.
- RAG can add retrieved snippets to the same `appContext` envelope.
- Scenario/risk/policy engines can become explicit tools.
- Message persistence can be added behind the chat component without changing the dashboard.
- Audit logging can record user question, context version, selected model, reasoning level, tool calls, and final answer.

## Self-Review

No TBDs remain. The architecture matches the approved direction: full implementation, real server boundary, mock/sample key behavior until the user supplies a real key, and a future path for MCP/RAG/tools. Scope is a single migration plus chat feature, not a broader supply-chain backend.
