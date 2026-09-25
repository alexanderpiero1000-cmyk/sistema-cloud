import React, { useState, useEffect } from 'react';
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
  'EC2 (Calcular t3.medium)': 0.0416,
  'RDS (Base de datos db.t3.medium)': 0.0680,
  'S3 (Almacenamiento por GB)': 0.0230,
  'IAM (Gestión de Identidades)': 0.0000,
  'VPC (Red Privada Virtual)': 0.0050,
  'Route 53 (Gestión DNS)': 0.0015,
  'CloudFront (Transferencia CDN GB)': 0.0850,
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'];

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, value, name, percent } = props;
  const RADIAN = Math.PI / 180;

  const radius = outerRadius + 8;
  const x1 = cx + radius * Math.cos(-midAngle * RADIAN);
  const y1 = cy + radius * Math.sin(-midAngle * RADIAN);

  const lineRadius = outerRadius + 24;
  const x2 = cx + lineRadius * Math.cos(-midAngle * RADIAN);
  const y2 = cy + lineRadius * Math.sin(-midAngle * RADIAN);

  const isRight = Math.cos(-midAngle * RADIAN) >= 0;
  const x3 = x2 + (isRight ? 16 : -16);
  const textAnchor = isRight ? 'start' : 'end';

  return (
    <g>
      <circle cx={x1} cy={y1} r={3.5} fill="#475569" />
      <path
        d={`M${x1},${y1} L${x2},${y2} L${x3},${y2}`}
        stroke="#94a3b8"
        strokeWidth={1.5}
        fill="none"
      />
      <text
        x={x3 + (isRight ? 6 : -6)}
        y={y2 - 6}
        fill="#0f172a"
        textAnchor={textAnchor}
        dominantBaseline="central"
        className="text-[12px] font-bold"
      >
        {name}
      </text>
      <text
        x={x3 + (isRight ? 6 : -6)}
        y={y2 + 8}
        fill="#64748b"
        textAnchor={textAnchor}
        dominantBaseline="central"
        className="text-[11px] font-semibold"
      >
        ${Number(value).toFixed(2)} ({(percent * 100).toFixed(0)}%)
      </text>
    </g>
  );
};

export default function Costs() {
  const [items, setItems] = useState<CostItem[]>(() => {
    const saved = localStorage.getItem('cloud_cost_items');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: '1',
            service: 'EC2 (Calcular t3.medium)',
            quantity: 2,
            hours: 730,
            ratePerHour: 0.0416,
            monthlyCost: 60.74,
            annualCost: 728.83,
          },
          {
            id: '2',
            service: 'RDS (Base de datos db.t3.medium)',
            quantity: 1,
            hours: 730,
            ratePerHour: 0.068,
            monthlyCost: 49.64,
            annualCost: 595.68,
          },
        ];
  });

  const [selectedService, setSelectedService] = useState('EC2 (Calcular t3.medium)');
  const [quantity, setQuantity] = useState<number | ''>(1);
  const [hours, setHours] = useState<number | ''>(730);

  const saveCostItems = (newItems: CostItem[]) => {
    setItems(newItems);
    localStorage.setItem('cloud_cost_items', JSON.stringify(newItems));
  };

  useEffect(() => {
    const syncData = () => {
      const saved = localStorage.getItem('cloud_cost_items');
      if (saved) setItems(JSON.parse(saved));
    };
    window.addEventListener('storage', syncData);
    return () => window.removeEventListener('storage', syncData);
  }, []);

  const currentRate = serviceRates[selectedService] ?? 0;
  const numericQuantity = typeof quantity === 'number' ? quantity : 0;
  const numericHours = typeof hours === 'number' ? hours : 0;

  const calculatedMonthlyCost = (numericQuantity * numericHours * currentRate).toFixed(2);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericQuantity <= 0 || numericHours <= 0) return;

    const monthly = Number(calculatedMonthlyCost);
    const annual = Number((monthly * 12).toFixed(2));

    const newItem: CostItem = {
      id: Date.now().toString(),
      service: selectedService,
      quantity: numericQuantity,
      hours: numericHours,
      ratePerHour: currentRate,
      monthlyCost: monthly,
      annualCost: annual,
    };

    saveCostItems([...items, newItem]);
  };

  const handleUpdateItem = (id: string, field: 'quantity' | 'hours', value: number) => {
    const safeValue = value < 1 ? 1 : value;
    const updated = items.map((item) => {
      if (item.id === id) {
        const newQty = field === 'quantity' ? safeValue : item.quantity;
        const newHours = field === 'hours' ? safeValue : item.hours;
        const monthly = Number((newQty * newHours * item.ratePerHour).toFixed(2));
        const annual = Number((monthly * 12).toFixed(2));

        return {
          ...item,
          quantity: newQty,
          hours: newHours,
          monthlyCost: monthly,
          annualCost: annual,
        };
      }
      return item;
    });
    saveCostItems(updated);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveCostItems(updated);
  };

  const totalMonthly = items.reduce((acc, curr) => acc + curr.monthlyCost, 0);
  const totalAnnual = items.reduce((acc, curr) => acc + curr.annualCost, 0);

  const chartData = Object.values(
    items.reduce((acc, item) => {
      const name = item.service.split(' ')[0];
      if (!acc[name]) {
        acc[name] = { name, value: 0 };
      }
      acc[name].value += item.monthlyCost;
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="ITEMS ESTIMADOS" value={`${items.length} Recurso(s)`} />
        <StatCard title="COSTO MENSUAL TOTAL" value={`$${totalMonthly.toFixed(2)} USD`} />
        <StatCard title="COSTO ANUAL PROYECTADO" value={`$${totalAnnual.toFixed(2)} USD`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recurso Simular</h2>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                SELECCIÓN DEL SERVICIO
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white font-medium text-slate-700"
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
                CANTIDAD
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                HORAS ESTIMADAS (MENSUALES)
              </label>
              <input
                type="number"
                min="1"
                max="730"
                required
                value={hours}
                onChange={(e) => setHours(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="p-3 bg-slate-50/80 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span>Costo estimado / Hora:</span>
                <span className="font-semibold text-slate-800 font-mono">
                  $ {currentRate.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Costo Mensual Estimado:</span>
                <span className="font-bold text-blue-600 text-sm font-mono">
                  $ {calculatedMonthlyCost}
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

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">Distribución de Costos</h3>
            <p className="text-xs text-slate-400 mt-0.5">Porcentaje e inversión mensual por tipo de recurso.</p>
          </div>
          <div className="h-80 w-full mt-2">
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
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={6}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
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

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Desglose de Costos Calculados</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-3">Servicio</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Horas/Mes</th>
                <th className="p-3">Costo (/hora)</th>
                <th className="p-3">Costo Mensual</th>
                <th className="p-3">Costo Anual</th>
                <th className="p-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 font-medium text-slate-800">{item.service}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center font-semibold text-slate-800"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      max="730"
                      value={item.hours}
                      onChange={(e) => handleUpdateItem(item.id, 'hours', Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-center font-semibold text-slate-800"
                    />
                  </td>
                  <td className="p-3 font-mono text-slate-500">${item.ratePerHour.toFixed(4)}</td>
                  <td className="p-3 font-semibold text-blue-600">${item.monthlyCost.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-slate-700">${item.annualCost.toFixed(2)}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-xs bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
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