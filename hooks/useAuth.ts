import {
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
  getCurrentUser,
  getSession,
  onAuthStateChange,
} from "@/lib/auth";
import { IAuthResult } from "@/types/auth.types";
import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export type UseAuthReturn = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  signIn: (email: string, password: string) => Promise<IAuthResult>;
  signUp: (email: string, password: string) => Promise<IAuthResult>;
  signOut: () => Promise<{ error: Error | null }>;
  refresh: () => Promise<void>;
};

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const currentSession = await getSession();
        const currentUser = currentSession?.user ?? null;

        if (mounted) {
          setSession(currentSession);
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = onAuthStateChange(async (newSession) => {
      if (mounted) {
        setSession(newSession);

        if (newSession) {
          try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            console.error("Error getting current user:", error);
            setUser(newSession.user);
          }
        } else {
          setUser(null);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (
    email: string,
    password: string
  ): Promise<IAuthResult> => {
    setIsLoading(true);
    try {
      const result = await authSignIn(email, password);

      if (result.user && result.session) {
        setUser(result.user);
        setSession(result.session);
      }

      return result;
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        user: null,
        session: null,
        error: error as any,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<IAuthResult> => {
    setIsLoading(true);
    try {
      const result = await authSignUp(email, password);

      if (result.user && result.session) {
        setUser(result.user);
        setSession(result.session);
      }

      return result;
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        user: null,
        session: null,
        error: error as any,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<{ error: Error | null }> => {
    setIsLoading(true);
    try {
      const result = await authSignOut();

      setUser(null);
      setSession(null);

      return { error: result.error ? new Error(result.error.message) : null };
    } catch (error) {
      console.error("Sign out error:", error);
      return { error: error as Error };
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = async (): Promise<void> => {
    try {
      const currentSession = await getSession();
      const currentUser = currentSession?.user ?? (await getCurrentUser());

      setSession(currentSession);
      setUser(currentUser);
    } catch (error) {
      console.error("Error refreshing auth:", error);
    }
  };

  return {
    user,
    session,
    isAuthenticated: !!user && !!session,
    isLoading,

    signIn,
    signUp,
    signOut,
    refresh,
  };
}
