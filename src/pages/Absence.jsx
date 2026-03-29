import { useState } from 'react'
import { Calendar, UserX, Clock, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { DataTable } from '../components/ui/Table'
import { students } from '../data/mockData'
import { formatDate, getDaysDifference } from '../utils/index.js'

export default function Absence() {
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate absence data
  const studentsWithAbsence = students.map(student => {
    const lastSeen = new Date(student.lastSeen)
    const today = new Date()
    const daysAbsent = getDaysDifference(lastSeen, today)

    return {
      ...student,
      daysAbsent,
      absenceStatus: daysAbsent > 7 ? 'critical' : daysAbsent > 3 ? 'warning' : 'normal'
    }
  }).sort((a, b) => b.daysAbsent - a.daysAbsent)

  const filteredStudents = studentsWithAbsence.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.includes(searchQuery)
  )

  const criticalAbsence = studentsWithAbsence.filter(s => s.absenceStatus === 'critical')
  const warningAbsence = studentsWithAbsence.filter(s => s.absenceStatus === 'warning')

  const columns = [
    {
      key: 'student',
      title: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-400">
              {row.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-white">{row.name}</p>
            <p className="text-xs text-gray-400">{row.phone}</p>
          </div>
        </div>
      )
    },
    { key: 'seat', title: 'Seat', accessor: 'seatNumber' },
    {
      key: 'lastSeen',
      title: 'Last Seen',
      accessor: 'lastSeen',
      render: (row) => formatDate(row.lastSeen)
    },
    {
      key: 'daysAbsent',
      title: 'Days Absent',
      accessor: 'daysAbsent',
      render: (row) => (
        <Badge variant={
          row.absenceStatus === 'critical' ? 'danger' :
          row.absenceStatus === 'warning' ? 'warning' : 'success'
        }>
          {row.daysAbsent} days
        </Badge>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.absenceStatus === 'critical' ? (
            <>
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-400">Critical</span>
            </>
          ) : row.absenceStatus === 'warning' ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-amber-400">Warning</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-emerald-400">Normal</span>
            </>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <Button
          size="sm"
          variant={row.absenceStatus === 'critical' ? 'danger' : 'outline'}
          onClick={() => {}}
        >
          {row.absenceStatus === 'critical' ? 'Call Now' : 'Mark Present'}
        </Button>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leave & Absence Tracking</h1>
          <p className="text-gray-400">Monitor student attendance patterns</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-red-500">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-900/30 rounded-lg">
              <UserX className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{criticalAbsence.length}</p>
              <p className="text-sm text-gray-400">Critical (7+ days)</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-900/30 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{warningAbsence.length}</p>
              <p className="text-sm text-gray-400">Warning (4-7 days)</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-900/30 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {students.length - criticalAbsence.length - warningAbsence.length}
              </p>
              <p className="text-sm text-gray-400">Regular (0-3 days)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Alert for Critical Absences */}
      {criticalAbsence.length > 0 && (
        <Card className="border-red-700/50 bg-red-900/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-400">Critical Absence Alert</h3>
              <p className="text-sm text-red-400">
                {criticalAbsence.length} students have not been seen for over 7 days. Consider reaching out to prevent dropouts.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-500 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        searchable={false}
        pagination={true}
        pageSize={10}
      />
    </div>
  )
}
