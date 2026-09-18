import { useState } from 'react';

interface AwsService {
  id: string;
  name: string;
  category: 'Computo' | 'Almacenamiento' | 'Base de Datos' | 'Seguridad e Identidad' | 'Redes y CDN';
  description: string;
  mainFunction: string;
  usageStatus: 'En Uso' | 'Disponible' | 'Evaluación';
  icon: string;
}

const servicesList: AwsService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Computo',
    description: 'Servidores virtuales seguros y de capacidad redimensionable en la nube.',
    mainFunction: 'Procesamiento de cómputo y ejecución de aplicaciones del core de negocio.',
    usageStatus: 'En Uso',
    icon: '💻',
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Almacenamiento',
    description: 'Servicio de almacenamiento de objetos diseñado para almacenar y recuperar cualquier cantidad de datos.',
    mainFunction: 'Almacenamiento de archivos estáticos, backups y assets multimedia.',
    usageStatus: 'En Uso',
    icon: '📦',
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    category: 'Base de Datos',
    description: 'Servicio gestionado de bases de datos relacionales como PostgreSQL, MySQL y MariaDB.',
    mainFunction: 'Gestión y persistencia de datos relacionales con alta disponibilidad Multi-AZ.',
    usageStatus: 'En Uso',
    icon: '🗄️',
  },
  {
    id: 'iam',
    name: 'AWS IAM',
    category: 'Seguridad e Identidad',
    description: 'Gestión de acceso e identidades para controlar el acceso a los recursos de AWS de forma segura.',
    mainFunction: 'Control de permisos, roles, usuarios y políticas de acceso de mínimo privilegio.',
    usageStatus: 'En Uso',
    icon: '🔑',
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    category: 'Redes y CDN',
    description: 'Red virtual aislada lógicamente para definir y gestionar la infraestructura de red propia.',
    mainFunction: 'Aislamiento de red, configuración de subredes públicas/privadas y tablas de enrutamiento.',
    usageStatus: 'En Uso',
    icon: '🌐',
  },
  {
    id: 'route53',
    name: 'Amazon Route 53',
    category: 'Redes y CDN',
    description: 'Servicio de DNS web altamente disponible y escalable en la nube.',
    mainFunction: 'Gestión de nombres de dominio y enrutamiento inteligente del tráfico de usuarios.',
    usageStatus: 'En Uso',
    icon: '📡',
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'Redes y CDN',
    description: 'Red de distribución de contenido (CDN) rápida que entrega datos, videos y APIs de forma segura.',
    mainFunction: 'Aceleración de entrega de contenido mediante caching en puntos de presencia globales (Edge Locations).',
    usageStatus: 'En Uso',
    icon: '⚡',
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Computo',
    description: 'Servicio de cómputo serverless que ejecuta código en respuesta a eventos sin gestionar servidores.',
    mainFunction: 'Ejecución de backend impulsado por eventos y microservicios serverless.',
    usageStatus: 'Evaluación',
    icon: '⚡',
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    category: 'Base de Datos',
    description: 'Base de datos NoSQL de clave-valor y documentos totalmente gestionada.',
    mainFunction: 'Almacenamiento de datos NoSQL con latencia de milisegundos a cualquier escala.',
    usageStatus: 'Disponible',
    icon: '⚡',
  },
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    'Todas',
    'Computo',
    'Almacenamiento',
    'Base de Datos',
    'Seguridad e Identidad',
    'Redes y CDN',
  ];

  const filteredServices = servicesList.filter((service) => {
    const matchesCategory = selectedCategory === 'Todas' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderUsageBadge = (status: AwsService['usageStatus']) => {
    switch (status) {
      case 'En Uso':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
            En Uso
          </span>
        );
      case 'Evaluación':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            Evaluación
          </span>
        );
      case 'Disponible':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
            Disponible
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Módulo 7
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Catálogo de Servicios AWS</h1>
        <p className="text-sm text-slate-500 mt-1">
          Inventario de servicios en la nube con su función principal y estado de utilización.
        </p>
      </div>

      {/* Buscador y Filtros */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="w-full">
          <input
            type="text"
            placeholder="Buscar servicio por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2">Categoría:</span>
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
      </div>

      {/* Grilla de Tarjetas de Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{service.name}</h3>
                    <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                      {service.category}
                    </span>
                  </div>
                </div>
                {renderUsageBadge(service.usageStatus)}
              </div>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{service.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                Función Principal:
              </span>
              <p className="text-xs text-slate-700 font-medium mt-1">{service.mainFunction}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-slate-400 text-sm">
          No se encontraron servicios que coincidan con la búsqueda.
        </div>
      )}
    </div>
  );
}