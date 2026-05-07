import React, { useEffect, useState } from 'react';
import { employeeService, departmentService } from '../services/api';
import { Search, UserPlus, MoreVertical, Edit2, Trash2, Mail, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Modal from './Modal';
import { useToast } from '../context/ToastContext';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchEmployees = (query = '') => {
    setLoading(true);
    const api = query ? employeeService.searchEmployees(query) : employeeService.listEmployees();
    
    Promise.all([
      api,
      departmentService.listDepartments()
    ]).then(([empRes, deptRes]) => {
      setEmployees(empRes.data);
      setDepartments(deptRes.data);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  };

  const getDepartmentName = (emp: any) => {
    // 1. Check if the department object exists with departmentName
    if (emp.department?.departmentName) return emp.department.departmentName;
    
    // 2. Check if departmentName is directly on the employee object
    if (emp.departmentName) return emp.departmentName;
    
    // 3. Try to find the department in our fetched departments list using departmentId
    if (emp.departmentId) {
      const dept = departments.find(d => d.id === emp.departmentId || d.id === Number(emp.departmentId));
      if (dept) return dept.departmentName;
    }
    
    return 'Unassigned';
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchEmployees(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = () => {
    if (deleteId) {
      employeeService.deleteEmployee(deleteId)
        .then(() => {
          setEmployees(prev => prev.filter(e => e.id !== deleteId));
          setDeleteId(null);
          showToast('Employee deleted successfully');
        })
        .catch((err) => {
          console.error(err);
          showToast('Failed to delete employee', 'error');
        });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-secondary mt-1">Manage and track your organization's talent.</p>
        </div>
        <button onClick={() => navigate('/add-employee')} className="btn btn-primary gap-2">
          <UserPlus size={18} />
          Add Employee
        </button>
      </div>

      <div className="space-y-6">
        <div className="card p-4 flex items-center gap-3">
          <Search className="text-secondary" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, email or ID..." 
            className="bg-transparent border-none focus:ring-0 w-full text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card p-6 h-48 animate-pulse bg-secondary/5" />
            ))
          ) : employees.length === 0 ? (
            <div className="col-span-full card p-12 text-center text-secondary">
              No employees found.
            </div>
          ) : (
            employees.map((emp, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                key={emp.id}
                className="card group hover:border-primary/50 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{emp.firstName} {emp.lastName}</h3>
                        <p className="text-xs text-secondary font-medium">ID: #{emp.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => navigate(`/edit-employee/${emp.id}`)}
                        className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                        title="Edit Employee"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => setDeleteId(emp.id)}
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <div className="w-8 h-8 rounded-lg bg-secondary/5 flex items-center justify-center">
                        <Mail size={14} />
                      </div>
                      <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <div className="w-8 h-8 rounded-lg bg-secondary/5 flex items-center justify-center">
                        <Building size={14} />
                      </div>
                      <span className="font-medium px-2 py-0.5 rounded-md bg-primary/5 text-primary text-xs">
                        {getDepartmentName(emp)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Modal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
};

export default EmployeeList;
