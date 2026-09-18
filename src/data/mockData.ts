// src/data/mockData.ts

export const mockStats = {
  totalCost: "$1,240.50",
  activeServices: 14,
  securityScore: "92%",
  activeRegions: 4,
};

export const mockRegions = [
  { regionName: "EE. UU. Este (N. Virginia)", code: "us-east-1", latency: "24 ms", status: "Healthy", activeServices: 8 },
  { regionName: "EE. UU. Oeste (Oregón)", code: "us-west-2", latency: "65 ms", status: "Healthy", activeServices: 4 },
  { regionName: "Europa (Fráncfort)", code: "eu-central-1", latency: "110 ms", status: "Healthy", activeServices: 2 },
  { regionName: "Sudamérica (São Paulo)", code: "sa-east-1", latency: "42 ms", status: "Degraded", activeServices: 3 },
];

export const mockCosts = [
  { concept: "Instancias EC2 Computo Core", amount: "$520.00", percentage: 42, category: "Computo" },
  { concept: "Bases de Datos RDS Multi-AZ", amount: "$380.50", percentage: 30, category: "Database" },
  { concept: "Almacenamiento S3 y Transferencia", amount: "$180.00", percentage: 15, category: "Storage" },
  { concept: "CloudFront CDN y Route 53", amount: "$160.00", percentage: 13, category: "Networking" },
];

export const mockSecurityChecks = [
  {
    title: "Autenticación MFA en Usuario Root",
    category: "IAM",
    description: "Verificación de factor de autenticación múltiple en la cuenta principal.",
    status: "Healthy",
    recommendation: "MFA activo y configurado con llave de seguridad física.",
  },
  {
    title: "Parcheado de SO en Instancias EC2",
    category: "Responsabilidad Compartida",
    description: "Mantenimiento y parches de seguridad del sistema operativo.",
    status: "Evaluación",
    recommendation: "Aplicar las últimas actualizaciones de seguridad mediante AWS Systems Manager.",
  },
  {
    title: "Seguridad Física de Data Centers",
    category: "Responsabilidad Compartida",
    description: "Protección perimetral y física de los centros de datos globales.",
    status: "Healthy",
    recommendation: "Gestionado completamente por AWS bajo cumplimiento ISO 27001.",
  },
];