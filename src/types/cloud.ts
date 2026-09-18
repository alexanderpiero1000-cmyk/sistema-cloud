export interface CloudPlanning {
  id: string;
  solutionName: string;
  appType: 'Web Monolítica' | 'Microservicios' | 'Serverless' | 'Data / Analytics' | 'Móvil Backend';
  description: string;
  region: string;
  estimatedUsers: number;
  availabilityLevel: '99.9% (Standard)' | '99.99% (Alta Disponibilidad)' | '99.999% (Misión Crítica)';
  selectedServices: string[];
  migrationObjective: 'Reducción de Costos' | 'Escalabilidad Global' | 'Modernización de Apps' | 'Recuperación ante Desastres';
  createdAt: string;
}