// Content types for CMS
export interface AboutContent {
  name: string;
  location: string;
  tagline: string;
  bio: string;
  quote: string;
  tags: string[];
  avatar?: string;
}

export interface ExperienceContent {
  role: string;
  company: string;
  period: string;
  description: string;
  order: number;
  technologies: string[];
}

export interface ProjectContent {
  title: string;
  description: string;
  order: number;
  github?: string;
  liveUrl?: string;
  color: "blue" | "purple" | "amber";
  tags: string[];
}

export interface SkillCategory {
  title: string;
  icon: "code" | "server" | "palette" | "users" | "brain";
  order: number;
  skills: string[];
}

export interface FunContent {
  facts: { emoji: string; fact: string }[];
  currentlyLearning: string;
}

export interface ContactContent {
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

// Helper to load JSON content
async function loadJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(path);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// Load all JSON files from a "folder" (we list known files)
async function loadJsonFiles<T>(basePath: string, files: string[]): Promise<T[]> {
  const results = await Promise.all(
    files.map(file => loadJson<T>(`${basePath}/${file}.json`))
  );
  const filtered: T[] = [];
  for (const r of results) {
    if (r !== null) filtered.push(r);
  }
  return filtered;
}

export async function getAboutContent(): Promise<AboutContent | null> {
  return loadJson<AboutContent>('/content/about.json');
}

export async function getExperienceContent(): Promise<ExperienceContent[]> {
  const files = ['senior-frontend', 'fullstack-dev', 'junior-dev'];
  const experiences = await loadJsonFiles<ExperienceContent>('/content/experience', files);
  return experiences.sort((a, b) => a.order - b.order);
}

export async function getProjectsContent(): Promise<ProjectContent[]> {
  const files = ['project-alpha', 'project-beta', 'project-gamma'];
  const projects = await loadJsonFiles<ProjectContent>('/content/projects', files);
  return projects.sort((a, b) => a.order - b.order);
}

export async function getSkillsContent(): Promise<SkillCategory[]> {
  const files = ['frontend', 'backend', 'design', 'softskills', 'ai'];
  const skills = await loadJsonFiles<SkillCategory>('/content/skills', files);
  return skills.sort((a, b) => a.order - b.order);
}

export async function getFunContent(): Promise<FunContent | null> {
  return loadJson<FunContent>('/content/fun.json');
}

export async function getContactContent(): Promise<ContactContent | null> {
  return loadJson<ContactContent>('/content/contact.json');
}
