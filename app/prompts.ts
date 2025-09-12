export type PromptTemplate = {
  label: string;
  value: string;
};

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    label: "None",
    value: "",
  },
  {
    label: "Summarize text",
    value:
      "Summarize the following text in 3-5 bullet points, focusing on key insights and avoiding fluff:\n\n<PASTE TEXT HERE>",
  },
  {
    label: "Translate to English",
    value:
      "Translate the following text to natural, idiomatic English. Preserve tone and meaning:\n\n<TEXT>",
  },
  {
    label: "Explain code",
    value:
      "Explain what this code does, step by step, and point out potential issues or improvements:\n\n```<LANGUAGE>\n<CODE HERE>\n```",
  },
];
