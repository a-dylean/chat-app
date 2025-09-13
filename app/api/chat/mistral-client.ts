import { Mistral } from "@mistralai/mistralai";
import { type ChatMessage } from "../../types";

let client: Mistral | null = null;

export function getMistralClient(): Mistral {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error("MISTRAL_API_KEY is not set. Add it to your environment.");
  }
  if (!client) {
    client = new Mistral({ apiKey });
  }
  return client;
}

export async function completeChat(
  messages: ChatMessage[],
  model = "mistral-small-latest"
) {
  const mistral = getMistralClient();
  const res = await mistral.chat.complete({ model, messages });
  const content = res.choices?.[0]?.message?.content ?? "";
  return { content, raw: res };
}
