import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between">
          <div className="text-xs font-medium text-[#64748B]">
            Sistema Empresarial Cloud &bull; AWS Architecture
          </div>
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
            <span className="text-xs font-semibold text-[#1E293B]">Administrador Cloud</span>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}