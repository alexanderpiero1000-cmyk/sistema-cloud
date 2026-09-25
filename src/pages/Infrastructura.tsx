import React, { useState } from 'react';

interface RegionData {
  id: string;
  code: string;
  name: string;
  awsCode: string;
  location: string;
  azCount: number;
  status: 'Operativo' | 'Mantenimiento';
  services: string[];
}

const REGIONS: RegionData[] = [
  {
    id: 'us-east-1',
    code: 'US',
    name: 'EE. UU. Este (Norte de Virginia)',
    awsCode: 'us-east-1',
    location: 'Norteamérica / Estados Unidos',
    azCount: 6,
    status: 'Operativo',
    services: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront', 'VPC', 'DynamoDB'],
  },
  {
    id: 'us-west-2',
    code: 'US',
    name: 'EE. UU. Oeste (Oregón)',
    awsCode: 'us-west-2',
    location: 'Norteamérica / Estados Unidos',
    azCount: 4,
    status: 'Operativo',
    services: ['EC2', 'S3', 'RDS', 'Lambda', 'EKS'],
  },
  {
    id: 'sa-east-1',
    code: 'BR',
    name: 'Sudamérica (São Paulo)',
    awsCode: 'sa-east-1',
    location: 'Sudamérica / Brasil',
    azCount: 3,
    status: 'Operativo',
    services: ['EC2', 'S3', 'RDS', 'VPC'],
  },
  {
    id: 'eu-west-1',
    code: 'IE',
    name: 'Europa (Irlanda)',
    awsCode: 'eu-west-1',
    location: 'Europa / Irlanda',
    azCount: 3,
    status: 'Operativo',
    services: ['EC2', 'S3', 'RDS', 'Lambda', 'ECS'],
  },
  {
    id: 'ap-northeast-1',
    code: 'JP',
    name: 'Asia Pacífico (Tokio)',
    awsCode: 'ap-northeast-1',
    location: 'Asia / Japón',
    azCount: 4,
    status: 'Mantenimiento',
    services: ['EC2', 'S3', 'DynamoDB'],
  },
];

export default function GlobalInfrastructure() {
  const [filter, setFilter] = useState<'Todas' | 'Operativas' | 'Mantenimiento'>('Todas');

  // Cálculos dinámicos
  const totalRegions = REGIONS.length;
  const totalAZs = REGIONS.reduce((acc, curr) => acc + curr.azCount, 0);
  const optimalRegions = REGIONS.filter((r) => r.status === 'Operativo').length;

  // Filtrado de lista
  const filteredRegions = REGIONS.filter((region) => {
    if (filter === 'Operativas') return region.status === 'Operativo';
    if (filter === 'Mantenimiento') return region.status === 'Mantenimiento';
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-2 sm:p-6">
      {/* Encabezado */}
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Módulo 4
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Infraestructura Global</h1>
        <p className="text-sm text-slate-500 mt-1">
          Visualización y monitoreo de regiones, ubicación y servicios desplegados en la red global.
        </p>
      </div>

      {/* Tarjetas resumen métrico */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            REGIONES DESPLEGADAS
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalRegions} Regiones</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            ZONAS DE DISPONIBILIDAD
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalAZs} AZ en total</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            ESTADO GLOBAL
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {optimalRegions}/{totalRegions} Óptimas
          </p>
        </div>
      </div>

      {/* Control de Filtros */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-base font-bold text-slate-800">Regiones de Infraestructura</h2>
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {(['Todas', 'Operativas', 'Mantenimiento'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Rejilla de tarjetas de Región */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRegions.map((region) => (
          <div
            key={region.id}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Título de la Región y código AWS */}
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-slate-700 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                  {region.code}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{region.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{region.awsCode}</p>
                </div>
              </div>

              {/* Información detallada */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Ubicación:</span>
                  <span className="font-semibold text-slate-700">{region.location}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Zonas de Disponibilidad:</span>
                  <span className="font-semibold text-slate-700">{region.azCount} AZ</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Estado del Sistema:</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 ${
                      region.status === 'Operativo'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        region.status === 'Operativo' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    {region.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges de Servicios Desplegados */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                SERVICIOS DESPLEGADOS ({region.services.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {region.services.map((service) => (
                  <span
                    key={service}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200/60 rounded-lg text-xs font-medium text-slate-600 shadow-2xs"
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