import { useState } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { cn } from '../../utils/index.js'

export function DataTable({
  columns,
  data,
  searchable = false,
  pagination = false,
  pageSize = 10,
  onRowClick,
  emptyMessage = 'No data available'
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState(null)

  // Filter data
  const filteredData = searchable && searchTerm
    ? data.filter(row =>
        columns.some(col => {
          const value = col.accessor ? row[col.accessor] : null
          return value && String(value).toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    : data

  // Sort data
  const sortedData = sortConfig
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    : filteredData

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  return (
    <div className="bg-dark-800 rounded-xl shadow-sm border border-dark-600 overflow-hidden">
      {/* Search */}
      {searchable && (
        <div className="p-4 border-b border-dark-600">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-500 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-700 border-b border-dark-600">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key || column.accessor}
                  onClick={() => column.sortable && handleSort(column.accessor)}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-dark-600 select-none'
                  )}
                >
                  <div className="flex items-center gap-1">
                    {column.title}
                    {column.sortable && sortConfig?.key === column.accessor && (
                      <span className="text-primary-400">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-600">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'hover:bg-dark-700 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((column) => (
                    <td key={column.key || column.accessor} className="px-4 py-3 text-gray-200">
                      {column.render
                        ? column.render(row)
                        : column.accessor
                        ? row[column.accessor]
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {paginatedData.length > 0 ? (
          <div className="space-y-3 p-4">
            {paginatedData.map((row, index) => (
              <div
                key={row.id || index}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'bg-dark-700 rounded-lg border border-dark-600 p-4 transition-all',
                  onRowClick && 'cursor-pointer active:scale-99'
                )}
              >
                {columns.map((column, colIndex) => (
                  <div key={column.key || column.accessor} className={cn(
                    'flex items-start gap-2',
                    colIndex !== columns.length - 1 && 'mb-3'
                  )}>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider w-20 flex-shrink-0 pt-0.5">
                      {column.title}
                    </span>
                    <div className="flex-1 text-gray-200 text-sm min-w-0 overflow-hidden">
                      <div className="break-words">
                        {column.render
                          ? column.render(row)
                          : column.accessor
                          ? row[column.accessor]
                          : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            {emptyMessage}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-dark-600">
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-dark-700 text-gray-400'
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
