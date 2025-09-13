"use client";

import dynamic from "next/dynamic";
import { MessageList } from "@/components/ui/message-list";
import { useState } from "react";
import { type ChatMessage } from "./types";
import { Box, Container, Flex, Heading, ScrollArea } from "@chakra-ui/react";

// Render ChatInput only on the client to avoid hydration mismatches
const ChatInput = dynamic(
  () => import("@/components/ui/chat-input").then((m) => m.ChatInput),
  { ssr: false }
);

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  return (
    <Container centerContent maxW="container.lg" px={4}>
      <Flex direction="column" gap={2} w="full" h="100dvh" py={2}>
        <Heading size="xl" textAlign="center">Mistral AI Chat</Heading>
        {messages.length > 0 ? (
          <>
            <Box flex="1" minH={0} w="full" overflow="hidden">
              <ScrollArea.Root height="100%" variant="hover">
                <ScrollArea.Viewport>
                  <ScrollArea.Content spaceY="4" textStyle="sm">
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
          <Flex flex="1" align="center" justify="center" w="full">
            <ChatInput messages={messages} setMessages={setMessages} />
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
