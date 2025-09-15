import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Provider } from "@/components/ui/provider";
import { MessageItem } from "@/components/ui/message-item";
import type { ChatMessage } from "@/app/types";

const renderWithProvider = (ui: React.ReactNode) =>
  render(<Provider>{ui}</Provider>);

describe("MessageItem markdown", () => {
  test("renders markdown with code and links", () => {
    const msg: ChatMessage = {
      role: "assistant",
      content:
        '# Title\nSome `code` and a [link](https://example.com)\n\n```js\nconsole.log("hi")\n```',
    };
    renderWithProvider(<MessageItem message={msg} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("code")).toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: "link",
    }) as HTMLAnchorElement;
    expect(link.href).toContain("https://example.com");
  });

  test("renders user message text", () => {
    const msg: ChatMessage = {
      role: "user",
      content: "Plain user text",
    };
    renderWithProvider(<MessageItem message={msg} />);
    expect(screen.getByText("Plain user text")).toBeInTheDocument();
  });
});
