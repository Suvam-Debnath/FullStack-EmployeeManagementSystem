import React, { useEffect, useState } from 'react';
import { employeeService, departmentService } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Building, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useToast } from '../context/ToastContext';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: ''
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    departmentService.listDepartments().then(res => setDepartments(res.data));
    if (id) {
      employeeService.getEmployeeById(id).then(res => {
        setFormData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          departmentId: res.data.departmentId || ''
        });
      });
    }
  }, [id]);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.departmentId) newErrors.departmentId = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (id) {
        await employeeService.updateEmployee(id, formData);
        showToast('Employee updated successfully');
      } else {
        await employeeService.createEmployee(formData);
        showToast('Employee added successfully');
      }
      navigate('/employees');
    } catch (error) {
      console.error(error);
      showToast('Failed to save employee', 'error');
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
        <h2 className="text-3xl font-bold tracking-tight">{id ? 'Edit Employee' : 'Add Employee'}</h2>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User size={16} className="text-secondary" />
                First Name
              </label>
              <input 
                type="text" 
                className="input"
                placeholder="John"
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
              {errors.firstName && <p className="text-xs text-red-500 font-medium">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User size={16} className="text-secondary" />
                Last Name
              </label>
              <input 
                type="text" 
                className="input"
                placeholder="Doe"
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
              {errors.lastName && <p className="text-xs text-red-500 font-medium">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Mail size={16} className="text-secondary" />
              Email Address
            </label>
            <input 
              type="email" 
              className="input"
              placeholder="john.doe@company.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Building size={16} className="text-secondary" />
              Department
            </label>
            <select 
              className="input appearance-none"
              value={formData.departmentId}
              onChange={e => setFormData({...formData, departmentId: e.target.value})}
            >
              <option value="">Select a department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
              ))}
            </select>
            {errors.departmentId && <p className="text-xs text-red-500 font-medium">{errors.departmentId}</p>}
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary flex-1 gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {id ? 'Update Employee' : 'Save Employee'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/employees')}
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

export default EmployeeForm;
