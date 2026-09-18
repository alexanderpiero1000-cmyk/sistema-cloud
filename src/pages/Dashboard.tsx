// src/pages/Dashboard.tsx

import StatCard from '../components/StatCard';
import RegionCard from '../components/RegionCard';
import CostCard from '../components/CostCard';
import SecurityCard from '../components/SecurityCard';
import { mockStats, mockRegions, mockCosts, mockSecurityChecks } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div>
        <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Módulo 1</span>
        <h1 className="text-3xl font-bold text-[#1E293B] mt-1">Panel de Control General</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Resumen ejecutivo del estado global de la arquitectura e infraestructura Cloud.
        </p>
      </div>

      {/* Métrica Globales con StatCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Gasto Mensual" value={mockStats.totalCost} subtitle="Presupuesto: $1,500" icon="💰" trend="-5%" />
        <StatCard title="Servicios Activos" value={mockStats.activeServices} subtitle="Operativos en 4 regiones" icon="☁️" />
        <StatCard title="Índice Seguridad" value={mockStats.securityScore} subtitle="Cumplimiento IAM" icon="🛡️" trend="+2%" />
        <StatCard title="Regiones AWS" value={mockStats.activeRegions} subtitle="1 con latencia media" icon="🌐" />
      </div>

      {/* Sección Infraestructura Global y Costos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regiones con RegionCard */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1E293B]">Estado de Regiones</h2>
          <div className="space-y-3">
            {mockRegions.map((region) => (
              <RegionCard key={region.code} {...region} />
            ))}
          </div>
        </div>

        {/* Distribución de Costos con CostCard */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1E293B]">Desglose de Costos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockCosts.map((cost) => (
              <CostCard key={cost.concept} {...cost} />
            ))}
          </div>
        </div>
      </div>

      {/* Seguridad con SecurityCard */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#1E293B]">Auditoría de Seguridad Relevante</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockSecurityChecks.map((check) => (
            <SecurityCard key={check.title} {...check} />
          ))}
        </div>
      </div>
    </div>
  );
}