import { type ChatMessage } from "../../app/types";
import { Box, Text } from "@chakra-ui/react";

type MessageItemProps = {
  message: ChatMessage;
};

export const MessageItem = ({ message }: MessageItemProps) => {
  const isAssistant = message.role === "assistant";
  const bg = isAssistant ? "orange.400" : "white";
  const color = isAssistant ? "white" : "black";

  return (
    <Box
      maxW="75%"
      bg={bg}
      color={color}
      px={3}
      py={2}
      borderRadius="lg"
      boxShadow="sm"
    >
      <Text fontSize="xs" opacity={0.8} mb={1}>
        {message.role}
      </Text>
      <Text whiteSpace="pre-wrap">{message.content}</Text>
    </Box>
  );
};
