"use client";

import { KpiCard } from "@/components/KpiCard";
import { dashboardKpiData } from "@/data/dashboard";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";


const getIcon = (id: number) => {
  switch (id) {
    case 1: return <DollarSign size={20} />;
    case 2: return <ShoppingBag size={20} />;
    case 3: return <Users size={20} />;
    case 4: return <TrendingUp size={20} />;
    default: return null;
  }
};

export default function Dashboard() {
  return (
    <main className="p-8 max-w-5xl mx-auto bg-stone-50">
      <h1 className="text-2xl font-bold text-stone-900">Welcome back, Admin</h1>
      <p className="text-stone-600 mb-8">Here's what's happening with your marketplace today</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardKpiData.map((kpi) => (
          <KpiCard 
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            icon={getIcon(kpi.id)}
          />
        ))}
      </div>
    </main>
  );
}