// Status is always colour + glyph, never colour alone (BRIEF.md: officers
// print and forward these screens; some are colour-blind).
const GLYPH = { red: '●', amber: '▲', green: '✓', grey: '—' }
const COLOR = {
  red: 'text-status-red',
  amber: 'text-status-amber',
  green: 'text-status-green',
  grey: 'text-status-grey',
}
const LABEL = { red: 'breach / overdue', amber: 'action needed', green: 'covered', grey: 'not applicable' }

export default function StatusGlyph({ status, className = '' }) {
  return (
    <span aria-label={LABEL[status]} className={`${COLOR[status]} ${className}`}>
      {GLYPH[status]}
    </span>
  )
}

export { GLYPH, COLOR, LABEL }
