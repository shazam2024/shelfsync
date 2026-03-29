import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Smartphone, Lock, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Form'

export default function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = (e) => {
    e.preventDefault()
    if (phone.length === 10) {
      setLoading(true)
      setTimeout(() => {
        setOtpSent(true)
        setLoading(false)
        setStep(2)
      }, 1500)
    }
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate('/')
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="ShelfSync" className="w-16 h-16 mx-auto mb-4 shadow-lg rounded-2xl" />
          <h1 className="text-2xl font-bold text-white">ShelfSync</h1>
          <p className="text-gray-400 mt-1">Management System</p>
        </div>

        {/* Card */}
        <div className="bg-dark-800 rounded-2xl shadow-xl border border-dark-600 overflow-hidden">
          {/* Progress Steps */}
          <div className="flex border-b border-dark-600">
            <div className={`flex-1 py-4 text-center text-sm font-medium ${step === 1 ? 'text-primary-400 border-b-2 border-primary-500' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center gap-2">
                <Smartphone className="w-4 h-4" />
                Phone
              </div>
            </div>
            <div className={`flex-1 py-4 text-center text-sm font-medium ${step === 2 ? 'text-primary-400 border-b-2 border-primary-500' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Verify
              </div>
            </div>
          </div>

          <div className="p-8">
            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-white">Enter Mobile Number</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    We'll send you a one-time password
                  </p>
                </div>

                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
                />

                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  disabled={phone.length !== 10}
                  icon={ArrowRight}
                >
                  Send OTP
                </Button>

                {otpSent && (
                  <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    OTP sent successfully!
                  </div>
                )}
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-white">Enter OTP</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Sent to +91 {phone}
                  </p>
                </div>

                <Input
                  label="One-Time Password"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                />

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    Change number
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="text-primary-400 hover:text-primary-300 font-medium"
                  >
                    Resend OTP
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  disabled={otp.length !== 6}
                >
                  Verify & Login
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
