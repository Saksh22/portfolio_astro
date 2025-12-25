import { User, Briefcase, Layers, Sparkles, MessageCircle, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Section = "about" | "projects" | "skills" | "fun" | "contact" | "experience";

export interface Prompt {
  id: Section;
  icon: LucideIcon;
  label: string;
  question: string;
}

export const prompts: Prompt[] = [
  { id: "about", icon: User, label: "Me", question: "Tell me about yourself" },
  { id: "experience", icon: Building2, label: "Experience", question: "What is your work experience?" },
  { id: "projects", icon: Briefcase, label: "Projects", question: "What projects have you worked on?" },
  { id: "skills", icon: Layers, label: "Skills", question: "What are your skills?" },
  { id: "fun", icon: Sparkles, label: "Fun", question: "Share some fun facts about yourself" },
  { id: "contact", icon: MessageCircle, label: "Contact", question: "How can I contact you?" },
];

