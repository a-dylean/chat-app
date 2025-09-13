"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { MessageList } from "@/components/ui/message-list";
import { useEffect, useState } from "react";
import { type ChatMessage } from "./types";
import { Box, Container, Flex, Heading, ScrollArea } from "@chakra-ui/react";
import { useStickToBottom } from "@/components/hooks/use-stick-to-bottom";
import appIcon from "@/app/icon.png";

// Render ChatInput only on the client to avoid hydration mismatches
const ChatInput = dynamic(
  () => import("@/components/ui/chat-input").then((m) => m.ChatInput),
  { ssr: false }
);

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const sticky = useStickToBottom();
  const { isAtBottom, scrollToBottom } = sticky;

  useEffect(() => {
    if (messages.length === 0) return;
    const id = requestAnimationFrame(() => {
      if (isAtBottom) scrollToBottom();
    });
    return () => cancelAnimationFrame(id);
  }, [messages.length, isAtBottom, scrollToBottom]);
  return (
    <Container centerContent maxW="container.lg" px={4}>
      <Flex direction="column" gap={2} w="full" h="100dvh" py={2}>
        <Heading size="xl" textAlign="center">
          Mistral AI Chat
        </Heading>
        {messages.length > 0 ? (
          <>
            <Box flex="1" minH={0} w="full" overflow="hidden">
              <ScrollArea.Root height="100%" variant="hover">
                <ScrollArea.Viewport ref={sticky.scrollRef}>
                  <ScrollArea.Content
                    spaceY="4"
                    textStyle="sm"
                    ref={sticky.contentRef}
                  >
                    <MessageList messages={messages} />
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar>
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </Box>
            <ChatInput messages={messages} setMessages={setMessages} />
          </>
        ) : (
          <>
            <Box
              flex="1"
              minH={0}
              w="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={appIcon}
                alt="Mistral AI Chat"
                width={128}
                height={128}
                priority
              />
            </Box>
            <ChatInput messages={messages} setMessages={setMessages} />
          </>
        )}
      </Flex>
    </Container>
  );
}
