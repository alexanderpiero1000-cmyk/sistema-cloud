import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard General', icon: '📊' },
  { path: '/planificacion', label: 'Planificación Cloud', icon: '📝' },
  { path: '/costos', label: 'Costos y Economía', icon: '💰' },
  { path: '/infraestructura', label: 'Infraestructura Global', icon: '🌐' },
  { path: '/seguridad', label: 'Seguridad', icon: '🛡️' },
  { path: '/red', label: 'Arquitectura de Red', icon: '🔀' },
  { path: '/servicios', label: 'Servicios AWS', icon: '☁️' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0F172A] min-h-screen text-white flex flex-col justify-between p-4 flex-shrink-0">
      <div>
        {/* Encabezado Logo */}
        <div className="flex items-center space-x-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-lg font-bold">
            ⚡
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide text-white">CLOUD PLATFORM</h1>
            <p className="text-[11px] text-[#64748B]">Enterprise Console</p>
          </div>
        </div>

        {/* Links de Navegación */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-[#64748B] hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer del Sidebar */}
      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
          <span className="text-[11px] text-[#64748B] font-medium">Estado: Operativo</span>
        </div>
      </div>
    </aside>
  );
}