import StatusBadge from './StatusBadge';

interface ServiceCardProps {
  name: string;
  category: string;
  description: string;
  mainFunction: string;
  usageStatus: string;
  icon: string;
}

export default function ServiceCard({ name, category, description, mainFunction, usageStatus, icon }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{icon}</span>
            <div>
              <h3 className="font-bold text-[#1E293B] text-base">{name}</h3>
              <span className="text-[10px] font-bold text-[#2563EB] uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                {category}
              </span>
            </div>
          </div>
          <StatusBadge status={usageStatus} />
        </div>
        <p className="text-xs text-[#64748B] leading-relaxed">{description}</p>
      </div>

      <div className="pt-3 border-t border-[#E2E8F0]">
        <span className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">
          Función Principal:
        </span>
        <p className="text-xs text-[#1E293B] font-medium mt-1">{mainFunction}</p>
      </div>
    </div>
  );
}