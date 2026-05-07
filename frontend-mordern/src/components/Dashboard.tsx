import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/api';
import { Users, Building2, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const Dashboard = () => {
  const [stats, setStats] = useState({ employeeCount: 0, departmentCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getStats()
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total Employees', value: stats.employeeCount, icon: Users, color: 'bg-blue-500', trend: '+12% this month' },
    { label: 'Departments', value: stats.departmentCount, icon: Building2, color: 'bg-purple-500', trend: 'Stable' },
    { label: 'Active Projects', value: 24, icon: TrendingUp, color: 'bg-emerald-500', trend: '+4 new' },
    { label: 'Avg Tenure', value: '3.2y', icon: Clock, color: 'bg-orange-500', trend: 'Increasing' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-secondary mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 group hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl text-white shadow-lg", card.color)}>
                <card.icon size={24} />
              </div>
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                {card.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-secondary">{card.label}</p>
              <h3 className="text-3xl font-bold mt-1">
                {loading ? <div className="h-8 w-16 bg-secondary/10 animate-pulse rounded" /> : card.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe joined Engineering</p>
                  <p className="text-xs text-secondary">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Department Distribution</h3>
          <div className="h-[200px] flex items-center justify-center text-secondary italic">
            Chart visualization coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
