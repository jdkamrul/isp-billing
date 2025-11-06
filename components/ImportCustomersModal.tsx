import React, { useState } from 'react';
import Modal from './Modal';
import { Customer } from '../types';

interface ImportCustomersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (customers: Omit<Customer, 'id' | 'status' | 'joinDate' | 'onlineStatus'>[]) => void;
}

// Mock data to simulate fetching from a Google Sheet
const mockSheetData: Omit<Customer, 'id' | 'status' | 'joinDate' | 'onlineStatus'>[] = [
  { name: 'Grace Hopper', email: 'grace@example.com', phone: '555-0106', package: 'Fiber 300 Mbps', address: '1 Navy St' },
  { name: 'Alan Turing', email: 'alan@example.com', phone: '555-0107', package: 'Fiber 1 Gbps', address: '2 Bletchley Park' },
  { name: 'Ada Lovelace', email: 'ada@example.com', phone: '555-0108', package: 'Fiber 100 Mbps', address: '3 Enchantress Ave' },
];

const ImportCustomersModal: React.FC<ImportCustomersModalProps> = ({ isOpen, onClose, onImport }) => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImportClick = () => {
    if (!sheetUrl) {
      alert("Please enter a Google Sheet URL.");
      return;
    }
    setIsLoading(true);
    
    // In a real application, this would be an API call to a backend service
    // that fetches and parses the Google Sheet data.
    // Here, we simulate the process with a delay.
    setTimeout(() => {
      console.log(`Simulating import from: ${sheetUrl}`);
      onImport(mockSheetData);
      setIsLoading(false);
      setSheetUrl('');
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Customers from Google Sheets">
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Instructions:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ensure your Google Sheet is public or shared with the service account. The first row should be a header with the following columns in any order:
          </p>
          <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs mt-2">
            name, email, phone, package, address
          </code>
        </div>
        
        <div>
          <label htmlFor="sheetUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Google Sheet URL
          </label>
          <input
            type="url"
            id="sheetUrl"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end pt-4 space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImportClick}
            disabled={isLoading}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'Importing...' : 'Import'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportCustomersModal;