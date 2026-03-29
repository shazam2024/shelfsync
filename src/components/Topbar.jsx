import { Bell, User, Search } from 'lucide-react'
import { useState } from 'react'

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, title: '5 students may leave', time: '2 hours ago', type: 'warning' },
    { id: 2, title: '10 fees due in 3 days', time: '4 hours ago', type: 'info' },
    { id: 3, title: 'New feedback received', time: '1 day ago', type: 'success' },
  ]

  return (
    <header className="h-16 bg-dark-800 border-b border-dark-600 fixed top-0 right-0 left-0 lg:left-64 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Mobile Logo - visible only on mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <img src="/logo.svg" alt="ShelfSync" className="w-8 h-8" />
          <span className="font-bold text-white">ShelfSync</span>
        </div>

        {/* Search - hidden on mobile */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search students, seats, notices..."
              className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-500 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-200 hover:bg-dark-700 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-dark-800 rounded-xl shadow-lg border border-dark-600 py-2 animate-fade-in">
                <div className="px-4 py-2 border-b border-dark-600">
                  <h3 className="font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-dark-700 cursor-pointer transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-200">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-dark-600">
                  <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-dark-600">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-200">Admin User</p>
              <p className="text-xs text-gray-500">Library Manager</p>
            </div>
            <div className="w-10 h-10 bg-primary-900/50 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
