import React from 'react';

export default function GeneralCloudDashboard() {
  // Datos mock alineados con los Módulos 2 al 7
  const costDistribution = [
    { service: 'Amazon EC2 (Cómputo)', cost: 520.00, percentage: 42, color: 'bg-blue-600' },
    { service: 'Amazon RDS (Base de Datos)', cost: 380.50, percentage: 30, color: 'bg-indigo-500' },
    { service: 'Amazon S3 (Almacenamiento)', cost: 180.00, percentage: 15, color: 'bg-amber-500' },
    { service: 'CloudFront & Route 53 (Redes)', cost: 160.00, percentage: 13, color: 'bg-emerald-500' },
  ];

  const securityStatus = {
    correct: 6,
    review: 2,
    issues: 2,
    score: 92,
  };

  const globalRegions = [
    { name: 'EE.UU. Este (Norte de Virginia)', code: 'us-east-1', az: 6, status: 'Operativo', count: 7 },
    { name: 'EE.UU. Oeste (Oregón)', code: 'us-west-2', az: 4, status: 'Operativo', count: 5 },
    { name: 'Sudamérica (São Paulo)', code: 'sa-east-1', az: 3, status: 'Operativo', count: 4 },
    { name: 'Europa (Irlanda)', code: 'eu-west-1', az: 3, status: 'Operativo', count: 5 },
    { name: 'Asia Pacífico (Tokio)', code: 'ap-northeast-1', az: 4, status: 'Mantenimiento', count: 3 },
  ];

  const catalogSummary = [
    { status: 'En Uso', count: 7, badge: 'bg-emerald-100 text-emerald-700' },
    { status: 'Evaluación', count: 1, badge: 'bg-amber-100 text-amber-700' },
    { status: 'Disponible', count: 1, badge: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 bg-slate-50/50">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Módulo 1
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Dashboard General Cloud</h1>
        <p className="text-sm text-slate-500 mt-1">
          Resumen ejecutivo e indicadores integrados de todos los módulos de la solución AWS.
        </p>
      </div>

      {/* Top Cards (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Servicios Utilizados</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">7 Servicios</p>
          <p className="text-xs text-slate-500 mt-1">EC2, RDS, S3, IAM, VPC, R53, CDN</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Región Principal</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">EE.UU. Este</p>
          <p className="text-xs text-slate-500 font-mono mt-1">us-east-1</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Costo Mensual Estimado</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">$1,240.50 / mes</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">↓ -3% respecto al presupuesto</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado de Seguridad</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{securityStatus.score} / 100</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Cumplimiento CIS AWS Óptimo</p>
        </div>
      </div>

      {/* Fila 1: Módulo 3 (Costos) + Módulo 4 (Infraestructura Global) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* RESUMEN MÓDULO 3: Costos */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Módulo 3</span>
                <h3 className="text-base font-bold text-slate-900">Distribución de Costos Mensuales</h3>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Total: $1,240.50
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-6">Proyección mensual según consumo acumulado de recursos.</p>

            {/* Gráfico de barras acumulativas / desglose */}
            <div className="space-y-4">
              {costDistribution.map((item) => (
                <div key={item.service}>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>{item.service}</span>
                    <span>${item.cost.toFixed(2)} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
            <span>Estimación basada en uso activo</span>
            <span className="font-semibold text-slate-600 cursor-pointer hover:text-blue-600">Ver Módulo 3 →</span>
          </div>
        </div>

        {/* RESUMEN MÓDULO 4: Infraestructura Global (Muestra las 5 regiones) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Módulo 4</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">Infraestructura Global</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Despliegue de servicios en 5 regiones de AWS.</p>

            {/* Indicador Global */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">REGIONES</p>
                <p className="text-base font-bold text-slate-800">5</p>
              </div>
              <div className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">AZ TOTAL</p>
                <p className="text-base font-bold text-slate-800">20</p>
              </div>
              <div className="flex-1 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-center">
                <p className="text-[10px] text-emerald-600 font-bold uppercase">ESTADO</p>
                <p className="text-base font-bold text-emerald-700">4/5 Óptimas</p>
              </div>
            </div>

            {/* Lista Completa de las 5 Regiones */}
            <div className="space-y-1.5">
              {globalRegions.map((reg) => (
                <div key={reg.code} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg hover:bg-slate-100/80 transition-colors">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        reg.status === 'Operativo' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-medium text-slate-700">{reg.name}</span>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      reg.status === 'Operativo'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {reg.count} servicios
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
            <span>Latencia promedio: 28ms</span>
            <span className="font-semibold text-slate-600 cursor-pointer hover:text-blue-600">Ver Módulo 4 →</span>
          </div>
        </div>
      </div>

      {/* Fila 2: Módulo 5 (Seguridad) + Módulo 6 (Redes) + Módulo 7 (Catálogo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* RESUMEN MÓDULO 5: Seguridad */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Módulo 5</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">Postura de Seguridad</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Evaluación continua de controles y cumplimiento.</p>

            {/* Gráfica Visual de Estado */}
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xl font-bold text-emerald-600">{securityStatus.correct}</p>
                <p className="text-[10px] font-semibold text-emerald-700">Correctos</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xl font-bold text-amber-600">{securityStatus.review}</p>
                <p className="text-[10px] font-semibold text-amber-700">Revisión</p>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                <p className="text-xl font-bold text-rose-600">{securityStatus.issues}</p>
                <p className="text-[10px] font-semibold text-rose-700">Problemas</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              ⚠️ <strong>Acción requerida:</strong> Aplicar parches de SO en 3 instancias EC2.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
            <span>Cumplimiento CIS: 92%</span>
            <span className="font-semibold text-slate-600 cursor-pointer hover:text-blue-600">Ver Módulo 5 →</span>
          </div>
        </div>

        {/* RESUMEN MÓDULO 6: Arquitectura de Red */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Módulo 6</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">Flujo de Tráfico de Red</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Estado de la CDN, DNS, VPC y Balanceadores.</p>

            {/* Simulación del diagrama de flujo */}
            <div className="bg-slate-900 text-white p-3 rounded-xl text-center mb-4">
              <p className="text-[10px] font-mono text-emerald-400 mb-2">● Flujo de Tráfico Activo</p>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 px-1">
                <span className="bg-slate-800 px-1.5 py-1 rounded">R53</span>
                <span>→</span>
                <span className="bg-blue-900 text-blue-200 px-1.5 py-1 rounded">CDN</span>
                <span>→</span>
                <span className="bg-slate-800 px-1.5 py-1 rounded">ALB</span>
                <span>→</span>
                <span className="bg-slate-800 px-1.5 py-1 rounded">RDS</span>
              </div>
            </div>

            <div className="flex justify-between text-xs text-slate-600">
              <span>Caché Hit Ratio:</span>
              <span className="font-bold text-emerald-600">94.2%</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
            <span>225+ Edge Locations</span>
            <span className="font-semibold text-slate-600 cursor-pointer hover:text-blue-600">Ver Módulo 6 →</span>
          </div>
        </div>

        {/* RESUMEN MÓDULO 7: Catálogo de Servicios */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Módulo 7</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">Catálogo de Servicios</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Estado del portafolio de tecnologías en uso.</p>

            <div className="space-y-2 mb-4">
              {catalogSummary.map((item) => (
                <div key={item.status} className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-xl">
                  <span className="font-medium text-slate-700">{item.status}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${item.badge}`}>
                    {item.count} Servicios
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
            <span>9 Servicios Registrados</span>
            <span className="font-semibold text-slate-600 cursor-pointer hover:text-blue-600">Ver Módulo 7 →</span>
          </div>
        </div>

      </div>

      {/* Fila 3: Módulo 2 (Planificación y Propuestas) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Módulo 2</span>
            <h3 className="text-base font-bold text-slate-900">Planificación y Avance de Migración</h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">Avance Total: 85%</span>
        </div>
        
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-3">
          <div className="bg-blue-600 h-full rounded-full w-[85%]" />
        </div>
      </div>
    </div>
  );
}