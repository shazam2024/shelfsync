import { useState, useEffect } from 'react'
import { Clock, Play, Square, Timer, History, Calendar, UserCheck, BookOpen } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { DataTable } from '../components/ui/Table'
import { students, attendanceHistory } from '../data/mockData'
import { formatDuration, formatTime, formatDate } from '../utils/index.js'

export default function Attendance() {
  const [activeSession, setActiveSession] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Simulate active session
  useEffect(() => {
    let interval
    if (activeSession) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeSession])

  const formatElapsedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleStartSession = () => {
    if (!selectedStudent) return
    setActiveSession({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      startTime: new Date(),
      seatNumber: selectedStudent.seatNumber
    })
    setElapsedTime(0)
  }

  const handleEndSession = () => {
    setActiveSession(null)
    setElapsedTime(0)
  }

  const todayStats = {
    totalStudents: 42,
    totalHours: 186,
    avgHours: 4.4,
    activeNow: 15
  }

  const columns = [
    {
      key: 'date',
      title: 'Date',
      accessor: 'date',
      sortable: true,
      render: (row) => formatDate(row.date)
    },
    {
      key: 'student',
      title: 'Student',
      render: (row) => {
        const student = students.find(s => s.id === row.studentId)
        return student ? student.name : 'Unknown'
      }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance & Study Clock</h1>
          <p className="text-gray-400">Track student attendance and study sessions</p>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-900/30 rounded-lg">
              <UserCheck className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{todayStats.totalStudents}</p>
              <p className="text-xs text-gray-400">Checked In Today</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{todayStats.totalHours}</p>
              <p className="text-xs text-gray-400">Total Hours Today</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-900/30 rounded-lg">
              <Timer className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{todayStats.avgHours}h</p>
              <p className="text-xs text-gray-400">Avg per Student</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <BookOpen className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{todayStats.activeNow}</p>
              <p className="text-xs text-gray-400">Currently Studying</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Clock */}
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-400" />
            Study Clock
          </h2>

          {activeSession ? (
            <div className="text-center py-6">
              <div className="text-5xl font-mono font-bold text-primary-400 mb-4">
                {formatElapsedTime(elapsedTime)}
              </div>
              <div className="mb-4">
                <p className="font-medium text-white">{activeSession.studentName}</p>
                <p className="text-sm text-gray-400">Seat {activeSession.seatNumber}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Started at {formatTime(activeSession.startTime)}
                </p>
              </div>
              <Button
                variant="danger"
                icon={Square}
                className="w-full"
                onClick={handleEndSession}
              >
                End Session
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Select Student
                </label>
                <select
                  value={selectedStudent?.id || ''}
                  onChange={(e) => {
                    const student = students.find(s => s.id === parseInt(e.target.value))
                    setSelectedStudent(student)
                  }}
                  className="w-full px-4 py-2 bg-dark-700 border border-dark-500 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Choose a student...</option>
                  {students.filter(s => s.status === 'Active').map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.seatNumber}
                    </option>
                  ))}
                </select>
              </div>

              {selectedStudent && (
                <div className="p-3 bg-dark-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-400">
                        {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">{selectedStudent.name}</p>
                      <p className="text-xs text-gray-400">{selectedStudent.seatNumber} • {selectedStudent.shift}</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                icon={Play}
                className="w-full"
                disabled={!selectedStudent}
                onClick={handleStartSession}
              >
                Start Session
              </Button>
            </div>
          )}
        </Card>

        {/* Quick Check-ins */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary-400" />
            Today's Check-ins
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
            {students.slice(0, 8).map(student => (
              <div key={student.id} className="flex items-center gap-3 p-3 bg-dark-700 rounded-lg">
                <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary-400">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{student.name}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">{student.seatNumber}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-emerald-400">08:30 AM</span>
                  </div>
                </div>
                <Badge variant="success">In</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Attendance History */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-primary-400" />
          Recent Attendance History
        </h2>
        <DataTable
          columns={columns}
          data={attendanceHistory}
          searchable={true}
          pagination={true}
          pageSize={5}
        />
      </div>
    </div>
  )
}
