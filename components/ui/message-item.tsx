import { type ChatMessage } from "../../app/types";
import { Box, Text } from "@chakra-ui/react";

type MessageItemProps = {
  message: ChatMessage;
};

export const MessageItem = ({ message }: MessageItemProps) => {
  const isAssistant = message.role === "assistant";
  const bg = isAssistant ? "orange.400" : "white";
  const color = isAssistant ? "white" : "black";
  const selfAlign = isAssistant ? "flex-start" : "flex-end";

  return (
    <Box
      maxW="75%"
      w="fit-content"
      display="inline-block"
      alignSelf={selfAlign}
      bg={bg}
      color={color}
      px={3}
      py={2}
      borderRadius="lg"
      boxShadow="sm"
    >
      <Text fontSize="xs" opacity={0.8} mb={1}>
        {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
      </Text>
      <Text whiteSpace="pre-wrap">{message.content}</Text>
    </Box>
  );
};
