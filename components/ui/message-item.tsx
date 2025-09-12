import { type ChatMessage } from '../../app/types';

type MessageItemProps = {
    message: ChatMessage;
};

export const MessageItem = ({ message }: MessageItemProps) => {
    return (
        <div>
            <strong>{message.role}</strong>: {message.content}
        </div>
    );
};