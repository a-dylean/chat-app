import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import Page from "../app/page";
import { render } from "./render";
import React from "react";

test("Page displays Mistral icon when there's no messages", () => {
  render(<Page />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Mistral AI Chat" })
  ).toBeDefined();
});

test("Page displays no icon when there're messages", async () => {
  const messages = [
    { id: 1, text: "Hello, world!" },
    { id: 2, text: "How are you?" },
  ];

  vi.spyOn(React, "useState").mockImplementationOnce(() => [messages, vi.fn()]);

  render(<Page />);

  expect(
    screen.queryByRole("heading", { level: 1, name: "Mistral AI Chat Icon" })
  ).toBeNull();
});
