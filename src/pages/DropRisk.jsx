import { useState } from 'react'
import { AlertTriangle, Phone, Mail, TrendingDown, UserX, Clock, IndianRupee, AlertCircle } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { DataTable } from '../components/ui/Table'
import { dropRiskStudents } from '../data/mockData'
import { formatDate } from '../utils/index.js'

export default function DropRisk() {
  const [students, setStudents] = useState(dropRiskStudents)

  const handleContact = (student) => {
    alert(`Calling ${student.name} at ${student.phone}...`)
  }

  const handleSendOffer = (student) => {
    alert(`Sending renewal offer to ${student.name}...`)
  }

  const potentialRevenueLoss = students.reduce((acc, s) => acc + 2000, 0)

  const columns = [
    {
      key: 'student',
      title: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-red-400">
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
    {
      key: 'riskLevel',
      title: 'Risk Level',
      accessor: 'riskLevel',
      render: (row) => (
        <Badge variant={row.riskLevel === 'Critical' ? 'danger' : row.riskLevel === 'High' ? 'warning' : 'info'}>
          {row.riskLevel}
        </Badge>
      )
    },
    {
      key: 'riskReason',
      title: 'Risk Reason',
      accessor: 'riskReason',
      render: (row) => (
        <p className="text-sm text-gray-400 max-w-xs truncate">{row.riskReason}</p>
      )
    },
    {
      key: 'lastSeen',
      title: 'Last Seen',
      accessor: 'lastSeen',
      render: (row) => formatDate(row.lastSeen)
    },
    {
      key: 'totalHours',
      title: 'Study Hours',
      accessor: 'totalStudyHours',
      render: (row) => `${row.totalStudyHours}h`
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={Phone}
            onClick={() => handleContact(row)}
          >
            Call
          </Button>
          <Button
            size="sm"
            variant={row.riskLevel === 'Critical' ? 'danger' : 'outline'}
            onClick={() => handleSendOffer(row)}
          >
            Offer
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Drop Risk Detection</h1>
        <p className="text-gray-400">Identify and retain students at risk of leaving</p>
      </div>

      {/* Alert Banner */}
      <Card className="border-red-700/50 bg-red-900/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-900/30 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-red-400">Retention Alert</h2>
            <p className="text-red-400 mt-1">
              {students.length} students are at risk of leaving the library. Immediate action required to prevent revenue loss.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <div>
                <p className="text-sm text-red-400">Potential Revenue Loss</p>
                <p className="text-2xl font-bold text-red-400">₹{potentialRevenueLoss.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-red-400">Critical Risk</p>
                <p className="text-2xl font-bold text-red-400">
                  {students.filter(s => s.riskLevel === 'Critical').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-red-400">High Risk</p>
                <p className="text-2xl font-bold text-red-400">
                  {students.filter(s => s.riskLevel === 'High').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Risk Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-red-600">
          <div className="flex items-center gap-3 mb-3">
            <UserX className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-white">Inactive Students</h3>
          </div>
          <p className="text-sm text-gray-400">
            Students who haven't visited in 7+ days
          </p>
          <p className="text-2xl font-bold text-red-400 mt-2">
            {students.filter(s => s.riskReason.includes('No login')).length}
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-white">Low Engagement</h3>
          </div>
          <p className="text-sm text-gray-400">
            Students with very low study hours
          </p>
          <p className="text-2xl font-bold text-amber-400 mt-2">
            {students.filter(s => s.riskReason.includes('low study hours')).length}
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-3">
            <IndianRupee className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Expired Membership</h3>
          </div>
          <p className="text-sm text-gray-400">
            Students with expired or overdue fees
          </p>
          <p className="text-2xl font-bold text-blue-400 mt-2">
            {students.filter(s => s.riskReason.includes('expired')).length}
          </p>
        </Card>
      </div>

      {/* Recovery Strategies */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-primary-400" />
          <h2 className="text-lg font-semibold text-white">Recommended Recovery Strategies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-dark-700 rounded-lg">
            <h3 className="font-medium text-white mb-2">Personal Call</h3>
            <p className="text-sm text-gray-400">Direct phone call to understand concerns and offer assistance</p>
          </div>
          <div className="p-4 bg-dark-700 rounded-lg">
            <h3 className="font-medium text-white mb-2">Special Discount</h3>
            <p className="text-sm text-gray-400">Offer 20% discount on next renewal for returning students</p>
          </div>
          <div className="p-4 bg-dark-700 rounded-lg">
            <h3 className="font-medium text-white mb-2">Extended Access</h3>
            <p className="text-sm text-gray-400">Provide 3-day free trial to re-engage inactive students</p>
          </div>
          <div className="p-4 bg-dark-700 rounded-lg">
            <h3 className="font-medium text-white mb-2">Study Buddy Program</h3>
            <p className="text-sm text-gray-400">Pair with serious students to boost motivation</p>
          </div>
        </div>
      </Card>

      {/* At-Risk Students Table */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">At-Risk Students</h2>
        <DataTable
          columns={columns}
          data={students}
          searchable={true}
          pagination={true}
          pageSize={8}
        />
      </div>
    </div>
  )
}
