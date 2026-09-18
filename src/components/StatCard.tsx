interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: string;
}

export default function StatCard({ title, value, subtitle, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">{title}</span>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-[#1E293B]">{value}</div>
        {(subtitle || trend) && (
          <div className="flex items-center space-x-2 mt-1">
            {trend && <span className="text-xs font-bold text-[#16A34A]">{trend}</span>}
            {subtitle && <span className="text-xs text-[#64748B]">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}