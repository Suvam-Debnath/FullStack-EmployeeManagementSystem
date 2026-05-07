import React from 'react';
import { Building2, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Building2 size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight">EMS Pro</span>
            </div>
            <p className="text-secondary max-w-xs">
              Modern employee management solution for growing organizations. 
              Streamline your workforce with ease and efficiency.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary hover:text-primary transition-colors"><Github size={20} /></a>
              <a href="#" className="text-secondary hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-secondary hover:text-primary transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary">
          <p>© 2026 EMS Pro. All rights reserved.</p>
          <p>Developed by Suvam Debnath.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
