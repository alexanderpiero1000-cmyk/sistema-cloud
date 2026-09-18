import { useState } from 'react';

interface ComponentDetail {
  id: string;
  name: string;
  type: string;
  status: 'Healthy' | 'Degraded';
  description: string;
  details: { label: string; value: string }[];
}

const architectureData: Record<string, ComponentDetail> = {
  internet: {
    id: 'internet',
    name: 'Internet / Clientes',
    type: 'Red Pública',
    status: 'Healthy',
    description: 'Tráfico entrante de usuarios globales a través de protocolos HTTP/HTTPS.',
    details: [
      { label: 'Protocolo', value: 'HTTPS (Port 443)' },
      { label: 'Origen', value: 'Global (0.0.0.0/0)' },
    ],
  },
  route53: {
    id: 'route53',
    name: 'Route 53 (DNS)',
    type: 'DNS & Domain Management',
    status: 'Healthy',
    description: 'Servicio de DNS para enrutamiento inteligente y Health Checks.',
    details: [
      { label: 'Zona Hospedada', value: 'mi-solucion.cloud' },
      { label: 'Estrategia', value: 'Latency-based Routing' },
    ],
  },
  cloudfront: {
    id: 'cloudfront',
    name: 'CloudFront (CDN)',
    type: 'Edge Content Delivery',
    status: 'Healthy',
    description: 'Red de distribución de contenido para almacenamiento en caché y protección DDoS.',
    details: [
      { label: 'Edge Locations', value: '225+ Puntos de Presencia' },
      { label: 'Caché Hit Ratio', value: '94.2%' },
    ],
  },
  alb: {
    id: 'alb',
    name: 'Application Load Balancer',
    type: 'VPC Gateway',
    status: 'Healthy',
    description: 'Balanceador de carga en subred pública dentro de la VPC.',
    details: [
      { label: 'Subredes', value: 'Public Subnet A / B' },
      { label: 'Algoritmo', value: 'Round Robin' },
    ],
  },
  ec2: {
    id: 'ec2',
    name: 'Instancias EC2 (App Core)',
    type: 'Compute Layer',
    status: 'Healthy',
    description: 'Servidores de aplicaciones ejecutándose en subred privada.',
    details: [
      { label: 'Subred', value: 'Private Subnet A' },
      { label: 'Auto Scaling Group', value: '2 - 6 Instancias' },
    ],
  },
  rds: {
    id: 'rds',
    name: 'Base de Datos RDS (PostgreSQL)',
    type: 'Data Layer',
    status: 'Healthy',
    description: 'Base de datos relacional Multi-AZ con réplica de lectura.',
    details: [
      { label: 'Subred', value: 'Private Isolated Subnet' },
      { label: 'Despliegue', value: 'Multi-AZ Primary' },
    ],
  },
};

