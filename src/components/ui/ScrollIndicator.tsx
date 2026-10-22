// A quiet scroll cue for the hero: a thin vertical track with an amber pip that
// travels down on a loop. Decorative → aria-hidden. The loop is CSS so it also
// respects the global reduced-motion rule.
export function ScrollIndicator({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex flex-col items-center gap-3 ${className}`}
    >
      <span className="mono-label [writing-mode:vertical-lr] uppercase tracking-widest">
        Scroll
      </span>
      <span className="relative h-16 w-px overflow-hidden bg-line-strong">
        <span className="scroll-pip absolute left-0 top-0 h-4 w-px bg-accent" />
      </span>
      <style>{`
        @keyframes scrollPip {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .scroll-pip { animation: scrollPip 2.2s cubic-bezier(0.7,0,0.3,1) infinite; }
      `}</style>
    </div>
  )
}
