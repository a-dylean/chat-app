import {
  useEffect,
  useState,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { PromptSelector } from "./prompt-selector";
import { Flex, Button, Box, Textarea } from "@chakra-ui/react";
import { type ChatMessage } from "../../app/types";

type ChatInputProps = {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
};

export const ChatInput = ({ messages, setMessages }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [templateChoice, setTemplateChoice] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const MAX_TEXTAREA_HEIGHT = 200;

  useEffect(() => {
    setInput(templateChoice);
  }, [templateChoice]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  }, [input]);

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
      <Box backgroundColor={"gray.800"} p={4} borderRadius="md" mt={2}>
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type your message"
        resize="none"
        rows={1}
        maxH={`${MAX_TEXTAREA_HEIGHT}px`}
        overflowY="hidden"
      />
      <Flex gap={2} mt={2} justify="space-between" align="center">
      <PromptSelector setTemplateChoice={setTemplateChoice} />
      <Button
        onClick={handleSend}
        disabled={loading}
        bg="#FA500F"
        color="white"
        _hover={{ bg: "#e0480e" }}
        _active={{ bg: "#c6410d" }}
      >
        Send
      </Button>
    </Flex>
    </Box>
  );
};
