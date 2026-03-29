import { useState } from 'react'
import { IndianRupee, AlertCircle, Calendar, CheckCircle, Clock, CreditCard, UserX } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { DataTable } from '../components/ui/Table'
import { Modal, ModalFooter } from '../components/ui/Modal'
import { Input, Select } from '../components/ui/Form'
import { students } from '../data/mockData'
import { formatDate, getDaysDifference } from '../utils/index.js'

export default function Fees() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [filterStatus, setFilterStatus] = useState('')

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysDifference(new Date(), new Date(expiryDate))
    if (days < 0) return { label: 'Expired', color: 'danger' }
    if (days <= 7) return { label: `Expires in ${days} days`, color: 'warning' }
    return { label: `${days} days left`, color: 'success' }
  }

  const filteredStudents = students.filter(student => {
    if (!filterStatus) return true
    const status = getExpiryStatus(student.expiryDate).color
    return filterStatus === status
  })

  const expiredCount = students.filter(s => getExpiryStatus(s.expiryDate).color === 'danger').length
  const expiringSoonCount = students.filter(s => getExpiryStatus(s.expiryDate).color === 'warning').length
  const recoveryList = students.filter(s => s.status === 'Expired' || s.feesStatus === 'Overdue')

  const columns = [
    {
      key: 'student',
      title: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
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
    { key: 'plan', title: 'Plan', accessor: 'plan' },
    {
      key: 'expiry',
      title: 'Expiry Date',
      accessor: 'expiryDate',
      sortable: true,
      render: (row) => formatDate(row.expiryDate)
    },
    {
      key: 'status',
      title: 'Status',
      render: (row) => {
        const status = getExpiryStatus(row.expiryDate)
        return <Badge variant={status.color}>{status.label}</Badge>
      }
    },
    {
      key: 'feesStatus',
      title: 'Fees Status',
      accessor: 'feesStatus',
      render: (row) => (
        <Badge variant={
          row.feesStatus === 'Paid' ? 'success' :
          row.feesStatus === 'Due Soon' ? 'warning' : 'danger'
        }>
          {row.feesStatus}
        </Badge>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <Button
          size="sm"
          variant="outline"
          icon={CreditCard}
          onClick={(e) => {
            e.stopPropagation()
            setSelectedStudent(row)
            setIsPaymentModalOpen(true)
          }}
        >
          Collect
        </Button>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Fees & Validity</h1>
        <p className="text-gray-400">Manage student memberships and payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Expired</p>
              <p className="text-2xl font-bold text-white">{expiredCount}</p>
            </div>
            <div className="p-3 bg-red-900/30 rounded-lg">
              <UserX className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <p className="text-xs text-red-400 mt-2">Immediate action required</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Expiring Soon</p>
              <p className="text-2xl font-bold text-white">{expiringSoonCount}</p>
            </div>
            <div className="p-3 bg-amber-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <p className="text-xs text-amber-400 mt-2">Within next 7 days</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-2xl font-bold text-white">
                {students.filter(s => s.status === 'Active').length}
              </p>
            </div>
            <div className="p-3 bg-emerald-900/30 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <p className="text-xs text-emerald-400 mt-2">Membership valid</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">This Month Revenue</p>
              <p className="text-2xl font-bold text-white">₹67,000</p>
            </div>
            <div className="p-3 bg-primary-900/30 rounded-lg">
              <IndianRupee className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <p className="text-xs text-emerald-400 mt-2">↑ 12% from last month</p>
        </Card>
      </div>

      {/* Recovery Priority List */}
      <Card className="border-2 border-red-500/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-white">Recovery Priority List</h2>
          </div>
          <Badge variant="danger">{recoveryList.length} Students</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recoveryList.slice(0, 6).map(student => (
            <div key={student.id} className="flex items-center gap-3 p-3 bg-red-900/30 rounded-lg">
              <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-red-400">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{student.name}</p>
                <p className="text-xs text-red-400">{student.feesStatus} • Expired {formatDate(student.expiryDate)}</p>
              </div>
              <Button size="sm" variant="outline" className="flex-shrink-0">
                Call
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* All Students */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">All Students</h2>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'danger', label: 'Expired' },
              { value: 'warning', label: 'Expiring Soon' },
              { value: 'success', label: 'Active' }
            ]}
            className="w-40"
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredStudents}
          searchable={true}
          pagination={true}
          pageSize={10}
        />
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Collect Payment"
        size="md"
      >
        {selectedStudent && (
          <form className="space-y-4">
            <div className="p-4 bg-dark-700 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary-900/30 rounded-full flex items-center justify-center">
                  <span className="font-medium text-primary-400">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{selectedStudent.name}</p>
                  <p className="text-sm text-gray-400">{selectedStudent.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Current Plan</p>
                  <p className="font-medium">{selectedStudent.plan}</p>
                </div>
                <div>
                  <p className="text-gray-400">Expires On</p>
                  <p className="font-medium">{formatDate(selectedStudent.expiryDate)}</p>
                </div>
              </div>
            </div>

            <Select
              label="Renewal Plan"
              options={[
                { value: 'monthly', label: 'Monthly - ₹2,000' },
                { value: 'weekly', label: 'Weekly - ₹600' },
                { value: 'quarterly', label: 'Quarterly - ₹5,500' }
              ]}
              required
            />

            <Input
              label="Amount Received"
              type="number"
              placeholder="Enter amount"
              required
            />

            <Select
              label="Payment Mode"
              options={[
                { value: 'cash', label: 'Cash' },
                { value: 'upi', label: 'UPI' },
                { value: 'card', label: 'Card' }
              ]}
              required
            />

            <ModalFooter>
              <Button type="button" variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" icon={CheckCircle}>
                Confirm Payment
              </Button>
            </ModalFooter>
          </form>
        )}
      </Modal>
    </div>
  )
}
