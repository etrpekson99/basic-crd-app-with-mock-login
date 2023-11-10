import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';

import { UserType } from '../services/login-service'

export interface UseUserStoreInterface {
  user: UserType;
  setUser: (user: UserType) => void;
  removeUser: () => void;
}

const useUserStore = create<UseUserStoreInterface>()(
  devtools(
    persist(
      (set) => ({
        user: {},
        setUser: (user: UserType) => set(() => ({ user })),
        removeUser: () => set({ user: {} }),
      }),
      {
        name: 'user-store'
      }
    )
  )
);

export default useUserStore;