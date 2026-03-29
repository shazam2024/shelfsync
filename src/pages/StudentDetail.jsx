import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, BookOpen, Award, TrendingUp, Flame, AlertCircle } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { LineChart } from '../components/ui/Charts'
import { DataTable } from '../components/ui/Table'
import { students, attendanceHistory } from '../data/mockData'
import { formatDate, formatDuration } from '../utils/index.js'

export default function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const studentId = parseInt(id)

  const student = students.find(s => s.id === studentId)

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Student not found</p>
        <Button onClick={() => navigate('/students')} className="mt-4">
          Back to Students
        </Button>
      </div>
    )
  }

  const studentAttendance = attendanceHistory.filter(a => a.studentId === studentId)

  const studyHoursData = [
    { day: 'Mon', hours: 5.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 4.8 },
    { day: 'Thu', hours: 7.1 },
    { day: 'Fri', hours: 5.9 },
    { day: 'Sat', hours: 8.2 },
    { day: 'Sun', hours: 3.5 }
  ]

  const columns = [
    {
      key: 'date',
      title: 'Date',
      accessor: 'date',
      render: (row) => formatDate(row.date)
    },
    { key: 'checkIn', title: 'Check In', accessor: 'checkIn' },
    { key: 'checkOut', title: 'Check Out', accessor: 'checkOut' },
    {
      key: 'duration',
      title: 'Duration',
      accessor: 'duration',
      render: (row) => formatDuration(row.duration)
    }
  ]

  const getTagColor = (tag) => {
    switch (tag) {
      case 'Serious': return 'bg-purple-100 text-purple-800'
      case 'Average': return 'bg-blue-100 text-blue-800'
      case 'Irregular': return 'bg-dark-700 text-gray-800'
      default: return 'bg-dark-700 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/students')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Students
      </button>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-bold text-primary-400">
              {student.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{student.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(student.tag)}`}>
                {student.tag}
              </span>
              <Badge variant={student.status === 'Active' ? 'success' : student.status === 'Expired' ? 'danger' : 'warning'}>
                {student.status}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Seat {student.seatNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{student.shift} Shift</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm">Edit Profile</Button>
            <Button variant="outline" size="sm">Send Message</Button>
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-2xl font-bold text-white">{student.totalStudyHours}</p>
          <p className="text-xs text-gray-400">Total Hours</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-white">{student.streak}</p>
          <p className="text-xs text-gray-400">Day Streak</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">{formatDate(student.expiryDate)}</p>
          <p className="text-xs text-gray-400">Expires On</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{student.plan}</p>
          <p className="text-xs text-gray-400">Current Plan</p>
        </Card>
      </div>

      {/* Study Hours Chart */}
      <LineChart
        data={studyHoursData}
        dataKey="hours"
        xAxisKey="day"
        title="Weekly Study Hours"
        color="#3b82f6"
      />

      {/* Attendance History */}
      <Card>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-400" />
          Attendance History
        </h2>
        <DataTable
          columns={columns}
          data={studentAttendance.length > 0 ? studentAttendance : attendanceHistory.slice(0, 5)}
          searchable={false}
          pagination={true}
          pageSize={5}
        />
      </Card>

      {/* Study Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Study Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div>
                <p className="text-sm text-gray-400">Average Daily Hours</p>
                <p className="text-lg font-semibold text-white">5.8 hours</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Most Active Day</p>
                <p className="text-lg font-semibold text-white">Saturday</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Consistency Score</p>
                <p className="text-lg font-semibold text-emerald-400">92%</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Risk Alert */}
      {student.status === 'Expired' && (
        <Card className="border-red-200 bg-red-900/30">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <h3 className="font-semibold text-red-800">Membership Expired</h3>
              <p className="text-sm text-red-400">This student's membership has expired. Consider reaching out for renewal.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
