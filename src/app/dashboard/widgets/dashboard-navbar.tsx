'use client';

import { useRouter } from 'next/navigation';

import useUserStore, { UseUserStoreInterface } from '../../../store/user-store';
import useUsersListStore, { UseUsersListStoreInterface } from '../../../store/users-list-store';

const DashboardNavbar = ({ dashboardLocale }: {
  dashboardLocale: Record<string, string>;
}) => {
  const router = useRouter();
  const user = useUserStore((state: UseUserStoreInterface) => state.user);
  const removeUser = useUserStore((state: UseUserStoreInterface) => state.removeUser);
  const removeUsers = useUsersListStore((state: UseUsersListStoreInterface) => state.removeUsers);
  
  return (
    <div className="w-full flex justify-between items-center h-20 p-2 bg-white">
      <p className="text-xl uppercase">{user.userName}</p>
      <button
        type="button"
        onClick={() => {
          removeUser();
          removeUsers();
          router.replace('/login');
        }}
        className="bg-blue-200 flex items-center justify-center hover:drop-shadow-md rounded-lg text-sm w-fit py-3 px-6 h-12"
      >
        {dashboardLocale['button.logout']}
      </button>
    </div>
  );
}

export default DashboardNavbar;