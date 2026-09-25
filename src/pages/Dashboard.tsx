import { useState } from 'react';
import StatCard from '../components/StatCard';
import RegionCard from '../components/RegionCard';
import StatusBadge from '../components/StatusBadge';

// Datos de resumen
const cloudResources = [
  { type: 'Instancias EC2 (Cómputo)', count: '6 Instancias', status: 'Healthy' },
  { type: 'Bases de Datos RDS', count: '1 Instancia Multi-AZ', status: 'Healthy' },
  { type: 'Buckets S3 (Almacenamiento)', count: '4 Buckets (2.4 TB)', status: 'Healthy' },
  { type: 'Balanceadores ALB', count: '2 Load Balancers', status: 'Healthy' },
  { type: 'Distribuciones CloudFront', count: '1 CDN Active', status: 'Healthy' },
];

const securitySummary = [
  { check: 'MFA en Usuario Root y Roles IAM', status: 'Healthy', desc: 'Configurado con políticas de acceso mínimo' },
  { check: 'Cifrado de Datos en Reposo (KMS)', status: 'Healthy', desc: 'S3 y RDS cifrados con claves KMS' },
  { check: 'Sistemas Operativos EC2', status: 'Evaluación', desc: '2 parches de seguridad pendientes' },
];

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState('us-east-1');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div>
        <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
          Módulo 1
        </span>
        <h1 className="text-3xl font-bold text-[#1E293B] mt-1">Dashboard General Cloud</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Resumen ejecutivo del estado global de la solución AWS en la nube.
        </p>
      </div>

      {/* Tarjetas de Indicadores Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Servicios Utilizados"
          value="7 Servicios"
          subtitle="EC2, RDS, S3, IAM, VPC, R53, CDN"
          icon="☁️"
        />
        <StatCard
          title="Región Principal"
          value="EE.UU. Este"
          subtitle="us-east-1 (N. Virginia)"
          icon="🌐"
        />
        <StatCard
          title="Costo Mensual Estimado"
          value="$1,240.50 / mes"
          subtitle="Dentro del presupuesto"
          icon="💰"
          trend="-3%"
        />
        <StatCard
          title="Costo Anual Estimado"
          value="$14,886.00 / año"
          subtitle="Con Reserva de Instancias"
          icon="📈"
        />
      </div>

      {/* Indicadores Secundarios: Estado de Arquitectura y Seguridad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Estado de la Arquitectura
            </span>
            <div className="text-xl font-bold text-[#1E293B] mt-1">100% Operativa</div>
            <span className="text-xs text-[#64748B]">
              Flujo de tráfico y balanceo sin interrupciones
            </span>
          </div>
          <StatusBadge status="Healthy" />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Estado de Seguridad
            </span>
            <div className="text-xl font-bold text-[#1E293B] mt-1">Nivel Alto (92/100)</div>
            <span className="text-xs text-[#64748B]">Cumplimiento CIS AWS Benchmark</span>
          </div>
          <StatusBadge status="Healthy" />
        </div>
      </div>

      {/* Gráfico y Regiones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico Visual de Costos */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#1E293B]">Distribución de Costos por Servicio</h2>
              <p className="text-xs text-[#64748B]">Proyección mensual basada en el consumo de recursos</p>
            </div>
            <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
              Total: $1,240.50
            </span>
          </div>

          {/* Gráfico de Barras Relativo */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#1E293B]">Amazon EC2 (Instancias y Auto Scaling)</span>
                <span className="text-[#64748B]">$520.00 (42%)</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#1E293B]">Amazon RDS (PostgreSQL Multi-AZ)</span>
                <span className="text-[#64748B]">$380.50 (30%)</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#1E293B]">Amazon S3 (Almacenamiento y Backup)</span>
                <span className="text-[#64748B]">$180.00 (15%)</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden">
                <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#1E293B] text-xs font-semibold mb-1">
                <span>CloudFront & Route 53 (Redes/CDN)</span>
                <span className="text-[#64748B]">$160.00 (13%)</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden">
                <div className="bg-[#16A34A] h-full rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Región Seleccionada */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1E293B] mb-2">Región Seleccionada</h2>
            <p className="text-xs text-[#64748B] mb-4">
              Ubicación geográfica activa de los servicios en la nube.
            </p>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2.5 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#1E293B] bg-slate-50 focus:outline-none focus:border-[#2563EB] mb-4"
            >
              <option value="us-east-1">us-east-1 (N. Virginia)</option>
              <option value="us-west-2">us-west-2 (Oregón)</option>
              <option value="sa-east-1">sa-east-1 (São Paulo)</option>
            </select>

            <RegionCard
              regionName={
                selectedRegion === 'us-east-1'
                  ? 'EE.UU. Este (N. Virginia)'
                  : selectedRegion === 'us-west-2'
                  ? 'EE.UU. Oeste (Oregón)'
                  : 'Sudamérica (São Paulo)'
              }
              code={selectedRegion}
              latency={selectedRegion === 'us-east-1' ? '24 ms' : selectedRegion === 'us-west-2' ? '65 ms' : '42 ms'}
              status={selectedRegion === 'sa-east-1' ? 'Degraded' : 'Healthy'}
              activeServices={selectedRegion === 'us-east-1' ? 7 : 3}
            />
          </div>
        </div>
      </div>

      {/* Recursos Cloud y Resumen de Seguridad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventario de Recursos Cloud */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-4">Recursos Cloud Desplegados</h2>
          <div className="space-y-3">
            {cloudResources.map((resource) => (
              <div
                key={resource.type}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]"
              >
                <div>
                  <span className="text-xs font-bold text-[#1E293B] block">{resource.type}</span>
                  <span className="text-xs text-[#64748B]">{resource.count}</span>
                </div>
                <StatusBadge status={resource.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del Estado de Seguridad */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-4">Resumen del Estado de Seguridad</h2>
          <div className="space-y-3">
            {securitySummary.map((sec) => (
              <div key={sec.check} className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#1E293B]">{sec.check}</span>
                  <StatusBadge status={sec.status} />
                </div>
                <p className="text-xs text-[#64748B]">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}