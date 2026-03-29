import { useState, useEffect } from 'react'
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  IndianRupee,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Calendar,
  Armchair
} from 'lucide-react'
import { StatCard, Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StatsChart, BarChartComponent } from '../components/ui/Charts'
import { students, dailyAttendance, revenueData, smartSuggestions } from '../data/mockData'
import { simulateApiCall } from '../utils/index.js'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const loadStats = async () => {
      const data = await simulateApiCall({
        totalStudents: students.length,
        activeStudents: students.filter(s => s.status === 'Active').length,
        expiredStudents: students.filter(s => s.status === 'Expired').length,
        todayCheckIns: 42,
        totalRevenue: 67000,
        studyHoursToday: 186,
        weeklyRevenue: 15400,
        revenueGrowth: 12.5
      })
      setStats(data)
      setLoading(false)
    }
    loadStats()
  }, [])

  const getSuggestionIcon = (icon) => {
    switch (icon) {
      case 'alert': return AlertTriangle
      case 'dollar': return DollarSign
      case 'seat': return Armchair
      case 'expired': return UserX
      case 'trend': return TrendingUp
      default: return AlertTriangle
    }
  }

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'warning': return 'text-amber-400 bg-amber-900/20 border-amber-700'
      case 'info': return 'text-primary-400 bg-primary-900/20 border-primary-700'
      case 'success': return 'text-emerald-400 bg-emerald-900/20 border-emerald-700'
      default: return 'text-gray-400 bg-dark-700 border-dark-500'
    }
  }

  if (loading || !stats) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-dark-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-dark-700 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>
        <Button icon={Calendar} variant="outline" className="w-full sm:w-auto">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle="All registered students"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents}
          subtitle={`${Math.round((stats.activeStudents / stats.totalStudents) * 100)}% of total`}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Expired Students"
          value={stats.expiredStudents}
          subtitle="Needs renewal"
          icon={UserX}
          color="red"
        />
        <StatCard
          title="Today's Check-ins"
          value={stats.todayCheckIns}
          subtitle="So far today"
          icon={Clock}
          trend="8%"
          trendUp={true}
          color="amber"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          subtitle="This month"
          icon={IndianRupee}
          trend="12.5%"
          trendUp={true}
          color="purple"
        />
        <StatCard
          title="Study Hours Today"
          value={stats.studyHoursToday}
          subtitle="Total hours logged"
          icon={BookOpen}
          trend="5%"
          trendUp={true}
          color="blue"
        />
      </div>

      {/* Smart Suggestions */}
      <Card className="border-l-4 border-l-primary-500">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary-400" />
            Smart Suggestions
          </h2>
          <Badge variant="info">5 Insights</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {smartSuggestions.map((suggestion) => {
            const Icon = getSuggestionIcon(suggestion.icon)
            return (
              <div
                key={suggestion.id}
                className={`p-4 rounded-lg border ${getSuggestionColor(suggestion.type)}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm text-gray-200">{suggestion.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsChart
          data={dailyAttendance}
          title="Daily Attendance Overview"
        />
        <BarChartComponent
          data={revenueData}
          dataKey="amount"
          xAxisKey="month"
          title="Monthly Revenue (₹)"
          color="#10b981"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button icon={Users}>Add New Student</Button>
          <Button variant="outline" icon={IndianRupee}>Record Payment</Button>
          <Button variant="outline" icon={Armchair}>View Seat Map</Button>
          <Button variant="outline" icon={AlertTriangle}>View Drop Risk</Button>
        </div>
      </Card>
    </div>
  )
}
