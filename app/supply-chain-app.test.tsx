import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SupplyChainApp } from "./supply-chain-app";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("SupplyChainApp", () => {
  it("renders the context-aware chat controls above the dashboard", () => {
    render(<SupplyChainApp />);

    expect(screen.getByRole("heading", { name: "Chat with this workspace" })).toBeInTheDocument();
    expect(screen.getByLabelText("Model")).toHaveValue("gpt-5.4-mini");
    expect(screen.getByLabelText("Thinking level")).toHaveValue("medium");
    expect(screen.getByPlaceholderText("Ask about suppliers, risks, scenarios, or recommendations")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Three suppliers need attention this week." })).toBeInTheDocument();
  });

  it("updates both the dashboard and chat context when a workflow is selected", () => {
    render(<SupplyChainApp />);

    fireEvent.click(screen.getByRole("button", { name: /Supplier A delay/i }));

    expect(
      screen.getByRole("heading", { name: "What happens if Supplier A is delayed by 2 weeks?" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Context: Supplier A delay")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A 2-week Supplier A delay creates a week-3 production gap." })).toBeInTheDocument();
  });

  it("defaults to least privilege and reveals supplier impact only for procurement", () => {
    render(<SupplyChainApp />);

    expect(screen.getByLabelText("Persona")).toHaveValue("logistics");
    expect(screen.queryByRole("columnheader", { name: "Impact" })).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Persona"), { target: { value: "procurement" } });

    expect(screen.getByRole("columnheader", { name: "Impact" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "$1.6M revenue at risk" })).toBeInTheDocument();
  });

  it("does not render the architecture trace", () => {
    render(<SupplyChainApp />);

    expect(screen.queryByText("Architecture trace")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "How the decision flows" })).not.toBeInTheDocument();
  });

  it("sends the selected persona with chat requests", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("data: [DONE]\n\n", {
        headers: {
          "content-type": "text/event-stream",
          "x-vercel-ai-ui-message-stream": "v1",
        },
      }),
    );
    render(<SupplyChainApp />);
    fireEvent.change(screen.getByLabelText("Persona"), { target: { value: "procurement" } });

    fireEvent.click(screen.getByRole("button", { name: "What should I do first?" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const requestBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(requestBody.persona).toBe("procurement");
  });
});
