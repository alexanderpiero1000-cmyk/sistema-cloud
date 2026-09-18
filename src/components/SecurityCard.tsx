import StatusBadge from './StatusBadge';

interface SecurityCardProps {
  title: string;
  category: string;
  description: string;
  status: string;
  recommendation: string;
}

export default function SecurityCard({ title, category, description, status, recommendation }: SecurityCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-3">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-[#2563EB] uppercase bg-blue-50 px-2 py-0.5 rounded-md">
            {category}
          </span>
          <StatusBadge status={status} />
        </div>
        <h3 className="text-base font-bold text-[#1E293B]">{title}</h3>
        <p className="text-xs text-[#64748B] mt-1">{description}</p>
      </div>

      <div className="pt-3 border-t border-[#E2E8F0] bg-slate-50 p-3 rounded-xl">
        <span className="text-[11px] font-bold text-[#64748B] block uppercase">Recomendación:</span>
        <p className="text-xs text-[#1E293B] mt-0.5">{recommendation}</p>
      </div>
    </div>
  );
}