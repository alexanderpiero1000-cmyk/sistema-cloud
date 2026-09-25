import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Estructura de regiones con coordenadas geográficas
const regionsData = [
  {
    id: 'us-east-1',
    code: 'US',
    name: 'EE. UU. Este (Norte de Virginia)',
    location: 'Norteamérica / Estados Unidos',
    lat: 38.0339,
    lng: -78.5079,
    az: '6 AZ',
    status: 'Operativo',
    services: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront', 'VPC', 'DynamoDB'],
  },
  {
    id: 'us-west-2',
    code: 'US',
    name: 'EE. UU. Oeste (Oregón)',
    location: 'Norteamérica / Estados Unidos',
    lat: 45.5152,
    lng: -122.6784,
    az: '4 AZ',
    status: 'Operativo',
    services: ['EC2', 'S3', 'RDS', 'Lambda', 'EKS'],
  },
  {
    id: 'sa-east-1',
    code: 'BR',
    name: 'Sudamérica (São Paulo)',
    location: 'Sudamérica / Brasil',
    lat: -23.5505,
    lng: -46.6333,
    az: '3 AZ',
    status: 'Operativo',
    services: ['EC2', 'S3', 'RDS', 'Lambda'],
  },
  {
    id: 'eu-west-1',
    code: 'IE',
    name: 'Europa (Irlanda)',
    location: 'Europa / Irlanda',
    lat: 53.3498,
    lng: -6.2603,
    az: '3 AZ',
    status: 'Operativo',
    services: ['EC2', 'S3', 'RDS', 'CloudFront', 'VPC'],
  },
  {
    id: 'ap-northeast-1',
    code: 'JP',
    name: 'Asia Pacífico (Tokio)',
    location: 'Asia / Japón',
    lat: 35.6762,
    lng: 139.6503,
    az: '4 AZ',
    status: 'Mantenimiento',
    services: ['EC2', 'S3', 'RDS'],
  },
];

export default function Infraestructura() {
  const [filter, setFilter] = useState<'Todas' | 'Operativas' | 'Mantenimiento'>('Todas');

  const filteredRegions = regionsData.filter((region) => {
    if (filter === 'Operativas') return region.status === 'Operativo';
    if (filter === 'Mantenimiento') return region.status === 'Mantenimiento';
    return true;
  });

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

      {/* Tarjetas Superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="REGIONES DESPLEGADAS" value="5 Regiones" />
        <StatCard title="ZONAS DE DISPONIBILIDAD" value="20 AZ en total" />
        <StatCard title="ESTADO GLOBAL" value="4/5 Óptimas" />
      </div>

      {/* Mapa Mundial de la Infraestructura */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Mapa Mundial de Regiones</h2>
          <p className="text-xs text-slate-400">
            Ubicación geográfica de los centros de datos y estado activo de los nodos globales.
          </p>
        </div>

        <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-slate-200 z-0">
          <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredRegions.map((region) => (
              <Marker key={region.id} position={[region.lat, region.lng]}>
                <Popup>
                  <div className="text-xs space-y-1">
                    <span className="font-bold block text-sm text-slate-800">{region.name}</span>
                    <p className="text-slate-500">{region.location}</p>
                    <p><strong>AZ:</strong> {region.az}</p>
                    <p>
                      <strong>Estado:</strong>{' '}
                      <span className={region.status === 'Operativo' ? 'text-green-600 font-bold' : 'text-amber-600 font-bold'}>
                        {region.status}
                      </span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Sección de Filtros y Lista de Regiones */}
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-slate-800">Regiones de Infraestructura</h2>
          <div className="bg-slate-100 p-1 rounded-xl flex space-x-1 text-xs font-semibold">
            {(['Todas', 'Operativas', 'Mantenimiento'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
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

        {/* Tarjetas de Regiones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRegions.map((region) => (
            <div key={region.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700 text-sm">
                    {region.code}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{region.name}</h3>
                    <p className="text-xs text-slate-400">{region.id}</p>
                  </div>
                </div>
              </div>

              <div className="text-xs space-y-2 text-slate-600 border-t border-slate-50 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ubicación:</span>
                  <span className="font-medium text-slate-700">{region.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Zonas de Disponibilidad:</span>
                  <span className="font-medium text-slate-700">{region.az}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Estado del Sistema:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    region.status === 'Operativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    • {region.status}
                  </span>
                </div>
              </div>

              {/* Servicios Desplegados */}
              <div className="border-t border-slate-50 pt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  SERVICIOS DESPLEGADOS ({region.services.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {region.services.map((srv) => (
                    <span key={srv} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}