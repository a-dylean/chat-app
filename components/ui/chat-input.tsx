"use client";

import { useState } from "react";
import { PromptSelector } from "./prompt-selector";
import { Flex, Button, Input } from "@chakra-ui/react";
import { type ChatMessage } from "../../app/types";

export const ChatInput = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [templateChoice, setTemplateChoice] = useState("");
  const handleSend = async () => {
        if (!input.trim() || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input.trim() },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
      const data = (await res.json()) as { content?: string };
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content ?? "" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry I can not answer your question right now, something went wrong!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex>
      <PromptSelector setTemplateChoice={setTemplateChoice} />
      <Input
        value={templateChoice ? templateChoice : input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <Button
        onClick={handleSend}
        disabled={loading}
      >
        Send
      </Button>
    </Flex>
  );
};
