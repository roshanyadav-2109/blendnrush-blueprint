import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('blendnrush_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('blendnrush_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('auth', {
        body: { action: 'login', email, password }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setUser(data.user);
      localStorage.setItem('blendnrush_user', JSON.stringify(data.user));
      
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('auth', {
        body: { action: 'signup', email, password }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setUser(data.user);
      localStorage.setItem('blendnrush_user', JSON.stringify(data.user));
      
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('blendnrush_user');
    toast({
      title: "Success",
      description: "Signed out successfully",
    });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}