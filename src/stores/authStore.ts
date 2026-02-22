import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  user: User | null;
  session: Session | null;

  initialize: () => () => void;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  updateEmail: (newEmail: string) => Promise<{ error: string | null }>;
  deleteAccount: () => Promise<{ error: string | null }>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'loading',
  user: null,
  session: null,

  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        status: session ? 'authenticated' : 'unauthenticated',
        user: session?.user ?? null,
        session,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({
        status: session ? 'authenticated' : 'unauthenticated',
        user: session?.user ?? null,
        session,
      });
    });

    return () => subscription.unsubscribe();
  },

  signUp: async (email, password, displayName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });
    return { error: error?.message ?? null };
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });
    return { error: error?.message ?? null };
  },

  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error: error?.message ?? null };
  },

  updateEmail: async (newEmail) => {
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    return { error: error?.message ?? null };
  },

  deleteAccount: async () => {
    const session = get().session;
    if (!session) return { error: 'Not authenticated' };

    const response = await fetch('/api/delete-account', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.access_token}` },
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.error || 'Failed to delete account' };
    }

    await supabase.auth.signOut();
    return { error: null };
  },
}));
