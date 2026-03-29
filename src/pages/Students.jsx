import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, UserCheck } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { DataTable } from '../components/ui/Table'
import { Modal, ModalFooter } from '../components/ui/Modal'
import { Input, Select } from '../components/ui/Form'
import { students } from '../data/mockData'
import { getStatusColor, formatDate } from '../utils/index.js'

export default function Students() {
  const navigate = useNavigate()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [filterShift, setFilterShift] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.phone.includes(searchQuery)
    const matchesShift = !filterShift || student.shift === filterShift
    const matchesStatus = !filterStatus || student.status === filterStatus
    return matchesSearch && matchesShift && matchesStatus
  })

  const columns = [
    {
      key: 'name',
      title: 'Student',
      accessor: 'name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-400">
              {row.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-200">{row.name}</p>
            <p className="text-xs text-gray-400">{row.phone}</p>
          </div>
        </div>
      )
    },
    { key: 'shift', title: 'Shift', accessor: 'shift', sortable: true },
    { key: 'seat', title: 'Seat', accessor: 'seatNumber', sortable: true },
    {
      key: 'status',
      title: 'Status',
      accessor: 'status',
      sortable: true,
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      )
    },
    {
      key: 'fees',
      title: 'Fees Status',
      accessor: 'feesStatus',
      sortable: true,
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(row.feesStatus)}`}>
          {row.feesStatus}
        </span>
      )
    },
    {
      key: 'expiry',
      title: 'Expires On',
      accessor: 'expiryDate',
      sortable: true,
      render: (row) => formatDate(row.expiryDate)
    },
    {
      key: 'tag',
      title: 'Tag',
      accessor: 'tag',
      sortable: true,
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.tag === 'Serious' ? 'bg-purple-900/30 text-purple-400' :
          row.tag === 'Average' ? 'bg-blue-900/30 text-blue-400' :
          'bg-dark-700 text-gray-400'
        }`}>
          {row.tag}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/students/${row.id}`)
            }}
            className="p-2 text-gray-400 hover:text-primary-400 hover:bg-primary-900/20 rounded-lg transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedStudent(row)
              setIsEditModalOpen(true)
            }}
            className="p-2 text-gray-400 hover:text-amber-400 hover:bg-amber-900/20 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Student Management</h1>
          <p className="text-gray-400">Manage your library students</p>
        </div>
        <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-500 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <Select
              value={filterShift}
              onChange={(e) => setFilterShift(e.target.value)}
              options={[
                { value: '', label: 'All Shifts' },
                { value: 'Morning', label: 'Morning' },
                { value: 'Afternoon', label: 'Afternoon' },
                { value: 'Evening', label: 'Evening' }
              ]}
              className="w-40"
            />
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: '', label: 'All Status' },
                { value: 'Active', label: 'Active' },
                { value: 'Expired', label: 'Expired' },
                { value: 'Inactive', label: 'Inactive' }
              ]}
              className="w-40"
            />
          </div>
        </div>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 bg-primary-900/30 rounded-lg">
            <UserCheck className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{students.filter(s => s.status === 'Active').length}</p>
            <p className="text-xs text-gray-400">Active</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 bg-red-900/30 rounded-lg">
            <Trash2 className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{students.filter(s => s.status === 'Expired').length}</p>
            <p className="text-xs text-gray-400">Expired</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 bg-purple-900/30 rounded-lg">
            <UserCheck className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{students.filter(s => s.tag === 'Serious').length}</p>
            <p className="text-xs text-gray-400">Serious</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 bg-amber-900/30 rounded-lg">
            <UserCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{students.filter(s => s.feesStatus === 'Due Soon').length}</p>
            <p className="text-xs text-gray-400">Fees Due</p>
          </div>
        </Card>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        searchable={false}
        pagination={true}
        pageSize={10}
        onRowClick={(row) => navigate(`/students/${row.id}`)}
      />

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student"
        size="md"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" required />
            <Input label="Phone Number" type="tel" required />
          </div>
          <Input label="Email" type="email" />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Shift"
              options={[
                { value: 'morning', label: 'Morning (6AM-12PM)' },
                { value: 'afternoon', label: 'Afternoon (12PM-6PM)' },
                { value: 'evening', label: 'Evening (6PM-12AM)' }
              ]}
              required
            />
            <Select
              label="Plan"
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'weekly', label: 'Weekly' }
              ]}
              required
            />
          </div>
          <Input label="Seat Number" placeholder="e.g., A-01" />
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student"
        size="md"
      >
        {selectedStudent && (
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={selectedStudent.name} required />
              <Input label="Phone Number" type="tel" defaultValue={selectedStudent.phone} required />
            </div>
            <Input label="Email" type="email" defaultValue={selectedStudent.email} />
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Shift"
                defaultValue={selectedStudent.shift.toLowerCase()}
                options={[
                  { value: 'morning', label: 'Morning' },
                  { value: 'afternoon', label: 'Afternoon' },
                  { value: 'evening', label: 'Evening' }
                ]}
              />
              <Select
                label="Status"
                defaultValue={selectedStudent.status.toLowerCase()}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'expired', label: 'Expired' },
                  { value: 'inactive', label: 'Inactive' }
                ]}
              />
            </div>
            <ModalFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </ModalFooter>
          </form>
        )}
      </Modal>
    </div>
  )
}
