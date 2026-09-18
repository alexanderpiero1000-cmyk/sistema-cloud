import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CostItem {
  id: string;
  service: string;
  quantity: number;
  hours: number;
  ratePerHour: number;
  monthlyCost: number;
  annualCost: number;
}

const serviceRates: Record<string, number> = {
  'EC2 (Compute t3.medium)': 0.0416,
  'RDS (Database db.t3.medium)': 0.068,
  'S3 (Storage por GB)': 0.023,
  'Lambda (Requests / Ejecución)': 0.0000002,
  'CloudFront (CDN Transfer GB)': 0.085,
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function Costs() {
  const [items, setItems] = useState<CostItem[]>([
    {
      id: '1',
      service: 'EC2 (Compute t3.medium)',
      quantity: 2,
      hours: 730,
      ratePerHour: 0.0416,
      monthlyCost: 60.74,
      annualCost: 728.83,
    },
    {
      id: '2',
      service: 'RDS (Database db.t3.medium)',
      quantity: 1,
      hours: 730,
      ratePerHour: 0.068,
      monthlyCost: 49.64,
      annualCost: 595.68,
    },
  ]);

  const [selectedService, setSelectedService] = useState('EC2 (Compute t3.medium)');
  const [quantity, setQuantity] = useState(1);
  const [hours, setHours] = useState(730); // 730 hrs promedio al mes

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = serviceRates[selectedService] || 0.05;
    const monthly = Number((quantity * hours * rate).toFixed(2));
    const annual = Number((monthly * 12).toFixed(2));

    const newItem: CostItem = {
      id: Date.now().toString(),
      service: selectedService,
      quantity,
      hours,
      ratePerHour: rate,
      monthlyCost: monthly,
      annualCost: annual,
    };

    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalMonthly = items.reduce((acc, curr) => acc + curr.monthlyCost, 0);
  const totalAnnual = items.reduce((acc, curr) => acc + curr.annualCost, 0);

  const chartData = items.map((item) => ({
    name: item.service.split(' ')[0],
    value: item.monthlyCost,
  }));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Módulo 3
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Costos y Economía Cloud</h1>
        <p className="text-sm text-slate-500 mt-1">
          Calculadora de estimación y distribución económica de la infraestructura.
        </p>
      </div>

      {/* Indicadores Totales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="ITEMS ESTIMADOS" value={`${items.length} Recurso(s)`} />
        <StatCard title="COSTO MENSUAL TOTAL" value={`$${totalMonthly.toFixed(2)} USD`} />
        <StatCard title="COSTO ANUAL PROYECTADO" value={`$${totalAnnual.toFixed(2)} USD`} />
      </div>

      {/* Formulario y Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Formulario de Estimación */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Simular Recurso</h2>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Selección del servicio
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                {Object.keys(serviceRates).map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Cantidad
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Horas estimadas (Mensuales)
              </label>
              <input
                type="number"
                min="1"
                max="730"
                required
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Costo estimado / Hora:</span>
                <span className="font-semibold text-slate-700">
                  ${(serviceRates[selectedService] || 0.05).toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Costo Mensual:</span>
                <span className="font-semibold text-blue-600">
                  ${(quantity * hours * (serviceRates[selectedService] || 0.05)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Agregar a la Estimación
            </button>
          </form>
        </div>

        {/* Gráfico de Distribución */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">Distribución de Costos</h3>
            <p className="text-xs text-slate-400 mt-0.5">Porcentaje de inversión por tipo de recurso.</p>
          </div>
          <div className="h-64 w-full mt-4">
            {items.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Agrega elementos para generar la gráfica.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`$${Number(value).toFixed(2)} USD`, 'Costo']} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Tabla Desglose de Estimaciones */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Desglose de Costos Calculados</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-3">Servicio</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Horas/Mes</th>
                <th className="p-3">Costo Mensual</th>
                <th className="p-3">Costo Anual</th>
                <th className="p-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="p-3 font-medium text-slate-800">{item.service}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.hours} hrs</td>
                  <td className="p-3 font-semibold text-blue-600">${item.monthlyCost.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-slate-700">${item.annualCost.toFixed(2)}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-xs"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}