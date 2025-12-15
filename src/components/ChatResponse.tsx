import type { ReactNode } from "react";

interface ChatResponseProps {
  children: ReactNode;
}

const ChatResponse = ({ children }: ChatResponseProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-up">
      <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default ChatResponse;
