import { useState } from 'react'
import { Trophy, Medal, Award, Flame, Star, TrendingUp, Users, Crown } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { leaderboard, students } from '../data/mockData'

export default function Gamification() {
  const [activeTab, setActiveTab] = useState('leaderboard')

  const badges = [
    { id: 1, name: '5-Day Streak', icon: Flame, color: 'text-orange-400', bgColor: 'bg-orange-900/30', requirement: 'Study 5 days in a row', earned: 12 },
    { id: 2, name: '10-Day Streak', icon: Flame, color: 'text-red-400', bgColor: 'bg-red-900/30', requirement: 'Study 10 days in a row', earned: 8 },
    { id: 3, name: 'Early Bird', icon: Star, color: 'text-yellow-400', bgColor: 'bg-yellow-900/30', requirement: 'Check in before 7 AM', earned: 15 },
    { id: 4, name: 'Night Owl', icon: Star, color: 'text-purple-400', bgColor: 'bg-purple-900/30', requirement: 'Study past 10 PM', earned: 6 },
    { id: 5, name: '100 Hours Club', icon: Trophy, color: 'text-emerald-400', bgColor: 'bg-emerald-900/30', requirement: 'Complete 100 study hours', earned: 18 },
    { id: 6, name: '200 Hours Club', icon: Trophy, color: 'text-blue-400', bgColor: 'bg-blue-900/30', requirement: 'Complete 200 study hours', earned: 5 },
    { id: 7, name: 'Top Performer', icon: Crown, color: 'text-amber-400', bgColor: 'bg-amber-900/30', requirement: 'Rank #1 on leaderboard', earned: 1 },
    { id: 8, name: 'Consistent', icon: TrendingUp, color: 'text-indigo-400', bgColor: 'bg-indigo-900/30', requirement: 'Study 6+ hours daily for a week', earned: 7 }
  ]

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-400" />
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-400">{rank}</span>
  }

  const getRankStyle = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-600'
    if (rank === 2) return 'bg-gradient-to-r from-gray-900/30 to-slate-900/30 border-dark-500'
    if (rank === 3) return 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-600'
    return 'bg-dark-800 border-dark-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Gamification</h1>
        <p className="text-gray-400">Leaderboards, badges, and student achievements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-900/30 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{leaderboard.length}</p>
              <p className="text-xs text-gray-400">Top Students</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-900/30 rounded-lg">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {students.filter(s => s.streak >= 5).length}
              </p>
              <p className="text-xs text-gray-400">Active Streaks (5+ days)</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-900/30 rounded-lg">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {students.filter(s => s.totalStudyHours >= 100).length}
              </p>
              <p className="text-xs text-gray-400">100+ Hours Club</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{students.length}</p>
              <p className="text-xs text-gray-400">Total Participants</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-600">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'leaderboard'
              ? 'text-primary-400 border-b-2 border-primary-600'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'badges'
              ? 'text-primary-400 border-b-2 border-primary-600'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Badges
        </button>
      </div>

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-r from-primary-900/20 to-blue-900/20 border-primary-700/50">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-primary-400" />
              <div>
                <h2 className="text-lg font-semibold text-white">Top Performers Leaderboard</h2>
                <p className="text-sm text-gray-400">Ranked by total study hours this month</p>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {leaderboard.map((student, index) => (
              <Card
                key={student.id}
                className={`p-4 transition-all hover:shadow-md ${getRankStyle(index + 1)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(index + 1)}
                  </div>
                  <div className="w-12 h-12 bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary-400">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{student.name}</p>
                      {index < 3 && (
                        <Badge variant={index === 0 ? 'warning' : index === 1 ? 'secondary' : 'danger'}>
                          {index === 0 ? 'Gold' : index === 1 ? 'Silver' : 'Bronze'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{student.seatNumber} • {student.shift}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{student.totalStudyHours}h</p>
                    <p className="text-sm text-gray-400">Total Hours</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xl font-bold text-orange-500">{student.streak}</p>
                    <p className="text-sm text-gray-400">Day Streak</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border-amber-700/50">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-400" />
              <div>
                <h2 className="text-lg font-semibold text-white">Achievement Badges</h2>
                <p className="text-sm text-gray-400">Earn badges by reaching study milestones</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <Card key={badge.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className={`p-4 ${badge.bgColor} rounded-xl mb-3`}>
                    <Icon className={`w-8 h-8 ${badge.color}`} />
                  </div>
                  <h3 className="font-semibold text-white">{badge.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{badge.requirement}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Earned by</span>
                    <Badge variant="info">{badge.earned} students</Badge>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
