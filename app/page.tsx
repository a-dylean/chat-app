import { ChatInput } from "@/components/ui/chat-input";
import { MessageList } from "@/components/ui/message-list";
import { Button, HStack } from "@chakra-ui/react"

export default function Home() {
  return (
    <>
    <h1>Mistral AI Chat</h1>
    <MessageList />
    <ChatInput  />
    </>
  );
}
