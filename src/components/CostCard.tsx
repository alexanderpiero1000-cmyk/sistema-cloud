interface CostCardProps {
  concept: string;
  amount: string;
  percentage: number;
  category: string;
}

export default function CostCard({ concept, amount, percentage, category }: CostCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-[#64748B]">{category}</span>
        <span className="text-xs font-bold text-[#F59E0B]">{percentage}% del total</span>
      </div>
      <h4 className="text-sm font-bold text-[#1E293B]">{concept}</h4>
      <div className="text-xl font-bold text-[#1E293B] mt-1">{amount}</div>
      <div className="w-full bg-[#E2E8F0] h-2 rounded-full mt-3 overflow-hidden">
        <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}