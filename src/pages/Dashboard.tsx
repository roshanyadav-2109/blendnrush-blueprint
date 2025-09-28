import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { AdminDashboard } from '@/components/admin-dashboard'
import { CustomerDashboard } from '@/components/customer-dashboard'

export default function Dashboard() {
  const { user, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return isAdmin ? <AdminDashboard /> : <CustomerDashboard />
}