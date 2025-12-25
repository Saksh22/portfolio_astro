import type { LucideIcon } from "lucide-react";
import type { Section } from "../lib/prompts";
import { Button } from "./ui/button";

interface PromptButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isPill?: boolean;
  sectionId?: Section;
}

// Color mapping for each section icon
const getIconColor = (sectionId?: Section, isActive?: boolean): string => {
  if (isActive) {
    return "text-primary";
  }
  
  switch (sectionId) {
    case "about":
      return "text-blue-400";
    case "experience":
      return "text-purple-400";
    case "projects":
      return "text-amber-400";
    case "skills":
      return "text-green-400";
    case "fun":
      return "text-pink-400";
    case "contact":
      return "text-cyan-400";
    default:
      return "text-muted-foreground";
  }
};

const PromptButton = ({ icon: Icon, label, isActive, onClick, isPill = false, sectionId }: PromptButtonProps) => {
  const iconColor = getIconColor(sectionId, isActive);
  
  return (
    <Button
      variant="prompt"
      size="prompt"
      onClick={onClick}
      className={`${
        isPill 
          ? "flex flex-row items-center gap-2 rounded-xl px-4 py-2" 
          : "flex flex-col items-center gap-2 min-w-12 sm:min-w-20"
      } ${
        isActive ? "border-primary bg-primary/5 shadow-card" : ""
      }`}
    >
      <Icon className={`w-5 h-5 transition-colors ${iconColor}`} />
      <span className={`text-sm font-medium hidden sm:inline ${isActive ? "text-primary" : "text-foreground"}`}>
        {label}
      </span>
    </Button>
  );
};

export default PromptButton;
