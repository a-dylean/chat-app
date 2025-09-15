import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import { Provider } from "@/components/ui/provider";
import { PromptSelector } from "@/components/ui/prompt-selector";

describe("PromptSelector", () => {
  test("selecting a prompt calls setTemplateChoice", async () => {
    const user = userEvent.setup();
    const setTemplateChoice = vi.fn();

    render(
      <Provider>
        <PromptSelector setTemplateChoice={setTemplateChoice} />
      </Provider>
    );

    // Open the dropdown (the trigger is a button with role="combobox")
    const trigger = screen.getByRole("combobox", { name: /select a prompt/i });
    await user.click(trigger);

    // Find the visible listbox, then the specific option by name
    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByRole("option", {
      name: "Summarize (TL;DR + Insights)",
    });

    await user.click(option);

    expect(setTemplateChoice).toHaveBeenCalledWith("Summarize (TL;DR + Insights)");
  });
});
