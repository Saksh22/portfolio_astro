import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  type: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

const ChatMessage = ({ type, content, isTyping }: ChatMessageProps) => {
  const isUser = type === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} animate-fade-up`}>
      {/* Avatar */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card border border-border shadow-card rounded-bl-md"
        }`}
      >
        <p className={`text-sm ${isUser ? "" : "text-foreground"}`}>
          {content}
          {isTyping && (
            <span className="inline-flex ml-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce mx-0.5" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
