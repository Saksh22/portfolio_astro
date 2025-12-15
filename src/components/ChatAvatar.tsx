const ChatAvatar = () => {
  return (
    <div className="relative w-40 h-40">
      
      {/* Background gradients (LOW z-index) */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-linear-to-br from-primary/20 to-accent/10 blur-xl z-0" />
      <div className="absolute -bottom-4 -left-8 w-24 h-24 rounded-full bg-linear-to-br from-cyan-500/15 to-blue-500/10 blur-xl z-0" />

      {/* Image (HIGH z-index, centered) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <img
          src="/avatar.png"
          alt="Chat avatar"
          className="w-50 h-50 rounded-full object-cover "
        />
      </div>

    </div>
  );
};

export default ChatAvatar;
