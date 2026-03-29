import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import StudentDetail from './pages/StudentDetail'
import Fees from './pages/Fees'
import Seats from './pages/Seats'
import Attendance from './pages/Attendance'
import Notices from './pages/Notices'
import Absence from './pages/Absence'
import DropRisk from './pages/DropRisk'
import Gamification from './pages/Gamification'
import Feedback from './pages/Feedback'

function AppContent() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return <Login />
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Sidebar />
      <div className="lg:ml-64">
        <Topbar />
        <main className="pt-20 p-6 mt-2">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/seats" element={<Seats />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/absence" element={<Absence />} />
            <Route path="/drop-risk" element={<DropRisk />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return <AppContent />
}

export default App
