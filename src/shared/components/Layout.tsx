import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { ModalProvider } from './ModalProvider';

const Layout: FC = () => (
  <div className="min-h-screen flex bg-white text-slate-900">
    <Sidebar />
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
      <TopHeader />
      <div className="flex-1 overflow-y-auto bg-slate-50/30">
        <Outlet />
      </div>
    </main>
    <ModalProvider />
  </div>
);

export default Layout;
