import React, { useEffect, useState } from 'react';
import { departmentService } from '../services/api';
import { Building2, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Modal from './Modal';
import { useToast } from '../context/ToastContext';

const DepartmentList = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchDepartments = () => {
    setLoading(true);
    departmentService.listDepartments()
      .then(res => setDepartments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = () => {
    if (deleteId) {
      departmentService.deleteDepartment(deleteId)
        .then(() => {
          setDepartments(prev => prev.filter(d => d.id !== deleteId));
          setDeleteId(null);
          showToast('Department deleted successfully');
        })
        .catch((err) => {
          console.error(err);
          showToast('Failed to delete department', 'error');
        });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
          <p className="text-secondary mt-1">Organize your workforce into functional units.</p>
        </div>
        <button onClick={() => navigate('/add-department')} className="btn btn-primary gap-2">
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="card p-6 h-48 animate-pulse bg-secondary/5" />
          ))
        ) : departments.length === 0 ? (
          <div className="col-span-full card p-12 text-center text-secondary">
            No departments found. Start by adding one.
          </div>
        ) : (
          departments.map((dept, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={dept.id}
              className="card group hover:border-primary/50 transition-all"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => navigate(`/edit-department/${dept.id}`)}
                      className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => setDeleteId(dept.id)}
                      className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{dept.departmentName}</h3>
                <p className="text-sm text-secondary line-clamp-2 mb-4">
                  {dept.departmentDescription || 'No description provided.'}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-secondary bg-secondary/5 px-3 py-2 rounded-lg w-fit">
                  <Users size={14} />
                  <span>ID: #{dept.id}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Modal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Department"
        message="Are you sure you want to delete this department? This might affect employees assigned to it."
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
};

export default DepartmentList;
