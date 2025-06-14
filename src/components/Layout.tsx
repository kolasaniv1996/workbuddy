import React from 'react';
import Navigation from './Navigation';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
};

export default Layout;