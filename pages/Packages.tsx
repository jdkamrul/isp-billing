import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { mockPackages } from '../data/mockData';
import { Package } from '../types';
import Modal from '../components/Modal';
import AddPackageForm from '../components/AddPackageForm';

const Packages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packages, setPackages] = useState<Package[]>(mockPackages);

  const handleAddPackage = (newPackageData: Omit<Package, 'id' | 'activeCustomers'>) => {
    const newPackage: Package = {
      ...newPackageData,
      id: `PKG${(packages.length + 1).toString().padStart(3, '0')}`,
      activeCustomers: 0,
    };
    setPackages([newPackage, ...packages]);
    setIsModalOpen(false);
    // In a real app, you would also send this to a backend API
    console.log('New package added:', newPackage);
  };

  const columns = [
    { header: 'Package Name', accessor: 'name' as keyof Package },
    { header: 'Speed (DL/UL)', accessor: 'speed' as keyof Package },
    { 
      header: 'Price', 
      accessor: 'price' as keyof Package,
      render: (pkg: Package) => `BDT ${pkg.price.toFixed(2)}/mo`
    },
    { header: 'Data Limit', accessor: 'dataLimit' as keyof Package },
    { header: 'Active Customers', accessor: 'activeCustomers' as keyof Package },
  ];

  return (
    <>
      <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Internet Packages</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
        >
          Add Package
        </button>
      </div>
      <DataTable title="Available Packages" columns={columns} data={packages} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Package">
        <AddPackageForm 
          onAddPackage={handleAddPackage}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default Packages;