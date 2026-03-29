import { useState } from 'react'
import { MessageSquare, Star, ThumbsUp, AlertCircle, Filter, Send, User } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { DataTable } from '../components/ui/Table'
import { Modal, ModalFooter } from '../components/ui/Modal'
import { Textarea, Select } from '../components/ui/Form'
import { feedbacks, students } from '../data/mockData'
import { formatDate } from '../utils/index.js'

export default function Feedback() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [feedbackList, setFeedbackList] = useState(feedbacks)
  const [filterRating, setFilterRating] = useState('')

  const filteredFeedback = filterRating
    ? feedbackList.filter(f => f.rating === parseInt(filterRating))
    : feedbackList

  const averageRating = (feedbackList.reduce((acc, f) => acc + f.rating, 0) / feedbackList.length).toFixed(1)

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-emerald-100 text-emerald-800'
    if (rating === 3) return 'bg-amber-100 text-amber-800'
    return 'bg-red-100 text-red-800'
  }

  const columns = [
    {
      key: 'student',
      title: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-400">
              {row.studentName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="font-medium text-white">{row.studentName}</span>
        </div>
      )
    },
    {
      key: 'rating',
      title: 'Rating',
      accessor: 'rating',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="flex">{getRatingStars(row.rating)}</div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRatingColor(row.rating)}`}>
            {row.rating}/5
          </span>
        </div>
      )
    },
    {
      key: 'type',
      title: 'Type',
      accessor: 'type',
      render: (row) => (
        <Badge variant={
          row.type === 'General' ? 'info' :
          row.type === 'Facility' ? 'warning' : 'purple'
        }>
          {row.type}
        </Badge>
      )
    },
    {
      key: 'comment',
      title: 'Comment',
      accessor: 'comment',
      render: (row) => (
        <p className="text-sm text-gray-400 max-w-xs truncate">{row.comment}</p>
      )
    },
    {
      key: 'date',
      title: 'Date',
      accessor: 'date',
      render: (row) => formatDate(row.date)
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <Button size="sm" variant="outline" icon={ThumbsUp}>
          Reply
        </Button>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Feedback System</h1>
          <p className="text-gray-400">Student feedback and reviews</p>
        </div>
        <Button icon={MessageSquare} onClick={() => setIsSubmitModalOpen(true)}>
          Submit Feedback
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{averageRating}</p>
              <p className="text-xs text-gray-400">Average Rating</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{feedbackList.length}</p>
              <p className="text-xs text-gray-400">Total Reviews</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <ThumbsUp className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {feedbackList.filter(f => f.rating >= 4).length}
              </p>
              <p className="text-xs text-gray-400">Positive (4-5★)</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {feedbackList.filter(f => f.rating <= 2).length}
              </p>
              <p className="text-xs text-gray-400">Needs Attention</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card>
        <h2 className="text-lg font-semibold text-white mb-4">Rating Distribution</h2>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = feedbackList.filter(f => f.rating === rating).length
            const percentage = (count / feedbackList.length) * 100
            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      rating >= 4 ? 'bg-emerald-900/300' :
                      rating === 3 ? 'bg-amber-900/300' : 'bg-red-900/300'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-12 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Recent Feedback */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Feedback</h2>
          <Select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            options={[
              { value: '', label: 'All Ratings' },
              { value: '5', label: '5 Stars' },
              { value: '4', label: '4 Stars' },
              { value: '3', label: '3 Stars' },
              { value: '2', label: '2 Stars' },
              { value: '1', label: '1 Star' }
            ]}
            className="w-40"
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredFeedback}
          searchable={true}
          pagination={true}
          pageSize={5}
        />
      </div>

      {/* Submit Feedback Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Feedback"
        size="md"
      >
        <form className="space-y-4">
          <Select
            label="Select Student"
            options={students.slice(0, 10).map(s => ({ value: s.id, label: s.name }))}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <Star className="w-6 h-6 text-gray-300 hover:text-yellow-400" />
                </button>
              ))}
            </div>
          </div>
          <Select
            label="Feedback Type"
            options={[
              { value: 'general', label: 'General' },
              { value: 'facility', label: 'Facility' },
              { value: 'technical', label: 'Technical' }
            ]}
            required
          />
          <Textarea
            label="Your Feedback"
            placeholder="Share your experience..."
            required
          />
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setIsSubmitModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" icon={Send}>
              Submit Feedback
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}
