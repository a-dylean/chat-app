import { NextRequest, NextResponse } from "next/server";
import { completeChat } from "./mistral-client";
import { type ChatMessage } from "../../types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body?.messages;
    const model: string | undefined = body?.model;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages must be a non-empty array" },
        { status: 400 }
      );
    }

    const { content } = await completeChat(messages, model);
    return NextResponse.json({ content });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
