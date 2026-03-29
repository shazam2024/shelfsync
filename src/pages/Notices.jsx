import { useState } from 'react'
import { Bell, Plus, Pin, Calendar, Trash2, AlertCircle, Info, CheckCircle } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal, ModalFooter } from '../components/ui/Modal'
import { Input, Textarea, Select } from '../components/ui/Form'
import { notices } from '../data/mockData'
import { formatDate } from '../utils/index.js'

export default function Notices() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [noticeList, setNoticeList] = useState(notices)

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'medium': return <Info className="w-5 h-5 text-amber-400" />
      case 'low': return <CheckCircle className="w-5 h-5 text-emerald-400" />
      default: return <Info className="w-5 h-5 text-gray-400" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-950/50 border-red-500 text-red-300'
      case 'medium': return 'bg-amber-950/50 border-amber-500 text-amber-300'
      case 'low': return 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
      default: return 'bg-dark-800 border-dark-500 text-gray-300'
    }
  }

  const handleDeleteNotice = (id) => {
    setNoticeList(noticeList.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Notice Board</h1>
          <p className="text-gray-400">Manage announcements and notifications</p>
        </div>
        <Button icon={Plus} onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
          Add Notice
        </Button>
      </div>

      {/* Priority Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-red-500 bg-red-950/30">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {noticeList.filter(n => n.priority === 'high').length}
              </p>
              <p className="text-xs text-gray-400">High Priority</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-500 bg-amber-950/30">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {noticeList.filter(n => n.priority === 'medium').length}
              </p>
              <p className="text-xs text-gray-400">Medium Priority</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-emerald-500 bg-emerald-950/30">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {noticeList.filter(n => n.priority === 'low').length}
              </p>
              <p className="text-xs text-gray-400">Low Priority</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {noticeList.map((notice) => (
          <Card
            key={notice.id}
            className={`p-4 border-2 transition-all hover:shadow-md ${getPriorityColor(notice.priority)}`}
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-2 bg-dark-800 rounded-lg shadow-sm border border-dark-600 flex-shrink-0">
                {getPriorityIcon(notice.priority)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-100">{notice.title}</h3>
                  <div className="self-start">
                    <Badge variant={
                      notice.priority === 'high' ? 'danger' :
                      notice.priority === 'medium' ? 'warning' : 'success'
                    }>
                      {notice.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-400 mb-2 text-sm">{notice.content}</p>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Posted {formatDate(notice.date)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteNotice(notice.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Notice Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Notice"
        size="md"
      >
        <form className="space-y-4">
          <Input
            label="Title"
            placeholder="Enter notice title"
            required
          />
          <Textarea
            label="Content"
            placeholder="Enter notice content"
            required
          />
          <Select
            label="Priority"
            options={[
              { value: 'high', label: 'High Priority' },
              { value: 'medium', label: 'Medium Priority' },
              { value: 'low', label: 'Low Priority' }
            ]}
            required
          />
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" icon={Plus}>
              Post Notice
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}
