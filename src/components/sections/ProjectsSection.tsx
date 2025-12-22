import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/useTypeEffect";
import { useCMS } from "@/context/CMSContext";

interface ProjectsSectionProps {
  enableTyping?: boolean;
}

const colorClasses = {
  blue: "from-blue-500/10 to-cyan-500/10",
  purple: "from-purple-500/10 to-pink-500/10",
  amber: "from-amber-500/10 to-orange-500/10",
};

const ProjectsSection = ({ enableTyping = false }: ProjectsSectionProps) => {
  const { projects } = useCMS();
  const intro = "Here are some of my featured projects that showcase my skills and experience:";
  
  
  const { displayedText, isTyping } = useTypingEffect({
    text: intro,
    enabled: enableTyping,
    speed: 15,
  });

  // if (loading) {
  //   return (
  //     <div className="space-y-6 animate-pulse">
  //       <div className="h-4 bg-secondary rounded w-3/4" />
  //       <div className="h-32 bg-secondary rounded" />
  //       <div className="h-32 bg-secondary rounded" />
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Featured Projects</h2>
        <p className="text-muted-foreground">
          {displayedText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </div>
      
      <div className="grid gap-4">
        {projects.map((project, index) => {
        const colorClass = colorClasses[project.color ?? "blue"];
        return (
          <div
            key={project.title}
            className={`p-5 rounded-xl bg-linear-to-br ${colorClass} border border-border/50 hover:border-primary/30 transition-all duration-200 animate-fade-up`}
            style={{ animationDelay: `${index * 150 + 300}ms`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-foreground">{project.title}</h3>
              <div className="flex gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="w-4 h-4" />
                    </Button>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                )}
                {!project.github && !project.liveUrl && (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-md bg-background/80 text-muted-foreground">
                  {tag}
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

export default ProjectsSection;
