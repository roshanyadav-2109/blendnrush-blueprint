import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'

interface Order {
  id: number
  customer_name: string
  customer_contact: string
  customer_email: string
  address: string
  pincode: string
  quantity: number
  total_pricing: number
  order_date: string
  order_time: string
  order_status: string
  created_at: string
}

interface OrdersTableProps {
  orders: Order[]
  onStatusUpdate: (orderId: number, status: string) => void
  isAdmin: boolean
}

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'secondary'
    case 'Processing':
      return 'default'
    case 'Shipped':
      return 'outline'
    case 'Delivered':
      return 'default'
    case 'Cancelled':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export function OrdersTable({ orders, onStatusUpdate, isAdmin }: OrdersTableProps) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<keyof Order>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter orders based on search
  const filteredOrders = orders.filter(order =>
    order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    order.customer_email.toLowerCase().includes(search.toLowerCase()) ||
    order.customer_contact.includes(search) ||
    order.order_status.toLowerCase().includes(search.toLowerCase())
  )

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  // Paginate orders
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (column: keyof Order) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const formatDateTime = (dateStr: string, timeStr: string) => {
    try {
      const date = new Date(`${dateStr}T${timeStr}`)
      return format(date, 'MMM dd, yyyy HH:mm')
    } catch {
      return `${dateStr} ${timeStr}`
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('customer_name')}
              >
                Customer Name {sortBy === 'customer_name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('customer_contact')}
              >
                Contact {sortBy === 'customer_contact' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              {isAdmin && (
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('customer_email')}
                >
                  Email {sortBy === 'customer_email' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
              )}
              <TableHead>Address</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('quantity')}
              >
                Qty {sortBy === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('total_pricing')}
              >
                Total {sortBy === 'total_pricing' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('created_at')}
              >
                Date & Time {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.customer_name}</TableCell>
                <TableCell>{order.customer_contact}</TableCell>
                {isAdmin && <TableCell>{order.customer_email}</TableCell>}
                <TableCell>
                  <div className="max-w-[200px] truncate">
                    {order.address}, {order.pincode}
                  </div>
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>₹{Number(order.total_pricing).toLocaleString()}</TableCell>
                <TableCell>
                  {formatDateTime(order.order_date, order.order_time)}
                </TableCell>
                <TableCell>
                  {isAdmin ? (
                    <Select
                      value={order.order_status}
                      onValueChange={(value) => onStatusUpdate(order.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={getStatusVariant(order.order_status)}>
                      {order.order_status}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {paginatedOrders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {search ? 'No orders match your search.' : 'No orders found.'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedOrders.length)} of {sortedOrders.length} orders
          </p>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}