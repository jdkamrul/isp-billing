import React, { useState } from 'react';
import { Customer, Package } from '../types';
import { mockPackages } from '../data/mockData';

interface AddCustomerFormProps {
  onAddCustomer: (customer: Omit<Customer, 'id' | 'status' | 'joinDate' | 'onlineStatus'>) => void;
  onCancel: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onAddCustomer, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(mockPackages[0]?.name || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
    }
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!selectedPackage) newErrors.package = 'Package is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAddCustomer({
        name,
        email,
        phone,
        address,
        package: selectedPackage,
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
      <FormField label="Full Name" id="name" error={errors.name}>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </FormField>

      <FormField label="Email Address" id="email" error={errors.email}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </FormField>

       <FormField label="Phone Number" id="phone" error={errors.phone}>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </FormField>

      <FormField label="Address" id="address" error={errors.address}>
        <textarea
          id="address"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </FormField>

      <FormField label="Internet Package" id="package" error={errors.package}>
        <select
          id="package"
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(e.target.value)}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
            {mockPackages.map((pkg: Package) => (
                <option key={pkg.id} value={pkg.name}>
                    {pkg.name} - BDT {pkg.price}/mo
                </option>
            ))}
        </select>
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
          Add Customer
        </button>
      </div>
    </form>
  );
};

export default AddCustomerForm;