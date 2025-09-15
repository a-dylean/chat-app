import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { PROMPT_TEMPLATES } from "../../app/prompts";
const prompts = createListCollection({ items: PROMPT_TEMPLATES });

type PromptSelectorProps = {
  setTemplateChoice: (value: string) => void;
};

export const PromptSelector = ({ setTemplateChoice }: PromptSelectorProps) => {
  return (
    <Select.Root collection={prompts} width={300}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger aria-label="Select a prompt">
          <Select.ValueText placeholder="Select prompt" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {prompts.items.map((prompt) => (
              <Select.Item
                item={prompt}
                key={prompt.value}
                onClick={() => setTemplateChoice(prompt.value)}
              >
                {prompt.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
