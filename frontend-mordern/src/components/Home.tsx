import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, LayoutDashboard, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Manage Employees',
      description: 'View, add, and manage your organization\'s workforce. Track employee details and assignments.',
      icon: Users,
      path: '/employees',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'hover:border-blue-500/50',
    },
    {
      title: 'Manage Departments',
      description: 'Organize your company structure. Create and manage functional units and their descriptions.',
      icon: Building2,
      path: '/departments',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'hover:border-purple-500/50',
    },
    {
      title: 'View Dashboard',
      description: 'Get a high-level overview of your organization with real-time stats and activity tracking.',
      icon: LayoutDashboard,
      path: '/dashboard',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'hover:border-emerald-500/50',
    },
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
        >
          <Sparkles size={16} />
          <span>Welcome to EMS Pro v2.0</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold tracking-tight lg:text-6xl"
        >
          Streamline Your <span className="text-primary">Workforce</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-secondary leading-relaxed"
        >
          A comprehensive solution for managing employees, departments, and organizational insights in one sleek interface.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            onClick={() => navigate(feature.path)}
            className={cn(
              "card group cursor-pointer p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
              feature.border
            )}
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.bg, feature.color)}>
              <feature.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-secondary leading-relaxed mb-8">
              {feature.description}
            </p>
            <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
              <span>Get Started</span>
              <ArrowRight size={18} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats Preview */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="card p-8 bg-secondary/5 border-dashed border-2"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold">Ready to optimize your management?</h4>
            <p className="text-secondary">Start by browsing your employee directory or checking the latest stats.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/employees')} className="btn btn-primary">
              View Directory
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
              Open Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
