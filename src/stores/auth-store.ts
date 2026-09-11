import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, AuthUser, UserProfile } from "@/types/auth";

interface AuthStore extends AuthState {
  setSession: (user: AuthUser | null, profile: UserProfile | null) => void;
  setUser: (user: AuthUser | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isLoading: true,
      isAuthenticated: false,

      setSession: (user, profile) =>
        set({
          user,
          profile,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: !!user,
        })),

      setProfile: (profile) =>
        set({
          profile,
        }),

      setLoading: (isLoading) =>
        set({
          isLoading,
        }),

      clearSession: () =>
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: "sci-auth-storage",
      // Only persist necessary fields
      partialize: (state) => ({ 
        user: state.user, 
        profile: state.profile,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
