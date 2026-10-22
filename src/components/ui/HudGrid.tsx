// Faint aerospace/HUD grid backdrop. Purely decorative → aria-hidden.
// The mask in .hud-grid fades it toward the edges so it never competes
// with content.
export function HudGrid({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`hud-grid pointer-events-none absolute inset-0 ${className}`}
    />
  )
}
