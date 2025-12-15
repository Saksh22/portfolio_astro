import { Badge } from "../../components/ui/badge";
import { useTypingEffect } from "../../hooks/useTypeEffect";
import { useAboutContent } from "../../hooks/useContent";

interface AboutSectionProps {
  enableTyping?: boolean;
}

const AboutSection = ({ enableTyping = false }: AboutSectionProps) => {
  const { content, loading } = useAboutContent();

  const bio = content?.bio || "Hey! 👋 I'm a passionate developer who loves building beautiful and functional web applications.";
  const quote = content?.quote || "I believe in writing clean code and creating intuitive experiences.";
  const tags = content?.tags || ["Developer", "Designer", "Creative", "Problem Solver"];

  const { displayedText: introText, isTyping: isTypingIntro } = useTypingEffect({
    text: bio,
    enabled: enableTyping,
    speed: 12,
  });

  const { displayedText: quoteText } = useTypingEffect({
    text: quote,
    enabled: enableTyping && !isTypingIntro,
    speed: 15,
  });

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-secondary rounded-2xl" />
        <div className="h-4 bg-secondary rounded w-3/4" />
        <div className="h-4 bg-secondary rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/3">
          <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-accent/10 border border-border flex items-center justify-center overflow-hidden">
            {content?.avatar ? (
              <img src="/laptop.png" alt={content.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">👋</span>
            )}
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{content?.name || "Your Name"}</h2>
            <p className="text-muted-foreground">{content?.location || "Your Location"}</p>
          </div>
          
          <p className="text-foreground leading-relaxed min-h-16">
            {introText}
            {isTypingIntro && <span className="animate-pulse">|</span>}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string, index:number) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="px-3 py-1 animate-fade-up"
                style={{ animationDelay: `${index * 100 + 500}ms` }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border">
        <p className="text-muted-foreground italic min-h-8">
          "{quoteText}"
          {!isTypingIntro && quoteText.length < quote.length && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
