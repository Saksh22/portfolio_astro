import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface PromptButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const PromptButton = ({ icon: Icon, label, isActive, onClick }: PromptButtonProps) => {
  return (
    <Button
      variant="prompt"
      size="prompt"
      onClick={onClick}
      className={`flex flex-col items-center gap-2 min-w-20 ${
        isActive ? "border-primary bg-primary/5 shadow-card" : ""
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
      <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
        {label}
      </span>
    </Button>
  );
};

export default PromptButton;
