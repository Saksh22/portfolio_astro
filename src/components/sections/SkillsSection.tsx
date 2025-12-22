import { useTypingEffect } from "@/hooks/useTypeEffect";
import { useCMS } from "@/context/CMSContext";
import { Code2, Server, Palette, Users, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillsSectionProps {
  enableTyping?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  server: Server,
  palette: Palette,
  users: Users,
  brain: Brain,
};

const SkillsSection = ({ enableTyping = false }: SkillsSectionProps) => {
  const { skills } = useCMS();
  const intro = "Here's a comprehensive overview of my technical skills and expertise:";
  
  const { displayedText, isTyping } = useTypingEffect({
    text: intro,
    enabled: enableTyping,
    speed: 15,
  });

//   if (loading) {
//     return (
//       <div className="space-y-6 animate-pulse">
//         <div className="h-4 bg-secondary rounded w-3/4" />
//         <div className="h-20 bg-secondary rounded" />
//         <div className="h-20 bg-secondary rounded" />
//       </div>
//     );
//   }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Skills & Expertise</h2>
        <p className="text-muted-foreground">
          {displayedText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </div>
      
      <div className="space-y-6">
        {skills.categories.map((category, categoryIndex) => {
          const IconComponent = iconMap[category.icon] || Code2;
          
          return (
            <div
              key={category.title}
              className="animate-fade-up"
              style={{ animationDelay: `${categoryIndex * 100 + 200}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <IconComponent className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-md bg-secondary border border-border text-foreground hover:border-primary/50 hover:bg-secondary/80 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
