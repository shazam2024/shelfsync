import { cn } from '../../utils/index.js'

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className,
  required,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-dark-700 text-gray-200 placeholder-gray-500',
          error
            ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
            : 'border-dark-500 hover:border-dark-400'
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}

export function Select({
  label,
  value,
  onChange,
  options,
  error,
  className,
  required,
  placeholder = 'Select...'
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={cn(
          'w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-dark-700 text-gray-200',
          error
            ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
            : 'border-dark-500 hover:border-dark-400'
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  className,
  required
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none bg-dark-700 text-gray-200 placeholder-gray-500',
          error
            ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
            : 'border-dark-500 hover:border-dark-400'
        )}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}
