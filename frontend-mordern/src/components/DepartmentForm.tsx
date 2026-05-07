import React, { useEffect, useState } from 'react';
import { departmentService } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Building2, AlignLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useToast } from '../context/ToastContext';

const DepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: '',
    departmentDescription: ''
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (id) {
      departmentService.getDepartmentById(id).then(res => {
        setFormData({
          departmentName: res.data.departmentName,
          departmentDescription: res.data.departmentDescription
        });
      });
    }
  }, [id]);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.departmentName) newErrors.departmentName = 'Department name is required';
    if (!formData.departmentDescription) newErrors.departmentDescription = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (id) {
        await departmentService.updateDepartment(id, formData);
        showToast('Department updated successfully');
      } else {
        await departmentService.createDepartment(formData);
        showToast('Department added successfully');
      }
      navigate('/departments');
    } catch (error) {
      console.error(error);
      showToast('Failed to save department', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="btn btn-ghost p-2 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-3xl font-bold tracking-tight">{id ? 'Edit Department' : 'Add Department'}</h2>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Building2 size={16} className="text-secondary" />
              Department Name
            </label>
            <input 
              type="text" 
              className="input"
              placeholder="e.g. Engineering, Marketing"
              value={formData.departmentName}
              onChange={e => setFormData({...formData, departmentName: e.target.value})}
            />
            {errors.departmentName && <p className="text-xs text-red-500 font-medium">{errors.departmentName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <AlignLeft size={16} className="text-secondary" />
              Description
            </label>
            <textarea 
              className="input min-h-[120px] py-3 resize-none"
              placeholder="Describe the department's role and responsibilities..."
              value={formData.departmentDescription}
              onChange={e => setFormData({...formData, departmentDescription: e.target.value})}
            />
            {errors.departmentDescription && <p className="text-xs text-red-500 font-medium">{errors.departmentDescription}</p>}
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary flex-1 gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {id ? 'Update Department' : 'Save Department'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/departments')}
              className="btn btn-secondary px-8"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default DepartmentForm;
