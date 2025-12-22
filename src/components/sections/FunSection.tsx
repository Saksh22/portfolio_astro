import { useTypingEffect } from "@/hooks/useTypeEffect";
import { useCMS } from "@/context/CMSContext";

interface FunSectionProps {
  enableTyping?: boolean;
}

const FunSection = ({ enableTyping = false }: FunSectionProps) => {
  const { fun } = useCMS();
  const intro = "Beyond coding, here are some fun facts about me that make me who I am:";
  
  const { displayedText, isTyping } = useTypingEffect({
    text: intro,
    enabled: enableTyping,
    speed: 15,
  });

  const facts = fun?.facts || [];
  const currentlyLearning = fun?.currentlyLearning || "Something new";

//   if (loading) {
//     return (
//       <div className="space-y-6 animate-pulse">
//         <div className="h-4 bg-secondary rounded w-3/4" />
//         <div className="grid grid-cols-2 gap-3">
//           <div className="h-16 bg-secondary rounded" />
//           <div className="h-16 bg-secondary rounded" />
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Fun Facts About Me</h2>
        <p className="text-muted-foreground">
          {displayedText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-3">
        {facts.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors animate-fade-up"
            style={{ animationDelay: `${index * 100 + 300}ms`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-sm text-foreground">{item.fact}</span>
          </div>
        ))}
      </div>
      
      <div 
        className="p-4 rounded-xl bg-linear-to-r from-primary/10 to-accent/10 border border-primary/20 animate-fade-up"
        style={{ animationDelay: '900ms', opacity: 0, animationFillMode: 'forwards' }}
      >
        <p className="text-center text-muted-foreground">
          🎯 Currently learning: <span className="text-foreground font-medium">{currentlyLearning}</span>
        </p>
      </div>
    </div>
  );
};

export default FunSection;
