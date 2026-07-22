import ObligationMatrix from '../components/ObligationMatrix'

// Pass 3: only Band 2 (the obligation matrix) is built. Bands 1, 3 and 4
// arrive in pass 4 once the matrix is approved — it sets the visual bar.
export default function Dashboard() {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-rule bg-paper px-6 py-2">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
          Obligation matrix — 5 markets × 7 domains
        </h2>
        <span className="text-[11px] text-ink-muted">
          Hover a cell to preview · click to open in register
        </span>
      </div>
      <ObligationMatrix />
    </div>
  )
}
