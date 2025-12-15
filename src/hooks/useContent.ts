import { useState, useEffect } from "react";
import type {
  AboutContent,
  ExperienceContent,
  ProjectContent,
  SkillCategory,
  FunContent,
  ContactContent} from "../lib/content";

import{
  getAboutContent,
  getExperienceContent,
  getProjectsContent,
  getSkillsContent,
  getFunContent,
  getContactContent,
} from "../lib/content";

export function useAboutContent() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAboutContent().then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  return { content, loading };
}

export function useExperienceContent() {
  const [content, setContent] = useState<ExperienceContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperienceContent().then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  return { content, loading };
}

export function useProjectsContent() {
  const [content, setContent] = useState<ProjectContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectsContent().then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  return { content, loading };
}

export function useSkillsContent() {
  const [content, setContent] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkillsContent().then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  return { content, loading };
}

export function useFunContent() {
  const [content, setContent] = useState<FunContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFunContent().then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  return { content, loading };
}

export function useContactContent() {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContactContent().then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  return { content, loading };
}
