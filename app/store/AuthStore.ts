import { create } from "zustand"

type Usertype = {
  name?: string 
  uid: string
  username?: string
  email: string | null
}

type AuthStore = {
  user: Usertype | null
  setUser: (user: Usertype) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  setUser: (user) => set({user}),

  clearUser: () => set({ user: null })
}))