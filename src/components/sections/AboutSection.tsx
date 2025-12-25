import { Badge } from "../../components/ui/badge";
import { useTypingEffect } from "../../hooks/useTypeEffect";
import { useCMS } from "../../context/CMSContext";
import { useState, useEffect } from "react";



interface AboutSectionProps {
  enableTyping?: boolean;
}

const AboutSection = ({ enableTyping = false }: AboutSectionProps) => {
  const { about } = useCMS();

  const bio = about.headline || "Hey! 👋 I'm a passionate developer who loves building beautiful and functional web applications.";
  const quote = about.quote || "I believe in writing clean code and creating intuitive experiences.";
  const tags = about.tags || ["Developer", "Designer", "Creative", "Problem Solver"];

  const { displayedText: introText, isTyping: isTypingIntro } = useTypingEffect({
    text: bio,
    enabled: enableTyping,
    speed: 12,
  });

  const [tagsAnimationComplete, setTagsAnimationComplete] = useState(!enableTyping);

  // Calculate when tag chips animation completes
  useEffect(() => {
    if (!enableTyping) {
      // If typing is disabled, show everything immediately
      setTagsAnimationComplete(true);
      return;
    }

    if (!isTypingIntro) {
      // Animation duration: 800ms, delay per chip: 180ms
      const lastChipDelay = (tags.length - 1) * 180;
      const animationDuration = 800;
      const totalTime = lastChipDelay + animationDuration;
      
      const timer = setTimeout(() => {
        setTagsAnimationComplete(true);
      }, totalTime);

      return () => clearTimeout(timer);
    }
  }, [isTypingIntro, enableTyping, tags.length]);

  const { displayedText: quoteText } = useTypingEffect({
    text: quote,
    enabled: enableTyping && !isTypingIntro && tagsAnimationComplete,
    speed: 15,
  });

  // if (loading) {
  //   return (
  //     <div className="space-y-6 animate-pulse">
  //       <div className="h-32 bg-secondary rounded-2xl" />
  //       <div className="h-4 bg-secondary rounded w-3/4" />
  //       <div className="h-4 bg-secondary rounded w-1/2" />
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/3">
          <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-accent/10 border border-border flex items-center justify-center overflow-hidden">
            {/* {about?.avatar ? (
              <img src="/laptop.png" alt={about.name} className="w-full h-full object-cover" />
            ) : ( */}
              <span className="text-6xl">👋</span>
            {/* )} */}
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{about?.name || "Your Name"}</h2>
            <p className="text-muted-foreground">{about?.location || "Your Location"}</p>
          </div>
          
          <p className="text-foreground leading-relaxed min-h-16">
            {introText}
            {isTypingIntro && <span className="animate-pulse">|</span>}
          </p>
          
          {!isTypingIntro && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string, index:number) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="px-3 py-1 opacity-0 animate-tag-appear"
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {tagsAnimationComplete && (
        <div className="pt-4 border-t border-border">
          <p className="text-muted-foreground italic min-h-8">
            "{quoteText}"
            {enableTyping && quoteText.length < quote.length && <span className="animate-pulse">|</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
