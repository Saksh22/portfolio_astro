import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

const ChatInput = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-card rounded-full border border-border shadow-card px-6 py-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-2"
          readOnly
        />
        <Button variant="send" size="icon" className="ml-2">
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;