import { describe, test, expect, vi } from "vitest";
import type { NextRequest } from "next/server";
import type { ChatMessage } from "../app/types";

vi.mock("../app/api/chat/mistral-client", () => ({
  completeChat: vi.fn(async (messages: ChatMessage[], model?: string) => ({
    content: "ok:" + (model || ""),
  })),
}));

import { POST } from "../app/api/chat/route";

describe("API /api/chat POST", () => {
  test("validates messages", async () => {
    const res = await POST({ json: async () => ({ messages: [] }) } as unknown as NextRequest);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  test("returns assistant content", async () => {
    const res = await POST({
      json: async () => ({
        messages: [{ role: "user", content: "hi" }],
        model: "m",
      }),
    } as unknown as NextRequest);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.content).toContain("ok");
  });

  test("handles internal error", async () => {
    const { completeChat } = await import("../app/api/chat/mistral-client");
    vi.mocked(completeChat).mockRejectedValueOnce(new Error("boom"));
    const res = await POST({
      json: async () => ({ messages: [{ role: "user", content: "x" }] }),
    } as unknown as NextRequest);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });
});
