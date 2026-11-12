import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TabBar from './mobile/TabBar';
import QuickMenu from './mobile/QuickMenu';

export default function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
      <QuickMenu />
      <TabBar />
    </div>
  );
}
