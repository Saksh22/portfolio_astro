import { useTypingEffect } from "@/hooks/useTypeEffect";
import { useCMS } from "@/context/CMSContext";

interface ExperienceSectionProps {
  enableTyping?: boolean;
}

const ExperienceSection = ({ enableTyping = false }: ExperienceSectionProps) => {
    const { experiences } = useCMS();
    const exp = experiences ?? [];
    const intro = "Here's my professional journey and the companies I've had the pleasure to work with:";
    
    const { displayedText, isTyping } = useTypingEffect({
        text: intro,
        enabled: enableTyping,
        speed: 15,
    });

    // if (loading) {
    //     return (
    //     <div className="space-y-6 animate-pulse">
    //         <div className="h-4 bg-secondary rounded w-3/4" />
    //         <div className="h-24 bg-secondary rounded" />
    //         <div className="h-24 bg-secondary rounded" />
    //     </div>
    //     );
    // }

    return (
        <div className="space-y-6">
        <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Work Experience</h2>
            <p className="text-muted-foreground">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
            </p>
        </div>
        
        <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
            
            <div className="space-y-6">
            {exp.map((exp, index) => (
                <div
                key={index}
                className="relative pl-10 animate-fade-up"
                style={{ animationDelay: `${index * 150 + 300}ms` }}
                >
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">
                        {exp.period}
                    </span>
                    </div>
                    <p className="text-sm text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                        <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-card border border-border text-foreground"
                        >
                        {tech}
                        </span>
                    ))}
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default ExperienceSection;
