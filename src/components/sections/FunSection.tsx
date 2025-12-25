import { useTypingEffect } from "@/hooks/useTypeEffect";
import { useCMS } from "@/context/CMSContext";
import { useState, useEffect } from "react";

interface FunSectionProps {
  enableTyping?: boolean;
}

// Helper function to check if URL is YouTube
const isYouTube = (url: string) => {
  if (!url) return false;
  return /youtube\.com|youtu\.be/.test(url);
};

// Helper function to extract YouTube video ID
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to check if URL is Vimeo
const isVimeo = (url: string) => {
  if (!url) return false;
  return /vimeo\.com/.test(url);
};

// Helper function to extract Vimeo video ID
const getVimeoId = (url: string) => {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
};

// Helper function to check if it's a local path (starts with /)
const isLocalPath = (url: string) => {
  if (!url) return false;
  return url.startsWith('/') && !url.startsWith('//');
};

const FunSection = ({ enableTyping = false }: FunSectionProps) => {
  const { fun } = useCMS();
  const intro = fun?.intro || "Beyond coding, here are some fun facts about me that make me who I am:";
  
  const { displayedText, isTyping } = useTypingEffect({
    text: intro,
    enabled: enableTyping,
    speed: 15,
  });

  const facts = fun?.facts || [];
  const currentlyLearning = fun?.currentlyLearning || "Something new";
  const media = fun?.media;

  const [introComplete, setIntroComplete] = useState(!enableTyping);
  const [showMedia, setShowMedia] = useState(false);

  // Track when intro finishes
  useEffect(() => {
    if (!enableTyping) {
      setIntroComplete(true);
      return;
    }
    
    if (!isTyping) {
      const timer = setTimeout(() => {
        setIntroComplete(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTyping, enableTyping]);

  // Show media after facts appear
  useEffect(() => {
    if (introComplete && media?.url) {
      const factsDelay = facts.length * 100 + 300;
      const timer = setTimeout(() => {
        setShowMedia(true);
      }, factsDelay + 500);
      return () => clearTimeout(timer);
    }
  }, [introComplete, facts.length, media?.url]);

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
      
      {introComplete && (
        <div className="grid sm:grid-cols-2 gap-3">
          {facts.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-sm text-foreground">{item.fact}</span>
            </div>
          ))}
        </div>
      )}
      
      {introComplete && (
        <div 
          className="p-4 rounded-xl bg-linear-to-r from-primary/10 to-accent/10 border border-primary/20 opacity-0 animate-fade-up"
          style={{ animationDelay: `${facts.length * 100 + 300}ms`, animationFillMode: 'forwards' }}
        >
          <p className="text-center text-muted-foreground">
            🎯 Currently learning: <span className="text-foreground font-medium">{currentlyLearning}</span>
          </p>
        </div>
      )}

      {showMedia && media?.url && (
        <div 
          className="rounded-xl overflow-hidden border border-border/50 bg-secondary/30 opacity-0 animate-fade-up"
          style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
        >
          {media.type === "gif" ? (
            <div className="relative">
              <img 
                src={media.url} 
                alt={media.caption || "Fun GIF"} 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {media.caption && (
                <div className="px-4 py-3 bg-linear-to-r from-secondary/60 via-secondary/50 to-secondary/60 border-t border-border/30">
                  <p className="text-sm text-foreground/90 text-center font-medium leading-relaxed">
                    {media.caption}
                  </p>
                </div>
              )}
            </div>
          ) : media.type === "video" ? (
            <div className="relative">
              {isYouTube(media.url) ? (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeId(media.url)}`}
                    title={media.caption || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : isVimeo(media.url) ? (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://player.vimeo.com/video/${getVimeoId(media.url)}`}
                    title={media.caption || "Video"}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video
                  className="w-full h-auto"
                  controls
                  poster={media.thumbnail}
                >
                  <source src={media.url} type="video/mp4" />
                  <source src={media.url} type="video/webm" />
                  <source src={media.url} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              )}
              {media.caption && (
                <div className="px-4 py-3 bg-linear-to-r from-secondary/60 via-secondary/50 to-secondary/60 border-t border-border/30">
                  <p className="text-sm text-foreground/90 text-center font-medium leading-relaxed">
                    {media.caption}
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Auto-detect: if it ends with .gif, treat as GIF, otherwise as video
            media.url.endsWith('.gif') || media.url.endsWith('.GIF') ? (
              <div className="relative">
                <img 
                  src={media.url} 
                  alt={media.caption || "Fun GIF"} 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {media.caption && (
                  <p className="p-3 text-sm text-muted-foreground text-center bg-secondary/50">
                    {media.caption}
                  </p>
                )}
              </div>
            ) : (
              <div className="relative">
                <video
                  className="w-full h-auto"
                  controls
                  poster={media.thumbnail}
                >
                  <source src={media.url} type="video/mp4" />
                  <source src={media.url} type="video/webm" />
                  <source src={media.url} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
                {media.caption && (
                  <p className="p-3 text-sm text-muted-foreground text-center bg-secondary/50">
                    {media.caption}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FunSection;
