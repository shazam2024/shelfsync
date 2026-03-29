import { cn } from '../../utils/index.js'

export function Card({ children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-dark-800 rounded-xl shadow-sm border border-dark-600 p-6 transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-md hover:border-primary-700',
        className
      )}
    >
      {children}
    </div>
  )
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, trendUp, color = 'blue' }) {
  const colors = {
    blue: 'bg-primary-900/30 text-primary-400',
    green: 'bg-emerald-900/30 text-emerald-400',
    red: 'bg-red-900/30 text-red-400',
    amber: 'bg-amber-900/30 text-amber-400',
    purple: 'bg-purple-900/30 text-purple-400'
  }

  return (
    <Card className="animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-dark-700 text-gray-300 border-dark-500',
    success: 'bg-emerald-900/30 text-emerald-400 border-emerald-700',
    warning: 'bg-amber-900/30 text-amber-400 border-amber-700',
    danger: 'bg-red-900/30 text-red-400 border-red-700',
    info: 'bg-primary-900/30 text-primary-400 border-primary-700',
    purple: 'bg-purple-900/30 text-purple-400 border-purple-700'
  }

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
