import { useState, useRef, useEffect } from "react";
import { User, Briefcase, Layers, Sparkles, MessageCircle, Building2 } from "lucide-react";
import ChatAvatar from "../components/ChatAvatar";
import ChatInput from "../components/ChatInput";
import PromptButton from "../components/PromptButton";
import ChatMessage from "../components/ChatMessage";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import FunSection from "@/components/sections/FunSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

type Section = "about" | "projects" | "skills" | "fun" | "contact" | "experience";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  section?: Section;
}

const prompts: { id: Section; icon: typeof User; label: string; question: string }[] = [
  { id: "about", icon: User, label: "Me", question: "Tell me about yourself" },
  { id: "experience", icon: Building2, label: "Experience", question: "What is your work experience?" },
  { id: "projects", icon: Briefcase, label: "Projects", question: "What projects have you worked on?" },
  { id: "skills", icon: Layers, label: "Skills", question: "What are your skills?" },
  { id: "fun", icon: Sparkles, label: "Fun", question: "Share some fun facts about yourself" },
  { id: "contact", icon: MessageCircle, label: "Contact", question: "How can I contact you?" },
];

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
    <div className="h-dvh flex flex-col">
      {/* Landing page - centered layout when no messages */}
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-4">
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
            <div className="flex justify-center">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {prompts.map((prompt, index) => (
                  <div
                    key={prompt.id}
                    style={{ 
                      animation: `fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.9 + index * 0.1}s forwards`,
                      opacity: 0 
                    }}
                  >
                    <PromptButton
                      icon={prompt.icon}
                      label={prompt.label}
                      isActive={currentSection === prompt.id}
                      onClick={() => handlePromptClick(prompt.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Chat area - when messages exist */}
          <div 
            ref={chatContainerRef}
            className="chat-scroll flex-1 overflow-y-auto px-4 py-8 pb-40"
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
          <div className="sticky bottom-0 pb-6 pt-4 px-4 bg-linear-to-t from-background via-background to-transparent">
            {/* Prompt buttons - show above input when clicked */}
            {hasPromptBeenClicked && (
              <div className="flex justify-center mb-4">
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {prompts.map((prompt) => (
                    <PromptButton
                      key={prompt.id}
                      icon={prompt.icon}
                      label={prompt.label}
                      isActive={currentSection === prompt.id}
                      onClick={() => handlePromptClick(prompt.id)}
                      isPill={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <div className={hasPromptBeenClicked ? "" : "mb-4"}>
              <ChatInput />
            </div>

            {/* Prompt buttons - show below input initially */}
            {!hasPromptBeenClicked && (
              <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {prompts.map((prompt) => (
                    <PromptButton
                      key={prompt.id}
                      icon={prompt.icon}
                      label={prompt.label}
                      isActive={currentSection === prompt.id}
                      onClick={() => handlePromptClick(prompt.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
