import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { render } from "./render";
import { MessageList } from "@/components/ui/message-list";

describe("MessageList", () => {
  test("renders messages", () => {
    const messages = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
    ] as any;
    render(<MessageList messages={messages} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });
});