export default function Network() {
  const [selectedNode, setSelectedNode] = useState<ComponentDetail>(architectureData.cloudfront);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Módulo 6
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Arquitectura de Red Cloud</h1>
        <p className="text-sm text-slate-500 mt-1">
          Representación interactiva del flujo de tráfico desde Internet hasta la capa de datos en VPC.
        </p>
      </div>

      {/* Flujo Visual Interactivo de la Arquitectura */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl overflow-x-auto text-white">
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4 min-w-[800px]">
          <div>
            <h2 className="text-base font-bold text-slate-100">Diagrama de Flujo de Datos</h2>
            <p className="text-xs text-slate-400">Haz clic en cualquier componente para examinar sus métricas.</p>
          </div>
          <span className="flex items-center text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping"></span>
            Flujo Activo
          </span>
        </div>

        {/* Nodos de la Red en Fila */}
        <div className="flex items-center justify-between min-w-[900px] py-6 px-4">
          
          {/* Internet */}
          <button
            onClick={() => setSelectedNode(architectureData.internet)}
            className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
              selectedNode.id === 'internet'
                ? 'bg-blue-600/30 border-blue-500 ring-2 ring-blue-500/50'
                : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
            }`}
          >
            <span className="text-3xl mb-2">🌐</span>
            <span className="text-xs font-bold">Internet</span>
            <span className="text-[10px] text-slate-400">Público</span>
          </button>

          {/* Flecha conectora */}
          <div className="flex-1 flex items-center justify-center px-2">
            <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 relative">
              <div className="w-2 h-2 rounded-full bg-blue-400 absolute -top-0.5 left-1/2 -translate-x-1/2 animate-pulse"></div>
            </div>
            <span className="text-slate-500 text-xs ml-1">➔</span>
          </div>

          {/* Route 53 */}
          <button
            onClick={() => setSelectedNode(architectureData.route53)}
            className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
              selectedNode.id === 'route53'
                ? 'bg-blue-600/30 border-blue-500 ring-2 ring-blue-500/50'
                : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
            }`}
          >
            <span className="text-3xl mb-2">📡</span>
            <span className="text-xs font-bold">Route 53</span>
            <span className="text-[10px] text-slate-400">DNS Domain</span>
          </button>

          {/* Flecha conectora */}
          <div className="flex-1 flex items-center justify-center px-2">
            <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 relative">
              <div className="w-2 h-2 rounded-full bg-indigo-400 absolute -top-0.5 left-1/2 -translate-x-1/2 animate-pulse"></div>
            </div>
            <span className="text-slate-500 text-xs ml-1">➔</span>
          </div>

          {/* CloudFront */}
          <button
            onClick={() => setSelectedNode(architectureData.cloudfront)}
            className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
              selectedNode.id === 'cloudfront'
                ? 'bg-blue-600/30 border-blue-500 ring-2 ring-blue-500/50'
                : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
            }`}
          >
            <span className="text-3xl mb-2">⚡</span>
            <span className="text-xs font-bold">CloudFront</span>
            <span className="text-[10px] text-slate-400">CDN Edge</span>
          </button>

          {/* Flecha conectora a VPC */}
          <div className="flex-1 flex items-center justify-center px-2">
            <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 to-emerald-500 relative">
              <div className="w-2 h-2 rounded-full bg-purple-400 absolute -top-0.5 left-1/2 -translate-x-1/2 animate-pulse"></div>
            </div>
            <span className="text-slate-500 text-xs ml-1">➔</span>
          </div>

          {/* Contenedor VPC de Recursos Internos */}
          <div className="border-2 border-dashed border-emerald-500/40 bg-emerald-950/20 p-4 rounded-3xl flex items-center gap-3">
            <div className="text-[10px] font-mono text-emerald-400 uppercase rotate-180 write-vertical font-bold">
              VPC (10.0.0.0/16)
            </div>

            {/* ALB */}
            <button
              onClick={() => setSelectedNode(architectureData.alb)}
              className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                selectedNode.id === 'alb'
                  ? 'bg-blue-600/30 border-blue-500 ring-2 ring-blue-500/50'
                  : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
              }`}
            >
              <span className="text-2xl mb-1">⚖️</span>
              <span className="text-[11px] font-bold">ALB</span>
              <span className="text-[9px] text-slate-400">Subred Pública</span>
            </button>

            <span className="text-slate-500 text-xs">➔</span>

            {/* EC2 */}
            <button
              onClick={() => setSelectedNode(architectureData.ec2)}
              className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                selectedNode.id === 'ec2'
                  ? 'bg-blue-600/30 border-blue-500 ring-2 ring-blue-500/50'
                  : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
              }`}
            >
              <span className="text-2xl mb-1">💻</span>
              <span className="text-[11px] font-bold">EC2</span>
              <span className="text-[9px] text-slate-400">Subred Privada</span>
            </button>

            <span className="text-slate-500 text-xs">➔</span>

            {/* RDS */}
            <button
              onClick={() => setSelectedNode(architectureData.rds)}
              className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                selectedNode.id === 'rds'
                  ? 'bg-blue-600/30 border-blue-500 ring-2 ring-blue-500/50'
                  : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
              }`}
            >
              <span className="text-2xl mb-1">🗄️</span>
              <span className="text-[11px] font-bold">RDS</span>
              <span className="text-[9px] text-slate-400">Datos Aislados</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detalle del Nodo Seleccionado */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {selectedNode.type}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{selectedNode.name}</h3>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
            {selectedNode.status}
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-6">{selectedNode.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          {selectedNode.details.map((item) => (
            <div key={item.label} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">{item.label}</span>
              <span className="text-sm font-bold text-slate-800 mt-1 block">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}