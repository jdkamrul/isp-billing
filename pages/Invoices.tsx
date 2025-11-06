import React from 'react';
import DataTable from '../components/DataTable';
import { mockInvoices } from '../data/mockData';
import { Invoice, InvoiceStatus } from '../types';

const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
    const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    const statusClasses = {
        [InvoiceStatus.Paid]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        [InvoiceStatus.Due]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        [InvoiceStatus.Overdue]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const Invoices: React.FC = () => {
  const columns = [
    { header: 'Invoice ID', accessor: 'id' as keyof Invoice },
    { header: 'Customer Name', accessor: 'customerName' as keyof Invoice },
    { 
      header: 'Amount', 
      accessor: 'amount' as keyof Invoice,
      render: (invoice: Invoice) => `BDT ${invoice.amount.toFixed(2)}`
    },
    { header: 'Issue Date', accessor: 'issueDate' as keyof Invoice },
    { header: 'Due Date', accessor: 'dueDate' as keyof Invoice },
    { 
      header: 'Status', 
      accessor: 'status' as keyof Invoice,
      render: (invoice: Invoice) => <StatusBadge status={invoice.status} />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Invoices</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50">
          Create Invoice
        </button>
      </div>
      <DataTable title="All Invoices" columns={columns} data={mockInvoices} />
    </div>
  );
};

export default Invoices;