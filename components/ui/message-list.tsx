import { type ChatMessage } from "../../app/types";
import { MessageItem } from "./message-item";
type MessageListProps = {
    messages: ChatMessage[];
}
export const MessageList = ({ messages }: MessageListProps) => {
    return (
        <div>
            {messages.map((msg, index) => (
                <MessageItem key={index} message={msg} />
            ))}
        </div>
    );
};