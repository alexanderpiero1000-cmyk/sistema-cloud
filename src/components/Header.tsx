interface HeaderProps {
  title?: string;
  userRole?: string;
}

export default function Header({ title = "Sistema Empresarial Cloud", userRole = "Administrador Cloud" }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between">
      <div className="text-xs font-medium text-[#64748B]">
        {title} &bull; AWS Architecture
      </div>
      <div className="flex items-center space-x-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
        <span className="text-xs font-semibold text-[#1E293B]">{userRole}</span>
      </div>
    </header>
  );
}