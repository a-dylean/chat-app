"use client";

import { ChatInput } from "@/components/ui/chat-input";
import { MessageList } from "@/components/ui/message-list";
import { useState } from "react";
import { type ChatMessage } from "./types";
import { Box, Center, Container, Flex, Heading, ScrollArea } from "@chakra-ui/react";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  return (
    <Container centerContent>
      <Flex py={1} direction={"column"} gap={1} w="full">
      <Heading size="xl">Mistral AI Chat</Heading>
      <ScrollArea.Root height={500}>
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
      <ChatInput messages={messages} setMessages={setMessages} />
      </Flex>
    </Container>
  );
}
