interface StatusBadgeProps {
  status: 'Healthy' | 'Degraded' | 'Critical' | 'En Uso' | 'Evaluación' | 'Disponible' | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'Healthy':
      case 'En Uso':
        return 'bg-emerald-50 text-[#16A34A] border-emerald-200Dot bg-[#16A34A]';
      case 'Degraded':
      case 'Evaluación':
        return 'bg-amber-50 text-[#F59E0B] border-amber-200Dot bg-[#F59E0B]';
      case 'Critical':
        return 'bg-red-50 text-[#DC2626] border-red-200Dot bg-[#DC2626]';
      default:
        return 'bg-blue-50 text-[#2563EB] border-blue-200Dot bg-[#2563EB]';
    }
  };

  const currentStyle = getStyles();
  const dotColor = currentStyle.split('Dot ')[1] || 'bg-[#2563EB]';
  const badgeClasses = currentStyle.split('Dot ')[0];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor}`}></span>
      {status}
    </span>
  );
}