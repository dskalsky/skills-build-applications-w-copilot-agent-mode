import { Link, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Activities', path: '/activities' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <img alt="" className="me-2" height="38" src={logo} />
            <span>Octofit Tracker</span>
          </Link>
          <nav className="navbar-nav flex-row flex-wrap gap-2" aria-label="Main navigation">
            {navigation.map(({ label, path }) => (
              <Link className="nav-link px-2" key={path} to={path}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate replace to="/leaderboard" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <section className="text-center py-5">
                <h1 className="h2">Page not found</h1>
                <Link to="/leaderboard">Return to the leaderboard</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
