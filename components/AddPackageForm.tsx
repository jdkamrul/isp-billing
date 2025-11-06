import React, { useState } from 'react';
import { Package } from '../types';

interface AddPackageFormProps {
  onAddPackage: (pkg: Omit<Package, 'id' | 'activeCustomers'>) => void;
  onCancel: () => void;
}

const AddPackageForm: React.FC<AddPackageFormProps> = ({ onAddPackage, onCancel }) => {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [price, setPrice] = useState('');
  const [dataLimit, setDataLimit] = useState('Unlimited');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Package name is required';
    if (!speed.trim()) newErrors.speed = 'Speed is required (e.g., 100/20 Mbps)';
    const priceNumber = parseFloat(price);
    if (!price.trim()) {
        newErrors.price = 'Price is required';
    } else if (isNaN(priceNumber) || priceNumber <= 0) {
        newErrors.price = 'Please enter a valid positive price';
    }
    if (!dataLimit.trim()) newErrors.dataLimit = 'Data limit is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAddPackage({
        name,
        speed,
        price: parseFloat(price),
        dataLimit,
      });
    }
  };

  const FormField: React.FC<{ label: string; id: string; error?: string; children: React.ReactNode }> = ({ label, id, error, children }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="mt-1">
        {children}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Package Name" id="name" error={errors.name}>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="e.g., Fiber 100 Mbps"
        />
      </FormField>

      <FormField label="Speed (Download/Upload)" id="speed" error={errors.speed}>
        <input
          type="text"
          id="speed"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="e.g., 100/20 Mbps"
        />
      </FormField>

       <FormField label="Monthly Price (BDT)" id="price" error={errors.price}>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="e.g., 4999"
          step="0.01"
        />
      </FormField>

      <FormField label="Data Limit" id="dataLimit" error={errors.dataLimit}>
        <input
          type="text"
          id="dataLimit"
          value={dataLimit}
          onChange={(e) => setDataLimit(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </FormField>

      <div className="flex justify-end pt-4 space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
        >
          Add Package
        </button>
      </div>
    </form>
  );
};

export default AddPackageForm;