import { useState, useRef, useEffect } from "react";
import SplashCursor from "../components/SplashCursor";
import { User } from "lucide-react";
import ChatInput from "../components/ChatInput";
import PromptSelector from "../components/PromptSelector";
import ChatMessage from "../components/ChatMessage";
import LandingPage from "../components/LandingPage";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import FunSection from "@/components/sections/FunSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import { prompts } from "../lib/prompts";
import type { Section } from "../lib/prompts";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  section?: Section;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [hasPromptBeenClicked, setHasPromptBeenClicked] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handlePromptClick = (section: Section) => {
    const prompt = prompts.find((p) => p.id === section);
    if (!prompt || isTyping) return;

    // Mark that a prompt has been clicked
    setHasPromptBeenClicked(true);

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      content: prompt.question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI "thinking" delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: "assistant",
        content: "",
        section: section,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setCurrentSection(section);
      setIsTyping(false);
    }, 800);
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current?.scrollIntoView({block: "end"});
    }
  }, [messages]);

  const renderSectionContent = (section: Section) => {
    const isLatest = messages[messages.length - 1]?.section === section;
    
    switch (section) {
      case "about":
        return <AboutSection enableTyping={isLatest} />;
      case "experience":
        return <ExperienceSection enableTyping={isLatest} />;
      case "projects":
        return <ProjectsSection enableTyping={isLatest} />;
      case "skills":
        return <SkillsSection enableTyping={isLatest} />;
      case "fun":
        return <FunSection enableTyping={isLatest} />;
      case "contact":
        return <ContactSection enableTyping={isLatest} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-dvh flex flex-col relative">
      {/* Landing page - centered layout when no messages */}
      {messages.length === 0 ? (
        <>
          {/* SplashCursor as background - only on landing page */}
          <div className="fixed inset-0 z-0">
            <SplashCursor />
          </div>
          <LandingPage 
            currentSection={currentSection}
            onPromptClick={handlePromptClick}
          />
        </>
      ) : (
        <>
          {/* Chat area - when messages exist */}
          <div 
            ref={chatContainerRef}
            className="chat-scroll flex-1 overflow-y-auto px-4 py-8 pb-40 relative z-10"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Mini header when chat is active */}
              <div className="text-center pb-4 animate-fade-in">
                <div className="flex justify-center mb-2">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary/20 to-accent/10 flex items-center justify-center shadow-sm">
                    <img src="/laptop.png" alt="Type Avatar" className="w-18 h-18 object-cover" />
                  </div>
                </div>
                <h1 className="text-xl font-bold text-foreground">AI Portfolio</h1>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {message.type === "user" ? (
                    <ChatMessage type="user" content={message.content} />
                  ) : (
                    <div className="animate-fade-up">
                      <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8 ml-11">
                        {message.section && renderSectionContent(message.section)}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 animate-fade-up">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-4 h-4 text-foreground" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-card">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom fixed section - when messages exist */}
          <div className="sticky bottom-0 pb-6 pt-4 px-4 bg-linear-to-t from-background via-background to-transparent z-10">
            {/* Prompt buttons - show above input when clicked */}
            {hasPromptBeenClicked && (
              <div className="mb-4">
                <PromptSelector
                  prompts={prompts}
                  currentSection={currentSection}
                  onPromptClick={handlePromptClick}
                  isPill={true}
                  showWithAnimation={false}
                />
              </div>
            )}

            {/* Chat input */}
            <div className={hasPromptBeenClicked ? "" : "mb-4"}>
              <ChatInput />
            </div>

            {/* Prompt buttons - show below input initially */}
            {!hasPromptBeenClicked && (
              <PromptSelector
                prompts={prompts}
                currentSection={currentSection}
                onPromptClick={handlePromptClick}
                isPill={false}
                showWithAnimation={false}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
