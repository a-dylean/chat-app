"use client"

import { ChatInput } from "@/components/ui/chat-input";
import { MessageList } from "@/components/ui/message-list";
import { useState } from "react";
import { type ChatMessage } from "./types";

export default function Home() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
  return (
    <>
    <h1>Mistral AI Chat</h1>
    <MessageList messages={messages} />
    <ChatInput messages={messages} setMessages={setMessages} />
    </>
  );
}
