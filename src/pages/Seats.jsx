import { useState } from 'react'
import { Armchair, Users, Clock, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'
import { Card, Badge } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { seats, shifts } from '../data/mockData'

export default function Seats() {
  const [activeShift, setActiveShift] = useState('morning')
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false)

  const shiftData = {
    morning: { seats: seats.morning, time: '6:00 AM - 12:00 PM', total: 30 },
    afternoon: { seats: seats.afternoon, time: '12:00 PM - 6:00 PM', total: 30 },
    evening: { seats: seats.evening, time: '6:00 PM - 12:00 AM', total: 30 }
  }

  const currentSeats = shiftData[activeShift].seats
  const occupiedCount = currentSeats.filter(s => s.status === 'occupied').length
  const emptyCount = currentSeats.filter(s => s.status === 'empty').length
  const expiredCount = currentSeats.filter(s => s.status === 'expired').length

  const getSeatColor = (status) => {
    switch (status) {
      case 'occupied': return 'bg-emerald-600 hover:bg-emerald-500'
      case 'empty': return 'bg-dark-600 hover:bg-dark-500'
      case 'expired': return 'bg-red-600 hover:bg-red-500'
      default: return 'bg-dark-600'
    }
  }

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat)
    setIsSeatModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Seat & Shift Management</h1>
        <p className="text-gray-400">View and manage library seating arrangements</p>
      </div>

      {/* Shift Tabs */}
      <div className="flex flex-wrap gap-2">
        {shifts.map(shift => (
          <button
            key={shift.id}
            onClick={() => setActiveShift(shift.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeShift === shift.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-dark-800 text-gray-300 border border-dark-600 hover:bg-dark-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{shift.name}</span>
            <Badge variant={activeShift === shift.id ? 'default' : 'secondary'} className="ml-2">
              {shift.occupiedSeats}/{shift.totalSeats}
            </Badge>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-900/30 rounded-lg">
              <Armchair className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{shiftData[activeShift].total}</p>
              <p className="text-xs text-gray-400">Total Seats</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{occupiedCount}</p>
              <p className="text-xs text-gray-400">Occupied</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-dark-700 rounded-lg">
              <XCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{emptyCount}</p>
              <p className="text-xs text-gray-400">Available</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{expiredCount}</p>
              <p className="text-xs text-gray-400">Expired</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Seat Map */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {shifts.find(s => s.id === activeShift)?.name} Shift
            </h2>
            <p className="text-sm text-gray-400">{shiftData[activeShift].time}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-dark-600 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Expired</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
          {currentSeats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                getSeatColor(seat.status)
              } ${seat.status === 'empty' ? 'text-gray-400' : 'text-white'}`}
              title={seat.student ? seat.student.name : 'Empty Seat'}
            >
              {seat.number.split('-')[1]}
            </button>
          ))}
        </div>
      </Card>

      {/* Seat Utilization Insight */}
      <Card className="bg-gradient-to-r from-primary-900/20 to-blue-900/20 border-primary-700/50">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-900/30 rounded-lg">
            <Info className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Seat Utilization Insight</h3>
            <p className="text-sm text-gray-400 mt-1">
              {activeShift === 'morning' && 'Morning shift is at 40% capacity. Good availability for new admissions.'}
              {activeShift === 'afternoon' && 'Afternoon shift is at 50% capacity. Balanced utilization.'}
              {activeShift === 'evening' && 'Evening shift is at 27% capacity. Consider evening promotions to boost occupancy.'}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <div className="text-sm">
                <span className="text-gray-400">Occupancy Rate:</span>
                <span className="font-semibold ml-1">
                  {Math.round((occupiedCount / shiftData[activeShift].total) * 100)}%
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Available:</span>
                <span className="font-semibold ml-1 text-emerald-400">{emptyCount} seats</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Seat Detail Modal */}
      {isSeatModalOpen && selectedSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSeatModalOpen(false)} />
          <div className="relative bg-dark-800 rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in border border-dark-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Seat {selectedSeat.number}</h2>
              <button
                onClick={() => setIsSeatModalOpen(false)}
                className="p-2 hover:bg-dark-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant={
                  selectedSeat.status === 'occupied' ? 'success' :
                  selectedSeat.status === 'expired' ? 'danger' : 'secondary'
                }>
                  {selectedSeat.status === 'occupied' ? 'Occupied' :
                   selectedSeat.status === 'expired' ? 'Expired' : 'Available'}
                </Badge>
                <span className="text-sm text-gray-400">
                  {shifts.find(s => s.id === activeShift)?.name} Shift
                </span>
              </div>

              {selectedSeat.student ? (
                <div className="p-4 bg-dark-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary-900/30 rounded-full flex items-center justify-center">
                      <span className="font-medium text-primary-400">
                        {selectedSeat.student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{selectedSeat.student.name}</p>
                      <p className="text-sm text-gray-400">{selectedSeat.student.phone}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Plan</p>
                      <p className="font-medium">{selectedSeat.student.plan}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Expires</p>
                      <p className="font-medium">{selectedSeat.student.expiryDate}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-dark-700 rounded-lg">
                  <Armchair className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">This seat is available</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsSeatModalOpen(false)}
                >
                  Close
                </Button>
                {selectedSeat.status === 'empty' ? (
                  <Button className="flex-1">
                    Assign Student
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
