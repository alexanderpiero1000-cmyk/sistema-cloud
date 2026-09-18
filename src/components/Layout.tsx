import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar para pantallas grandes (Escritorio) */}
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Sidebar Móvil con Drawer / Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Fondo oscuro traslúcido */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Menú deslizable */}
          <div className="relative z-10 h-full">
            <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Botón Hamburguesa para Móviles */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 focus:outline-none"
              aria-label="Abrir menú"
            >
              ☰
            </button>
            
            <div className="text-xs font-medium text-[#64748B] hidden sm:block">
              Sistema Empresarial Cloud &bull; AWS Architecture
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
            <span className="text-xs font-semibold text-[#1E293B]">Administrador Cloud</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
