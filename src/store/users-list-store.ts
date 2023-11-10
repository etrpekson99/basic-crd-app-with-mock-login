import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { UserType } from '../services/login-service'

export interface UseUsersListStoreInterface {
  users: UserType[];
  setUsers: (users: UserType[]) => void;
  setNewUser: (user: UserType) => void;
  removeUser: (user: UserType) => void;
  removeUsers: () => void;
}

const useUsersListStore = create<UseUsersListStoreInterface>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        setUsers: (users: UserType[]) => set(() => ({ users })),
        removeUsers: () => set({ users: [] }),
        setNewUser: (userToBeAdded: UserType) => set((state) => {
          const newUsersList = [...state.users, userToBeAdded];
          return {
            users: newUsersList
          }
        }),
        removeUser: (userToBeRemoved: UserType) => set((state) => {
          const newUsersList = state.users.filter((user: UserType) => user.userName !== userToBeRemoved.userName);
          return {
            users: newUsersList
          }
        }),
      }), {
      name: 'users-list-store'
    }
    )
  )
);

export default useUsersListStore;

