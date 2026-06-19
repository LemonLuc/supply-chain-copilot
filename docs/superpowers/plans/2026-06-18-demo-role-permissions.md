# Demo Role Permissions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add least-privilege demo personas that gate supplier impact data in both the dashboard and chat, and remove the architecture trace.

**Architecture:** A shared `lib/permissions.ts` module normalizes persona IDs and exposes capability policy. `buildAppContext` applies the policy server-side so restricted supplier fields never enter the model prompt, while the React app uses the same capability to conditionally render the table column.

**Tech Stack:** Next.js App Router, React, TypeScript, Vercel AI SDK, Vitest, Testing Library.

---

### Task 1: Persona Policy And Redacted Context

**Files:**
- Create: `lib/permissions.ts`
- Create: `lib/permissions.test.ts`
- Modify: `lib/context.ts`
- Modify: `lib/context.test.ts`

- [ ] **Step 1: Write failing policy and context tests**

Add tests asserting that `normalizePersona()` defaults unknown values to `logistics`, that procurement has `canViewSupplierImpact`, and that `buildAppContext("risks", persona)` omits or includes each supplier's `impact` field according to policy.

```ts
expect(normalizePersona("unknown")).toBe("logistics");
expect(getPersonaPolicy("procurement").canViewSupplierImpact).toBe(true);
expect(buildAppContext("risks", "logistics").suppliers[0]).not.toHaveProperty("impact");
expect(buildAppContext("risks", "procurement").suppliers[0]).toHaveProperty("impact");
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- lib/permissions.test.ts lib/context.test.ts`
Expected: FAIL because the policy module and persona-aware context do not exist.

- [ ] **Step 3: Implement policy and context filtering**

Define two persona options and a least-privilege normalizer:

```ts
export const personas = [
  { id: "logistics", label: "Standard logistics employee" },
  { id: "procurement", label: "Procurement lead" },
] as const;

export function normalizePersona(value: unknown): PersonaId {
  return value === "procurement" ? "procurement" : "logistics";
}
```

Update `buildAppContext(workflow, persona)` to map supplier objects and omit `impact` unless the normalized policy allows it. Include the normalized persona and capabilities in the serialized context. Remove `architectureTrace` from the returned context.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- lib/permissions.test.ts lib/context.test.ts`
Expected: PASS.

### Task 2: Persona-Aware API Route

**Files:**
- Modify: `app/api/chat/route.ts`
- Modify: `app/api/chat/route.test.ts`

- [ ] **Step 1: Write a failing route test**

Send `persona: "procurement"` in the request and verify the generated stream is successful. Add a second request with an invalid persona and assert the route still responds through the least-privilege fallback.

```ts
body: JSON.stringify({
  messages,
  workflowKey: "risks",
  persona: "procurement",
  model: "gpt-5.4-mini",
  thinking: "medium",
})
```

- [ ] **Step 2: Run the route test to verify it fails**

Run: `npm test -- app/api/chat/route.test.ts`
Expected: FAIL until the request contract accepts and applies `persona`.

- [ ] **Step 3: Pass persona through the trusted context builder**

Add `persona?: unknown` to `ChatRequest` and call:

```ts
const context = buildAppContext(body.workflowKey, body.persona);
```

The route must not accept capabilities or supplier data from the client.

- [ ] **Step 4: Run the route test to verify it passes**

Run: `npm test -- app/api/chat/route.test.ts`
Expected: PASS.

### Task 3: Sidebar Selector, Table Gate, And Architecture Removal

**Files:**
- Modify: `app/supply-chain-app.tsx`
- Modify: `app/supply-chain-app.test.tsx`
- Modify: `app/globals.css`
- Modify: `README.md`

- [ ] **Step 1: Write failing UI tests**

Assert the default selector value is `logistics`, the Impact header is absent initially, selecting `procurement` reveals it, and the architecture trace heading is absent.

```tsx
expect(screen.getByLabelText("Persona")).toHaveValue("logistics");
expect(screen.queryByRole("columnheader", { name: "Impact" })).not.toBeInTheDocument();
fireEvent.change(screen.getByLabelText("Persona"), { target: { value: "procurement" } });
expect(screen.getByRole("columnheader", { name: "Impact" })).toBeInTheDocument();
expect(screen.queryByText("Architecture trace")).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the UI tests to verify they fail**

Run: `npm test -- app/supply-chain-app.test.tsx`
Expected: FAIL because the selector and visibility gate do not exist and the architecture section remains.

- [ ] **Step 3: Implement the UI and cleanup**

Add `persona` state defaulting to `logistics`. Render a sidebar select from `personas`; its change handler updates the persona and calls `setMessages([])`. Include `persona` in chat request bodies. Render the Impact header and cells only when `getPersonaPolicy(persona).canViewSupplierImpact` is true. Remove the architecture section and `.architecture-*` CSS rules.

- [ ] **Step 4: Run UI and full verification**

Run: `npm test`
Expected: all tests pass.

Run: `npm run typecheck`
Expected: exit 0.

Run: `npm run build`
Expected: production build succeeds.

- [ ] **Step 5: Browser smoke test**

At desktop and 390px mobile width, verify the standard persona hides Impact, procurement shows it, switching persona after a mock chat clears messages, architecture trace is absent, and document width does not exceed viewport width.

## Self-Review

The plan covers every approved requirement: least-privilege default, shared role policy, UI and server enforcement, conversation clearing, architecture trace removal, tests, and responsive browser verification. Function names and persona IDs are consistent across tasks, and no production authentication work is included.
