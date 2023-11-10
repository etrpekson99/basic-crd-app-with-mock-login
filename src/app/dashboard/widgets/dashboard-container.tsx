'use client';

import useUsersListStore, { UseUsersListStoreInterface } from '../../../store/users-list-store';

import DashboardTable from './dashboard-table';
import DashboardForm from './dashboard-form';

const DashboardContainer = ({ dashboardLocale }: {
  dashboardLocale: Record<string, string>;
}) => {  
  const users = useUsersListStore((state: UseUsersListStoreInterface) => state.users);

  return (
    <section className="flex flex-col items-center sm:flex-row sm:items-start w-full gap-5">
      <div className="flex flex-start w-9/12 sm:w-1/3">
        <DashboardForm dashboardLocale={dashboardLocale} users={users} />
      </div>
      <div className="flex-1">
        <DashboardTable dashboardLocale={dashboardLocale} users={users} />
      </div>
    </section>
  );
}

export default DashboardContainer;
