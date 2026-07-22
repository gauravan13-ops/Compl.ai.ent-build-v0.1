import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  JURISDICTIONS,
  DOMAINS,
  matrixCell,
  jurisdictionRollup,
  domainRollup,
  portfolioRollup,
} from '../data/mockData'
import StatusGlyph from './StatusGlyph'

const CHIP_TINT = {
  red: 'bg-status-red/10',
  amber: 'bg-status-amber/10',
  green: 'bg-status-green/10',
}

// Glyph always precedes its number, everywhere in the matrix.
function RollupInline({ r }) {
  return (
    <span className="whitespace-nowrap font-mono text-[11px] tabular-nums">
      {r.red > 0 && <span className="text-status-red">●{r.red} </span>}
      {r.amber > 0 && <span className="text-status-amber">▲{r.amber} </span>}
      <span className="text-status-green">✓{r.green}</span>
    </span>
  )
}

function CellPopover({ jurisdiction, domain, cell, alignRight }) {
  const order = { red: 0, amber: 1, green: 2 }
  const preview = [...cell.items].sort((a, b) => order[a.status] - order[b.status]).slice(0, 5)
  return (
    <div
      className={`pointer-events-none absolute top-full z-20 mt-1 w-[340px] border border-rule bg-paper text-left ${
        alignRight ? 'right-0' : 'left-0'
      }`}
      role="tooltip"
    >
      <div className="flex items-baseline justify-between border-b border-rule px-3 py-1.5">
        <span className="text-[12px] font-medium">
          <span className="font-mono">{jurisdiction.code}</span> · {domain.label}
        </span>
        <span className="font-mono text-[11px] text-ink-muted">{cell.total} obligations</span>
      </div>
      <ul>
        {preview.map((o) => (
          <li key={o.id} className="flex items-baseline gap-2 border-b border-rule/60 px-3 py-1.5 last:border-b-0">
            <StatusGlyph status={o.status} className="text-[11px]" />
            <span className="min-w-0 flex-1 truncate text-[12px]">{o.title}</span>
            <span className="shrink-0 font-mono text-[10.5px] text-ink-muted">
              {o.deadline || o.nextReview}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-rule px-3 py-1.5 text-[11.5px] text-accent">
        Open all {cell.total} in register →
      </div>
    </div>
  )
}

function MatrixCell({ jurisdiction, domain, colIndex }) {
  const [open, setOpen] = useState(false)
  const cell = matrixCell(jurisdiction.code, domain.key)
  const alignRight = colIndex >= DOMAINS.length - 2

  if (cell.na) {
    return (
      <td className="border-b border-l border-rule p-0">
        <div
          className="hatch flex h-11 items-center justify-center"
          title={cell.reason}
          aria-label={`Not applicable: ${cell.reason}`}
        >
          <span className="font-mono text-[10.5px] text-status-grey">N/A</span>
        </div>
      </td>
    )
  }

  const attention = cell.red + cell.amber
  return (
    <td className="relative border-b border-l border-rule p-0">
      <Link
        to={`/register?jurisdiction=${jurisdiction.code}&domain=${domain.key}`}
        className="flex h-11 items-center justify-center hover:bg-surface/70"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label={`${jurisdiction.name}, ${domain.label}: ${cell.total} obligations, ${cell.red} breach, ${cell.amber} action needed`}
      >
        <span className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 ${CHIP_TINT[cell.worst]}`}>
          <StatusGlyph status={cell.worst} className="text-[11px]" />
          <span className="font-mono text-[12px] tabular-nums">
            {cell.worst === 'green' ? cell.total : (
              <>
                {attention}
                <span className="text-ink-muted">/{cell.total}</span>
              </>
            )}
          </span>
        </span>
      </Link>
      {open && <CellPopover jurisdiction={jurisdiction} domain={domain} cell={cell} alignRight={alignRight} />}
    </td>
  )
}

export default function ObligationMatrix() {
  const portfolio = portfolioRollup()
  return (
    <section aria-label="Obligation matrix" className="border-b border-rule bg-paper">
      {/* Desktop grid — fixed layout so the seven domain columns share width evenly */}
      <table className="hidden w-full table-fixed border-collapse md:table">
        <thead>
          <tr className="text-[11px] uppercase tracking-wide text-ink-muted">
            <th scope="col" className="w-[148px] border-b border-rule px-3 py-1.5 text-left font-medium">
              Jurisdiction
            </th>
            {DOMAINS.map((d) => (
              <th key={d.key} scope="col" className="border-b border-l border-rule px-1 py-1.5 text-center font-medium">
                {d.label}
              </th>
            ))}
            <th scope="col" className="w-[168px] border-b border-l border-rule px-3 py-1.5 text-right font-medium">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {JURISDICTIONS.map((j) => {
            const r = jurisdictionRollup(j.code)
            return (
              <tr key={j.code}>
                <th scope="row" className="border-b border-rule px-3 py-0 text-left font-normal">
                  <span className="font-mono text-[12px] font-medium">{j.code}</span>
                  <span className="ml-2 text-[12px] text-ink-muted">{j.name}</span>
                </th>
                {DOMAINS.map((d, i) => (
                  <MatrixCell key={d.key} jurisdiction={j} domain={d} colIndex={i} />
                ))}
                <td className="whitespace-nowrap border-b border-l border-rule px-3 text-right">
                  <span className="font-mono text-[12px] tabular-nums">{r.total}</span>
                  <span className="ml-2">
                    <RollupInline r={r} />
                  </span>
                </td>
              </tr>
            )
          })}
          <tr className="bg-surface/60">
            <th scope="row" className="px-3 py-1.5 text-left text-[11px] font-medium uppercase tracking-wide text-ink-muted">
              All markets
            </th>
            {DOMAINS.map((d) => {
              const r = domainRollup(d.key)
              return (
                <td key={d.key} className="whitespace-nowrap border-l border-rule px-1 py-1.5 text-center">
                  <span className="font-mono text-[11px] tabular-nums text-ink-muted">{r.total}</span>
                  {(r.red > 0 || r.amber > 0) && (
                    <span className="ml-1.5 font-mono text-[10.5px] tabular-nums">
                      {r.red > 0 && <span className="text-status-red">●{r.red}</span>}
                      {r.red > 0 && r.amber > 0 && ' '}
                      {r.amber > 0 && <span className="text-status-amber">▲{r.amber}</span>}
                    </span>
                  )}
                </td>
              )
            })}
            <td className="whitespace-nowrap border-l border-rule px-3 py-1.5 text-right">
              <span className="font-mono text-[12px] font-medium tabular-nums">{portfolio.total}</span>
              <span className="ml-2">
                <RollupInline r={portfolio} />
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* < 768px: vertical stack of jurisdiction rows, not a horizontal scroll */}
      <div className="md:hidden">
        {JURISDICTIONS.map((j) => {
          const r = jurisdictionRollup(j.code)
          return (
            <div key={j.code} className="border-b border-rule px-3 py-2 last:border-b-0">
              <div className="flex items-baseline justify-between">
                <span>
                  <span className="font-mono text-[12px] font-medium">{j.code}</span>
                  <span className="ml-2 text-[12px] text-ink-muted">{j.name}</span>
                </span>
                <RollupInline r={r} />
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {DOMAINS.map((d) => {
                  const cell = matrixCell(j.code, d.key)
                  if (cell.na) {
                    return (
                      <span key={d.key} className="hatch rounded-sm border border-rule px-2 py-0.5 font-mono text-[10.5px] text-status-grey">
                        {d.label} N/A
                      </span>
                    )
                  }
                  const attention = cell.red + cell.amber
                  return (
                    <Link
                      key={d.key}
                      to={`/register?jurisdiction=${j.code}&domain=${d.key}`}
                      className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[11px] ${CHIP_TINT[cell.worst]}`}
                    >
                      {d.label}
                      <StatusGlyph status={cell.worst} className="text-[10px]" />
                      <span className="font-mono text-[11px] tabular-nums">
                        {cell.worst === 'green' ? cell.total : `${attention}/${cell.total}`}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
