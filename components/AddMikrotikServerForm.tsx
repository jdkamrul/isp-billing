import React, { useState, useEffect } from 'react';
import { MikrotikServer, MikrotikServerVersion, MikrotikServerStatus } from '../types';
import { Loader2 } from 'lucide-react';

interface AddMikrotikServerFormProps {
  onSave: (server: Omit<MikrotikServer, 'id' | 'last_checked_at'>) => Promise<void>;
  onCancel: () => void;
  serverToEdit?: MikrotikServer | null;
}

const AddMikrotikServerForm: React.FC<AddMikrotikServerFormProps> = ({ onSave, onCancel, serverToEdit }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    api_port: 8728,
    username: 'admin',
    password: '',
    version: 'v7' as MikrotikServerVersion,
    timeout_seconds: 10,
    status: 'active' as MikrotikServerStatus,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (serverToEdit) {
      setFormData({
        name: serverToEdit.name,
        host: serverToEdit.host,
        api_port: serverToEdit.api_port,
        username: serverToEdit.username,
        password: '', // Password is not pre-filled for security
        version: serverToEdit.version,
        timeout_seconds: serverToEdit.timeout_seconds,
        status: serverToEdit.status,
      });
    } else {
       // Reset form for adding new
       setFormData({
        name: '', host: '', api_port: 8728, username: 'admin', password: '',
        version: 'v7', timeout_seconds: 10, status: 'active'
       });
    }
  }, [serverToEdit]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Server name is required';
    if (!formData.host.trim()) newErrors.host = 'Host IP or domain is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!serverToEdit && !formData.password.trim()) newErrors.password = 'Password is required for a new server';
    if (formData.api_port <= 0) newErrors.api_port = 'Invalid port number';
    if (formData.timeout_seconds <= 0) newErrors.timeout_seconds = 'Timeout must be positive';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSaving(true);
      try {
        await onSave(formData);
      } catch (error) {
        console.error("Failed to save server", error);
        // Optionally show an error to the user
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'api_port' || name === 'timeout_seconds' ? parseInt(value, 10) || 0 : value }));
  };

  const FormField: React.FC<{ label: string; id: string; error?: string; children: React.ReactNode }> = ({ label, id, error, children }) => (
    <div className="sm:col-span-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
        <FormField label="Server Name" id="name" error={errors.name}>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </FormField>
        <FormField label="Host (IP / Domain)" id="host" error={errors.host}>
          <input type="text" name="host" id="host" value={formData.host} onChange={handleChange} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </FormField>
        <FormField label="API Port" id="api_port" error={errors.api_port}>
          <input type="number" name="api_port" id="api_port" value={formData.api_port} onChange={handleChange} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </FormField>
        <FormField label="Username" id="username" error={errors.username}>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </FormField>
        <FormField label="Password" id="password" error={errors.password}>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" placeholder={serverToEdit ? "Leave blank to keep unchanged" : ""}/>
        </FormField>
         <FormField label="RouterOS Version" id="version" error={errors.version}>
          <select name="version" id="version" value={formData.version} onChange={handleChange} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
            <option value="v7">Version 7</option>
            <option value="v6">Version 6</option>
          </select>
        </FormField>
        <FormField label="Timeout (seconds)" id="timeout_seconds" error={errors.timeout_seconds}>
          <input type="number" name="timeout_seconds" id="timeout_seconds" value={formData.timeout_seconds} onChange={handleChange} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </FormField>
         <FormField label="Status" id="status" error={errors.status}>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </FormField>
      </div>
      <div className="flex justify-end pt-4 space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600" disabled={isSaving}>Cancel</button>
        <button type="submit" className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50" disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? 'Saving...' : (serverToEdit ? 'Save Changes' : 'Add Server')}
        </button>
      </div>
    </form>
  );
};

export default AddMikrotikServerForm;