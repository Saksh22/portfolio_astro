import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/useTypeEffect";
import { useCMS } from "@/context/CMSContext";

interface ContactSectionProps {
  enableTyping?: boolean;
}

const ContactSection = ({ enableTyping = false }: ContactSectionProps) => {
  const { contact } = useCMS();
  const intro = "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the platforms below!";
  
  const { displayedText, isTyping } = useTypingEffect({
    text: intro,
    enabled: enableTyping,
    speed: 12,
  });

//   if (loading) {
//     return (
//       <div className="space-y-6 animate-pulse">
//         <div className="h-4 bg-secondary rounded w-3/4" />
//         <div className="flex gap-3">
//           <div className="h-10 w-24 bg-secondary rounded" />
//           <div className="h-10 w-24 bg-secondary rounded" />
//         </div>
//       </div>
//     );
//   }

  const socialLinks = [
    { icon: Mail, label: "Email", href: contact?.email ? `mailto:${contact.email}` : null, color: "hover:text-red-500" },
    { icon: Linkedin, label: "LinkedIn", href: contact?.linkedin || null, color: "hover:text-blue-600" },
    { icon: Github, label: "GitHub", href: contact?.github || null, color: "hover:text-foreground" },
    { icon: Twitter, label: "Twitter", href: contact?.twitter || null, color: "hover:text-sky-500" },
  ].filter(link => link.href);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Let's Connect!</h2>
        <p className="text-muted-foreground min-h-12">
          {displayedText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.href!}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 100 + 400}ms`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <Button variant="outline" className={`gap-2 ${link.color} transition-colors`}>
              <link.icon className="w-4 h-4" />
              {link.label}
            </Button>
          </a>
        ))}
      </div>
      
      {contact?.email && (
        <div 
          className="p-5 rounded-xl bg-linear-to-br from-primary/5 to-accent/5 border border-primary/20 animate-fade-up"
          style={{ animationDelay: '800ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          <p className="text-sm text-muted-foreground mb-2">Preferred contact method:</p>
          <a href={`mailto:${contact.email}`} className="text-primary font-medium hover:underline">
            {contact.email}
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactSection;
