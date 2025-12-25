import PromptButton from "./PromptButton";
import type { Section, Prompt } from "../lib/prompts";

interface PromptSelectorProps {
  prompts: Prompt[];
  currentSection: Section | null;
  onPromptClick: (section: Section) => void;
  isPill?: boolean;
  showWithAnimation?: boolean;
}

const PromptSelector = ({ 
  prompts, 
  currentSection, 
  onPromptClick, 
  isPill = false,
  showWithAnimation = true 
}: PromptSelectorProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {prompts.map((prompt, index) => (
          <div
            key={prompt.id}
            style={showWithAnimation ? { 
              animation: `fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.9 + index * 0.1}s forwards`,
              opacity: 0 
            } : undefined}
          >
            <PromptButton
              icon={prompt.icon}
              label={prompt.label}
              isActive={currentSection === prompt.id}
              onClick={() => onPromptClick(prompt.id)}
              isPill={isPill}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptSelector;

