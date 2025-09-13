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
    label: "Summarize (TL;DR + Insights)",
    value: [
      "You are an expert summarizer for busy professionals.",
      "Follow these rules strictly:",
      "- Do not invent facts. Preserve all numbers and terminology.",
      "- Keep names, links, and code formatting intact.",
      "- Prefer compact phrasing; avoid repetition.",
      "\nOutput format:",
      "1) TL;DR: one sentence (<= 25 words)",
      "2) Key Points: 3–7 bullets of the most important ideas",
      "3) Risks/Unknowns: bullets (only if applicable)",
      "4) Action Items: bullets (only if applicable)",
      "\nText:\n<<<PASTE_TEXT_HERE>>>",
    ].join("\n"),
  },
  {
    label: "Translate → English (Preserve Formatting)",
    value: [
      "You are a professional translator.",
      "Translate the text to idiomatic English while preserving tone and intent.",
      "Requirements:",
      "- Preserve Markdown formatting (inline code, lists, links, headings).",
      "- Do not alter numbers, names, or code snippets.",
      "- If ambiguity exists, add a brief 'Notes' section (1–3 bullets) explaining assumptions.",
      "\nText:\n<<<TEXT>>>",
    ].join("\n"),
  },
  {
    label: "Explain Code (Overview • Complexity • Risks)",
    value: [
      "You are a senior engineer. Explain the code with clear, actionable insights.",
      "Provide the following sections (concise, no fluff):",
      "- Overview: what the code does and where it fits",
      "- How It Works: key functions/modules and their roles (bullets)",
      "- Complexity: time/space for critical paths",
      "- Edge Cases: inputs or states that may break",
      "- Potential Issues: bugs, security, race conditions, perf pitfalls",
      "- Improvements: small refactors or design suggestions",
      "\nCode:\n```<LANGUAGE>\n<PASTE_CODE_HERE>\n```",
    ].join("\n"),
  },
];
