import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase';
import { User } from './types';
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
  email: string,
  password: string)
  => Promise<{
    error: string | null;
  }>;
  signup: (
  name: string,
  email: string,
  password: string)
  => Promise<{
    error: string | null;
  }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
export function AuthProvider({ children }: {children: ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedEmail = localStorage.getItem('neoncrypto_user_email');
        if (storedEmail) {
          await fetchUser(storedEmail);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error('Error loading user:', e);
        setLoading(false);
      }
    };
    loadUser();
  }, []);
  useEffect(() => {
    if (!user) return;
    const subscription = supabase.
    channel('public:users').
    on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'users',
        filter: `email=eq.${user.email}`
      },
      (payload) => {
        console.log('Realtime update received:', payload);
        setUser(payload.new as User);
      }
    ).
    subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user?.email]);
  const fetchUser = async (email: string) => {
    try {
      const { data, error } = await supabase.
      from('users').
      select('*').
      eq('email', email).
      single();
      if (error) throw error;
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('neoncrypto_user_email');
    } finally {
      setLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const hashedPassword = await hashPassword(password);
      const { data, error } = await supabase.
      from('users').
      select('*').
      eq('email', email).
      single();
      if (error || !data) {
        return {
          error: 'Invalid email or password'
        };
      }
      if (data.password_hash !== hashedPassword) {
        if (!data.password_hash) {
          return {
            error: 'Please create an account first to set your password.'
          };
        }
        return {
          error: 'Invalid email or password'
        };
      }
      setUser(data);
      localStorage.setItem('neoncrypto_user_email', email);
      return {
        error: null
      };
    } catch (err) {
      return {
        error: 'An unexpected error occurred'
      };
    } finally {
      setLoading(false);
    }
  };
  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const hashedPassword = await hashPassword(password);
      const { data: existingUser } = await supabase.
      from('users').
      select('*').
      eq('email', email).
      single();
      let result;
      if (existingUser) {
        result = await supabase.
        from('users').
        update({
          name,
          password_hash: hashedPassword
        }).
        eq('email', email).
        select().
        single();
      } else {
        result = await supabase.
        from('users').
        insert({
          name,
          email,
          password_hash: hashedPassword,
          total_assets: 0,
          bonus_earned: 0,
          active_wallets: 0,
          pending_claims: 0
        }).
        select().
        single();
      }
      if (result.error) {
        return {
          error: result.error.message
        };
      }
      setUser(result.data);
      localStorage.setItem('neoncrypto_user_email', email);
      return {
        error: null
      };
    } catch (err) {
      return {
        error: 'An unexpected error occurred'
      };
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('neoncrypto_user_email');
  };
  const refreshUser = async () => {
    if (user?.email) {
      await fetchUser(user.email);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        refreshUser
      }}>

      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}