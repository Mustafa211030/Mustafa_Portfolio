import { create } from 'zustand'

interface AppState {
  activeSection:    string
  setActiveSection: (id: string) => void
  contactStatus:    'idle' | 'loading' | 'success' | 'error'
  setContactStatus: (s: AppState['contactStatus']) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeSection:    'home',
  setActiveSection: (id) => set({ activeSection: id }),
  contactStatus:    'idle',
  setContactStatus: (contactStatus) => set({ contactStatus }),
}))
