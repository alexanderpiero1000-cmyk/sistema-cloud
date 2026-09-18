import StatusBadge from './StatusBadge';

interface RegionCardProps {
  regionName: string;
  code: string;
  latency: string;
  status: string;
  activeServices: number;
}

export default function RegionCard({ regionName, code, latency, status, activeServices }: RegionCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex justify-between items-center">
      <div>
        <div className="flex items-center space-x-2">
          <h4 className="font-bold text-sm text-[#1E293B]">{regionName}</h4>
          <span className="text-xs text-[#64748B] font-mono">({code})</span>
        </div>
        <div className="text-xs text-[#64748B] mt-1">
          Latencia: <span className="font-semibold text-[#1E293B]">{latency}</span> &bull; Servicios: <span className="font-semibold text-[#1E293B]">{activeServices}</span>
        </div>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}