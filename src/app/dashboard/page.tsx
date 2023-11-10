import { getLocale } from '../../utils/get-locale';

import DashboardNavbar from './widgets/dashboard-navbar';
import DashboardContainer from './widgets/dashboard-container';

const DashboadPage = async () => {
  const locale = await getLocale();
  const dashboardLocale = locale.dashboard;

  return (
    <main className="flex flex-col w-full h-full  p-3">
      <DashboardNavbar dashboardLocale={dashboardLocale} />
      <DashboardContainer dashboardLocale={dashboardLocale} />
    </main>
  );
}

export default DashboadPage;