import ChatAvatar from "./ChatAvatar";
import ChatInput from "./ChatInput";
import PromptSelector from "./PromptSelector";
import { prompts } from "../lib/prompts";
import type { Section } from "../lib/prompts";

interface LandingPageProps {
  currentSection: Section | null;
  onPromptClick: (section: Section) => void;
}

const LandingPage = ({ currentSection, onPromptClick }: LandingPageProps) => {
  return (
    <div className="flex-1 flex items-center justify-center px-4 relative z-10">
      <div className="w-full max-w-3xl mx-auto text-center space-y-8">
        {/* Avatar */}
        <div 
          className="flex justify-center"
          style={{ 
            animation: "scale-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
            opacity: 0 
          }}
        >
          <ChatAvatar />
        </div>
        
        {/* Greeting and Title */}
        <div 
          style={{ 
            animation: "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
            opacity: 0 
          }}
        >
          <p className="text-muted-foreground mb-2 text-lg">Hey, My Name is</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sakshi Khochare
          </h1>
        </div>
        <p 
          className="text-muted-foreground"
          style={{ 
            animation: "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards",
            opacity: 0 
          }}
        >
          Click on one of the prompts below to learn more about me!
        </p>
        
        {/* Chat Input */}
        <div 
          className="flex justify-center"
          style={{ 
            animation: "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards",
            opacity: 0 
          }}
        >
          <ChatInput />
        </div>

        {/* Prompt buttons */}
        <PromptSelector
          prompts={prompts}
          currentSection={currentSection}
          onPromptClick={onPromptClick}
        />
      </div>
    </div>
  );
};

export default LandingPage;

