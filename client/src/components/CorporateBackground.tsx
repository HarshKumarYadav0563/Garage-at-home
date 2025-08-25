export function CorporateBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Subtle geometric pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 2px),
            radial-gradient(circle at 75px 75px, rgba(56, 189, 248, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white/80 to-transparent" />
    </div>
  );
}