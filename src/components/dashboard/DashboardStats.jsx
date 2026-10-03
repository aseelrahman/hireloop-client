import { StatCard } from "./StatCard";

export default function DashboardStats({ statsData = [] }) {
  if (!statsData.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsData.map((statsData, index) => (
        <StatCard
          key={statsData.id || index}
          icon={statsData.icon}
          title={statsData.title}
          value={statsData.value}
          change={statsData.change}
          isPositive={statsData.isPositive}
          iconBg={statsData.iconBg}
          iconColor={statsData.iconColor}
        />
      ))}
    </div>
  );
}
