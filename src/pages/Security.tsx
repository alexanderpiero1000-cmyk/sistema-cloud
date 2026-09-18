import { useState } from 'react';

type HealthStatus = 'Correcto' | 'Requiere Revisión' | 'Problema';

interface SecurityCheck {
  id: string;
  category: 'Responsabilidad Compartida' | 'IAM' | 'Protección de Cuentas' | 'Protección de Datos' | 'Cumplimiento';
  title: string;
  description: string;
  status: HealthStatus;
  recommendation: string;
}

const initialChecks: SecurityCheck[] = [
  // Modelo de Responsabilidad Compartida
  {
    id: '1',
    category: 'Responsabilidad Compartida',
    title: 'Parcheado de SO en Instancias EC2',
    description: 'El cliente es responsable del mantenimiento de parches en el sistema operativo huésped.',
    status: 'Requiere Revisión',
    recommendation: 'Aplicar las últimas actualizaciones de seguridad en 3 instancias Linux.',
  },
  {
    id: '2',
    category: 'Responsabilidad Compartida',
    title: 'Seguridad Física de Data Centers',
    description: 'AWS garantiza la seguridad física del hardware y las instalaciones.',
    status: 'Correcto',
    recommendation: 'Gestionado completamente por el proveedor Cloud.',
  },
  // IAM (Identity and Access Management)
  {
    id: '3',
    category: 'IAM',
    title: 'MFA Activo en Usuario Root',
    description: 'Autenticación de múltiples factores obligatoria para la cuenta raíz.',
    status: 'Correcto',
    recommendation: 'MFA mediante Token Hardware activo correctamente.',
  },
  {
    id: '4',
    category: 'IAM',
    title: 'Políticas de Mínimo Privilegio',
    description: 'Evaluación de permisos concedidos a usuarios y roles.',
    status: 'Problema',
    recommendation: 'Se detectaron 2 usuarios con permisos AdministratorAccess sin justificación.',
  },
  // Protección de Cuentas
  {
    id: '5',
    category: 'Protección de Cuentas',
    title: 'Monitoreo de GuardDuty',
    description: 'Detección inteligente de amenazas y comportamiento anómalo.',
    status: 'Correcto',
    recommendation: 'Servicio activo y analizando logs en tiempo real.',
  },
  {
    id: '6',
    category: 'Protección de Cuentas',
    title: 'Alertas de Presupuesto y Facturación',
    description: 'Notificación de picos inesperados en el consumo de la cuenta.',
    status: 'Requiere Revisión',
    recommendation: 'Configurar un webhook de Slack para alertas inmediatas.',
  },
  // Protección de Datos
  {
    id: '7',
    category: 'Protección de Datos',
    title: 'Cifrado de Buckets S3 en Reposo',
    description: 'Uso de cifrado KMS/AES-256 para almacenamiento de objetos.',
    status: 'Correcto',
    recommendation: 'Todos los buckets tienen cifrado predeterminado activado.',
  },
  {
    id: '8',
    category: 'Protección de Datos',
    title: 'Tráfico HTTPS / TLS en Tránsito',
    description: 'Certificados SSL/TLS activos en endpoints públicos.',
    status: 'Correcto',
    recommendation: 'Certificados renovados automáticamente vía ACM.',
  },
  // Cumplimiento
  {
    id: '9',
    category: 'Cumplimiento',
    title: 'Evaluación de Cumplimiento ISO 27001 / SOC 2',
    description: 'Reportes de auditoría de seguridad y estándares del sector.',
    status: 'Correcto',
    recommendation: 'Reportes descargados y validados desde AWS Artifact.',
  },
  {
    id: '10',
    category: 'Cumplimiento',
    title: 'Auditoría de Logs con CloudTrail',
    description: 'Registro de todas las llamadas a las APIs de la cuenta.',
    status: 'Problema',
    recommendation: 'El envío de logs a S3 falló en la región sa-east-1.',
  },
];

export default function Security() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = [
    'Todas',
    'Responsabilidad Compartida',
    'IAM',
    'Protección de Cuentas',
    'Protección de Datos',
    'Cumplimiento',
  ];

  const filteredChecks = initialChecks.filter(
    (check) => selectedCategory === 'Todas' || check.category === selectedCategory
  );

  const countStatus = (status: HealthStatus) =>
    initialChecks.filter((item) => item.status === status).length;

  const renderBadge = (status: HealthStatus) => {
    switch (status) {
      case 'Correcto':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
            Correcto
          </span>
        );
      case 'Requiere Revisión':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            Requiere Revisión
          </span>
        );
      case 'Problema':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
            Problema
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Módulo 5
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Panel de Seguridad Cloud</h1>
        <p className="text-sm text-slate-500 mt-1">
          Evaluación de la postura de seguridad, gobernanza e indicadores de cumplimiento.
        </p>
      </div>

      {/* Indicadores de Estado Global */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Correctos</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{countStatus('Correcto')}</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Requieren Revisión</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{countStatus('Requiere Revisión')}</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Problemas Detectados</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">{countStatus('Problema')}</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
        </div>
      </div>

      {/* Filtros por Categoría */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <span className="text-xs font-bold text-slate-500 uppercase mr-2">Categoría:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tarjetas de Evaluación de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChecks.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                {renderBadge(item.status)}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">
                Recomendación / Acción:
              </span>
              <p className="text-xs text-slate-700 font-medium mt-0.5">{item.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}