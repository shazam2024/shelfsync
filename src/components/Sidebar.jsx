import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Armchair,
  Clock,
  Bell,
  Calendar,
  AlertTriangle,
  Trophy,
  MessageSquare,
  LogOut,
  BookOpen,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/students', icon: Users, label: 'Students' },
  { path: '/fees', icon: CreditCard, label: 'Fees & Validity' },
  { path: '/seats', icon: Armchair, label: 'Seats & Shifts' },
  { path: '/attendance', icon: Clock, label: 'Attendance' },
  { path: '/notices', icon: Bell, label: 'Notices' },
  { path: '/absence', icon: Calendar, label: 'Leave Tracking' },
  { path: '/drop-risk', icon: AlertTriangle, label: 'Drop Risk' },
  { path: '/gamification', icon: Trophy, label: 'Leaderboard' },
  { path: '/feedback', icon: MessageSquare, label: 'Feedback' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-dark-800 rounded-lg shadow-md lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-dark-800 border-r border-dark-600 w-64 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-dark-600">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="ShelfSync" className="w-10 h-10" />
              <div>
                <h1 className="font-bold text-lg text-white">ShelfSync</h1>
                <p className="text-xs text-gray-400">Management System</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-primary-900/50 text-primary-300 font-medium'
                          : 'text-gray-400 hover:bg-dark-700 hover:text-gray-200'
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-dark-600">
            <NavLink
              to="/login"
              className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  )
}
