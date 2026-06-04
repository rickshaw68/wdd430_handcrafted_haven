interface KpiCardProps{
    title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}
export function KpiCard({ title, value, trend, icon }: KpiCardProps) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 flex flex-col justify-between shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-stone-500 font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-stone-900 mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-stone-100 rounded-lg text-stone-700">
          {icon}
        </div>
      </div>
      <p className="text-sm text-emerald-600 font-medium mt-4">{trend}</p>
    </div>
  );
}