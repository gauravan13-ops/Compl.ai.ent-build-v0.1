import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './screens/Dashboard'
import Register from './screens/Register'
import ObligationDetail from './screens/ObligationDetail'
import Ask from './screens/Ask'
import ChangeFeed from './screens/ChangeFeed'
import Sources from './screens/Sources'
import ReviewQueue from './screens/ReviewQueue'
import CompanyProfile from './screens/CompanyProfile'
import AuditLog from './screens/AuditLog'

const NAV = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/register', label: 'Register' },
  { to: '/ask', label: 'Ask' },
  { to: '/changes', label: 'Changes' },
  { to: '/sources', label: 'Sources' },
  { to: '/review', label: 'Review' },
  { to: '/profile', label: 'Profile' },
  { to: '/audit', label: 'Audit' },
]

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-rule bg-paper">
        <div className="flex items-center gap-6 px-6 h-11">
          <NavLink to="/" className="font-serif font-semibold text-[15px] tracking-tight">
            Compl.ai.ent
          </NavLink>
          <nav className="flex items-center gap-1 text-[13px]">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-2.5 py-1 rounded-sm ${
                    isActive
                      ? 'text-ink font-medium bg-surface'
                      : 'text-ink-muted hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/obligations/:id" element={<ObligationDetail />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/ask/:id" element={<Ask />} />
          <Route path="/changes" element={<ChangeFeed />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/review" element={<ReviewQueue />} />
          <Route path="/profile" element={<CompanyProfile />} />
          <Route path="/audit" element={<AuditLog />} />
        </Routes>
      </main>
    </div>
  )
}
