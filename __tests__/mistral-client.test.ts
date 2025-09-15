import { describe, test, expect, vi, beforeEach } from "vitest";

vi.mock("@mistralai/mistralai", () => {
  class MistralMock {
    chat = {
      complete: vi.fn(async () => ({
        choices: [{ message: { content: "mocked" } }],
      })),
    };
    constructor(_opts: any) {}
  }
  return { Mistral: MistralMock };
});

describe("mistral-client", () => {
  const OLD_ENV = process.env.MISTRAL_API_KEY;
  beforeEach(() => {
    vi.resetModules();
    process.env.MISTRAL_API_KEY = OLD_ENV;
  });

  test("throws when API key missing", async () => {
    process.env.MISTRAL_API_KEY = "";
    const mod = await import("../app/api/chat/mistral-client");
    expect(() => mod.getMistralClient()).toThrow();
  });

  test("completeChat returns content and reuses client", async () => {
    process.env.MISTRAL_API_KEY = "test-key";
    const mod = await import("../app/api/chat/mistral-client");
    const c1 = mod.getMistralClient();
    const c2 = mod.getMistralClient();
    expect(c1).toBe(c2);

    const res = await mod.completeChat([
      { role: "user", content: "hi" },
    ] as any);
    expect(res.content).toBe("mocked");
  });
});
