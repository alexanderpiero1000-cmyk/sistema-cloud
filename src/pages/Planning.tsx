import React, { useState, useEffect } from 'react';

interface CloudProposal {
  id: string;
  name: string;
  appType: string;
  description: string;
  region: string;
  users: string;
  availability: string;
  services: string[];
  goal: string;
}

const availableServices = ['EC2', 'S3', 'RDS', 'Lambda', 'DynamoDB', 'CloudFront', 'VPC', 'ECS'];

export default function Planning() {
  const [proposals, setProposals] = useState<CloudProposal[]>(() => {
    const saved = localStorage.getItem('cloud_proposals');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: '',
    appType: 'Web Monolítica',
    description: '',
    region: 'sa-east-1 (São Paulo) — ~3,455 km',
    users: '',
    availability: '99.9% (Single-AZ)',
    services: [] as string[],
    goal: 'Migración Re-hosting (Lift & Shift)',
  });

  // Guardar en localStorage y sincronizar eventos
  const saveProposals = (newProposals: CloudProposal[]) => {
    setProposals(newProposals);
    localStorage.setItem('cloud_proposals', JSON.stringify(newProposals));
    window.dispatchEvent(new Event('storage'));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;

    const newProposal: CloudProposal = {
      ...formData,
      id: Date.now().toString(),
    };

    const updated = [newProposal, ...proposals];
    saveProposals(updated);

    // Opcional: Agregar servicios de la propuesta a la calculadora de costos
    const existingCostItems = JSON.parse(localStorage.getItem('cloud_cost_items') || '[]');
    const serviceRates: Record<string, { rate: number; fullName: string }> = {
      EC2: { rate: 0.0416, fullName: 'EC2 (Calcular t3.medium)' },
      RDS: { rate: 0.0680, fullName: 'RDS (Base de datos db.t3.medium)' },
      S3: { rate: 0.0230, fullName: 'S3 (Almacenamiento por GB)' },
      Lambda: { rate: 0.0002, fullName: 'Lambda (Solicitudes / Ejecución)' },
      CloudFront: { rate: 0.0850, fullName: 'CloudFront (Transferencia CDN GB)' },
      VPC: { rate: 0.0050, fullName: 'VPC (Red Privada Virtual)' },
    };

    const newCostItems = formData.services
      .filter((srv) => serviceRates[srv])
      .map((srv) => {
        const info = serviceRates[srv];
        const monthly = Number((1 * 730 * info.rate).toFixed(2));
        return {
          id: `${Date.now()}-${srv}`,
          service: info.fullName,
          quantity: 1,
          hours: 730,
          ratePerHour: info.rate,
          monthlyCost: monthly,
          annualCost: Number((monthly * 12).toFixed(2)),
        };
      });

    if (newCostItems.length > 0) {
      localStorage.setItem('cloud_cost_items', JSON.stringify([...existingCostItems, ...newCostItems]));
    }

    setFormData({
      name: '',
      appType: 'Web Monolítica',
      description: '',
      region: 'sa-east-1 (São Paulo) — ~3,455 km',
      users: '',
      availability: '99.9% (Single-AZ)',
      services: [],
      goal: 'Migración Re-hosting (Lift & Shift)',
    });
  };

  const handleDeleteProposal = (id: string) => {
    const updated = proposals.filter((p) => p.id !== id);
    saveProposals(updated);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Módulo 2
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Planificación Cloud</h1>
        <p className="text-sm text-slate-500 mt-1">
          Registra una nueva propuesta de solución e infraestructura para la nube.
        </p>
      </div>

      {/* Formulario de Registro */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Registrar Nueva Solución</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Nombre de la solución
              </label>
              <input
                type="text"
                required
                placeholder="Ej. E-commerce Core"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Tipo de aplicación
              </label>
              <select
                value={formData.appType}
                onChange={(e) => setFormData({ ...formData, appType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option>Web Monolítica</option>
                <option>Microservicios</option>
                <option>Serverless API</option>
                <option>Procesamiento de Datos / Batch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Región seleccionada (Distancia desde Lima, Perú)
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="sa-east-1 (São Paulo) — ~3,455 km">
                  sa-east-1 (São Paulo) — ~3,455 km
                </option>
                <option value="us-east-1 (N. Virginia) — ~5,450 km">
                  us-east-1 (N. Virginia) — ~5,450 km
                </option>
                <option value="us-west-2 (Oregon) — ~6,000 km">
                  us-west-2 (Oregon) — ~6,000 km
                </option>
                <option value="eu-west-1 (Ireland) — ~9,850 km">
                  eu-west-1 (Ireland) — ~9,850 km
                </option>
                <option value="ap-northeast-1 (Tokyo) — ~15,490 km">
                  ap-northeast-1 (Tokyo) — ~15,490 km
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Número estimado de usuarios
              </label>
              <input
                type="number"
                required
                placeholder="Ej. 50000"
                value={formData.users}
                onChange={(e) => setFormData({ ...formData, users: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Nivel de disponibilidad requerido
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option>99.9% (Single-AZ)</option>
                <option>99.99% (Multi-AZ Alta Disponibilidad)</option>
                <option>99.999% (Multi-Region / Tolerante a fallos)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Objetivo de la migración
              </label>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option>Migración Re-hosting (Lift & Shift)</option>
                <option>Modernización / Re-architecting</option>
                <option>Reducción de Costos Operativos</option>
                <option>Escalabilidad Automática y Rendimiento</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Descripción de la solución
            </label>
            <textarea
              rows={2}
              required
              placeholder="Detalla el alcance y arquitectura básica propuesta..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
              Servicios Cloud seleccionados
            </label>
            <div className="flex flex-wrap gap-2">
              {availableServices.map((service) => {
                const isSelected = formData.services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Registrar Propuesta
            </button>
          </div>
        </form>
      </div>

      {/* Visualización de propuestas registradas */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Propuestas Registradas</h2>
        {proposals.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-slate-400 text-sm">
            No hay propuestas registradas aún. Completa el formulario superior.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposals.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {item.appType}
                      </span>
                      <button
                        onClick={() => handleDeleteProposal(item.id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg text-xs font-semibold transition-colors"
                        title="Borrar propuesta"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{item.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-slate-100 py-3">
                  <div>
                    <span className="text-slate-400 block">Región:</span>
                    <span className="font-medium text-slate-700">{item.region}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Usuarios est.:</span>
                    <span className="font-medium text-slate-700">{item.users}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Disponibilidad:</span>
                    <span className="font-medium text-slate-700">{item.availability}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Objetivo:</span>
                    <span className="font-medium text-slate-700">{item.goal}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1.5 uppercase">
                    Servicios:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.services.map((srv) => (
                      <span
                        key={srv}
                        className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-medium"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}