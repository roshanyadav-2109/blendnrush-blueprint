import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { LogOut, Home, ShoppingBag, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '@/assets/blendnrush.png'

export function DashboardHeader() {
  const { user, isAdmin, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="BlendNRush Logo" className="h-8 w-auto" />
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                {isAdmin ? (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    All Orders
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    My Orders
                  </>
                )}
              </Link>
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            {isAdmin && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                Admin
              </span>
            )}
          </div>
          
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}