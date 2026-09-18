import { useState } from 'react';
import StatCard from '../components/StatCard';

interface GlobalRegion {
  id: string;
  code: string;
  name: string;
  location: string;
  flag: string;
  status: 'Operational' | 'Maintenance' | 'Degraded';
  availabilityZones: number;
  deployedServices: string[];
}

const initialRegions: GlobalRegion[] = [
  {
    id: 'us-east-1',
    code: 'us-east-1',
    name: 'EE. UU. Este (N. Virginia)',
    location: 'Norteamérica / Estados Unidos',
    flag: '🇺🇸',
    status: 'Operational',
    availabilityZones: 6,
    deployedServices: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront', 'VPC', 'DynamoDB'],
  },
  {
    id: 'us-west-2',
    code: 'us-west-2',
    name: 'EE. UU. Oeste (Oregón)',
    location: 'Norteamérica / Estados Unidos',
    flag: '🇺🇸',
    status: 'Operational',
    availabilityZones: 4,
    deployedServices: ['EC2', 'S3', 'RDS', 'Lambda', 'EKS'],
  },
  {
    id: 'sa-east-1',
    code: 'sa-east-1',
    name: 'Sudamérica (São Paulo)',
    location: 'Sudamérica / Brasil',
    flag: '🇧🇷',
    status: 'Operational',
    availabilityZones: 3,
    deployedServices: ['EC2', 'S3', 'RDS', 'VPC'],
  },
  {
    id: 'eu-west-1',
    code: 'eu-west-1',
    name: 'Europa (Irlanda)',
    location: 'Europa / Irlanda',
    flag: '🇮🇪',
    status: 'Operational',
    availabilityZones: 3,
    deployedServices: ['EC2', 'S3', 'RDS', 'Lambda', 'ECS'],
  },
  {
    id: 'ap-northeast-1',
    code: 'ap-northeast-1',
    name: 'Asia Pacífico (Tokio)',
    location: 'Asia / Japón',
    flag: '🇯🇵',
    status: 'Maintenance',
    availabilityZones: 4,
    deployedServices: ['EC2', 'S3', 'DynamoDB'],
  },
];

export default function Infrastructura() {
  const [filter, setFilter] = useState<string>('All');

  const filteredRegions = initialRegions.filter((region) => {
    if (filter === 'All') return true;
    return region.status === filter;
  });

  const getStatusBadge = (status: GlobalRegion['status']) => {
    switch (status) {
      case 'Operational':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            Operativo
          </span>
        );
      case 'Maintenance':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            Mantenimiento
          </span>
        );
      case 'Degraded':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
            Degradado
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Módulo 4
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Infraestructura Global</h1>
        <p className="text-sm text-slate-500 mt-1">
          Visualización y monitoreo de regiones, ubicación y servicios desplegados en la red global.
        </p>
      </div>

      {/* Indicadores Generales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="REGIONES DESPLEGADAS" value={`${initialRegions.length} Regiones`} />
        <StatCard
          title="ZONAS DE DISPONIBILIDAD"
          value={`${initialRegions.reduce((acc, r) => acc + r.availabilityZones, 0)} AZs Total`}
        />
        <StatCard
          title="ESTADO GLOBAL"
          value={`${initialRegions.filter((r) => r.status === 'Operational').length}/${initialRegions.length} Sanas`}
        />
      </div>

      {/* Filtros de Estado */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700">Regiones de Infraestructura</h2>
        <div className="flex gap-2">
          {['All', 'Operational', 'Maintenance'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st === 'All' ? 'Todas' : st === 'Operational' ? 'Operativas' : 'Mantenimiento'}
            </button>
          ))}
        </div>
      </div>

      {/* Tarjetas de Regiones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRegions.map((region) => (
          <div
            key={region.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Encabezado Tarjeta */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{region.flag}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{region.name}</h3>
                    <span className="text-xs font-mono text-slate-400">{region.code}</span>
                  </div>
                </div>
              </div>

              {/* Detalle de Ubicación y Estado */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Ubicación:</span>
                  <span className="font-semibold text-slate-700">{region.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Zonas de Disponibilidad:</span>
                  <span className="font-semibold text-slate-700">{region.availabilityZones} AZs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Estado del Sistema:</span>
                  {getStatusBadge(region.status)}
                </div>
              </div>
            </div>

            {/* Servicios Desplegados */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                Servicios Desplegados ({region.deployedServices.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {region.deployedServices.map((service) => (
                  <span
                    key={service}
                    className="bg-slate-50 text-slate-700 border border-slate-200/80 px-2.5 py-1 rounded-lg text-xs font-semibold"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}