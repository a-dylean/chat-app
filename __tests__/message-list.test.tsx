import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { render } from "./render";
import { MessageList } from "@/components/ui/message-list";
import type { ChatMessage } from "@/app/types";

describe("MessageList", () => {
  test("renders messages", () => {
    const messages: ChatMessage[] = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
    ];
    render(<MessageList messages={messages} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });
});
