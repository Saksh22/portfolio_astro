import { createContext, useContext } from "react";

export type AboutData = {
  name: string;
  location: string;
  headline: string;
  tags: string[];
  quote: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  order?: number;
};

export type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  liveUrl?: string;
  color?: "blue" | "purple" | "amber";
  featured: boolean;
  order?: number;
};

export type SkillCategory = {
  title: string;
  icon: "code" | "server" | "palette" | "users" | "brain";
  skills: string[];
};

export type SkillsData = {
  intro: string;
  categories: SkillCategory[];
};

export type FunFact = { emoji: string; fact: string };
export type FunMedia = { 
  type?: "video" | "gif"; 
  url?: string; 
  thumbnail?: string; 
  caption?: string;
};
export type FunData = { 
  intro: string; 
  currentlyLearning: string; 
  facts: FunFact[];
  media?: FunMedia;
};

export type ContactData = {
  intro: string;
  email?: string;
  linkedin?: string;
  github?: string;
  phone?: string;
  preferred?: "email" | "linkedin" | "github" | "phone";
};

type CMSData = {
  about: AboutData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillsData;
  fun: FunData;
  contact: ContactData;
};

const CMSContext = createContext<CMSData | null>(null);

export function CMSProvider({
  data,
  children,
}: {
  data: CMSData;
  children: React.ReactNode;
}) {
  return <CMSContext.Provider value={data}>{children}</CMSContext.Provider>;
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error("useCMS must be used inside CMSProvider");
  }
  return ctx;
}
