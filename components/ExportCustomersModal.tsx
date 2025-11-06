import React from 'react';
import Modal from './Modal';
import { CheckCircle, Copy } from 'lucide-react';

interface ExportCustomersModalProps {
  isOpen: boolean;
  onClose: () => void;
  csvData: string;
  sheetUrl: string;
}

const ExportCustomersModal: React.FC<ExportCustomersModalProps> = ({ isOpen, onClose, csvData, sheetUrl }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(csvData);
    alert('CSV data copied to clipboard!');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Successful">
      <div className="space-y-4">
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-6 w-6 mr-2" />
          <p className="font-semibold">Customer data has been prepared for export.</p>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Google Sheet Link
            </label>
            <div className="mt-1">
                <a 
                    href={sheetUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                    View your exported data in Google Sheets
                </a>
                <p className="text-xs text-gray-500 mt-1">(This is a simulated link for demonstration purposes)</p>
            </div>
        </div>

        <div>
            <label htmlFor="csv-data" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                CSV Data
            </label>
            <div className="relative mt-1">
                <textarea
                    id="csv-data"
                    readOnly
                    value={csvData}
                    rows={8}
                    className="block w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm font-mono"
                />
                <button 
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-1.5 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    title="Copy to Clipboard"
                >
                    <Copy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
            </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportCustomersModal;
