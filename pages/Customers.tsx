import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { mockCustomers } from '../data/mockData';
import { Customer } from '../types';
import { PlusCircle, Upload, Download } from 'lucide-react';
import Modal from '../components/Modal';
import AddCustomerForm from '../components/AddCustomerForm';
import ImportCustomersModal from '../components/ImportCustomersModal';
import ExportCustomersModal from '../components/ExportCustomersModal';

const StatusBadge: React.FC<{ status: Customer['status'] }> = ({ status }) => {
    const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    const statusClasses = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const OnlineStatusIndicator: React.FC<{ status: Customer['onlineStatus'] }> = ({ status }) => (
    <span className="flex items-center">
        <span className={`h-2.5 w-2.5 rounded-full mr-2 ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
        <span className="capitalize">{status}</span>
    </span>
);


const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleAddCustomer = (newCustomerData: Omit<Customer, 'id' | 'status' | 'joinDate' | 'onlineStatus'>) => {
    const newCustomer: Customer = {
      ...newCustomerData,
      id: `CUST${(customers.length + 101).toString()}`,
      status: 'active',
      onlineStatus: 'offline',
      joinDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    setCustomers([newCustomer, ...customers]);
    setIsAddModalOpen(false);
    console.log('New customer added:', newCustomer);
  };

  const handleImportCustomers = (importedData: Omit<Customer, 'id' | 'status' | 'joinDate' | 'onlineStatus'>[]) => {
    const newCustomers = importedData.map((cust, index) => ({
        ...cust,
        id: `CUST-IMP-${(customers.length + index + 1)}`,
        status: 'active' as const,
        onlineStatus: 'offline' as const,
        joinDate: new Date().toISOString().split('T')[0],
    }));
    setCustomers(prev => [...newCustomers, ...prev]);
    setIsImportModalOpen(false);
    alert(`${newCustomers.length} customers imported successfully!`);
  }

  const generateCsv = () => {
    const headers = ['id', 'name', 'email', 'phone', 'package', 'status', 'joinDate', 'address'];
    const rows = customers.map(c => headers.map(h => `"${(c[h as keyof Customer] as string).replace(/"/g, '""')}"`).join(','));
    return [headers.join(','), ...rows].join('\n');
  };

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Customer },
    { header: 'Email', accessor: 'email' as keyof Customer },
    { header: 'Phone', accessor: 'phone' as keyof Customer },
    { header: 'Package', accessor: 'package' as keyof Customer },
    { 
      header: 'Status', 
      accessor: 'status' as keyof Customer,
      render: (customer: Customer) => <StatusBadge status={customer.status} />
    },
    { 
      header: 'Online Status', 
      accessor: 'onlineStatus' as keyof Customer,
      render: (customer: Customer) => <OnlineStatusIndicator status={customer.onlineStatus} />
    },
    { header: 'Join Date', accessor: 'joinDate' as keyof Customer },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Customers</h1>
          <div className="flex space-x-2">
            <button onClick={() => setIsImportModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" /> Import
            </button>
            <button onClick={() => setIsExportModalOpen(true)} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" /> Export
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              <PlusCircle className="h-5 w-5 mr-2" /> Add Customer
            </button>
          </div>
        </div>
        <DataTable title="All Customers" columns={columns} data={customers} />
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Customer">
        <AddCustomerForm 
          onAddCustomer={handleAddCustomer}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <ImportCustomersModal 
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportCustomers}
      />

      <ExportCustomersModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        csvData={generateCsv()}
        sheetUrl="https://docs.google.com/spreadsheets/d/simulated-export"
      />
    </>
  );
};

export default Customers;
