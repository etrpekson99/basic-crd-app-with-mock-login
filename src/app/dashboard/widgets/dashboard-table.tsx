import { Fragment } from 'react';

import TableCellText from '../../../components/table-cell-text';
import TableCellButton from '../../../components/table-cell-button';
import Table from '../../../components/table';

import { UserType } from '../../../services/login-service';

import useUsersListStore, { UseUsersListStoreInterface } from '../../../store/users-list-store';

interface DashboardTableProps {
  dashboardLocale: Record<string, string>;
  users: UserType[];
}
const DashboardTable = (props: DashboardTableProps) => {
  const { dashboardLocale, users } = props;

  const removeUser = useUsersListStore((state: UseUsersListStoreInterface) => state.removeUser);

  const deleteUser = (user: UserType) => {
    removeUser(user);
  };

  const headers = (
    <>
      <TableCellText isHeader text="#" className="w-1/5" />
      <TableCellText isHeader text={dashboardLocale['table.header.branch-id']} className="w-4/12" />
      <TableCellText isHeader text={dashboardLocale['table.header.username']} className="w-4/12" />
      <TableCellText isHeader text={dashboardLocale['table.header.name']} className="w-5/12" />
      <TableCellText isHeader text={dashboardLocale['table.header.position']} className="w-4/12" />
      <TableCellText isHeader text={dashboardLocale['table.header.action']} className="w-4/12" />
    </>
  );

  const userRows = users.map((user: UserType, index) => {
    const name = `${user.firstName} ${user.middleName} ${user.lastName}`;
    const rows = (
      <Fragment key={user.userName}>
        <TableCellText text={index.toString()} className="w-1/5 " />
        <TableCellText text={user.branchId?.toString()} className="w-4/12 truncate" />
        <TableCellText text={user.userName} className="w-4/12 truncate" />
        <TableCellText text={name} className="w-5/12 truncate" />
        <TableCellText text={user.position} className="w-4/12 truncate" />
        <TableCellButton
          text={dashboardLocale['button.remove']}
          className="w-4/12 truncate"
          textColor="text-red-500"
          onClick={() => {
            deleteUser(user);
          }}
        />
      </Fragment>
    );
    return rows;
  });

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>{dashboardLocale['state.empty']}</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Table headers={headers} rows={userRows} />
    </div>
  );
}

export default DashboardTable;