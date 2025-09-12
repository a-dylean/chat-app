import { type ChatMessage } from "../../app/types";
import { MessageItem } from "./message-item";
import { Stack, Box } from "@chakra-ui/react";

type MessageListProps = {
  messages: ChatMessage[];
};

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <Box px={4} py={3}>
      <Stack gap={3}>
        {messages.map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))}
      </Stack>
    </Box>
  );
};
