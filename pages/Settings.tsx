import React from 'react';

const Settings: React.FC = () => {

  const FormField: React.FC<{ label: string; id: string; children: React.ReactNode; description?: string }> = ({ label, id, children, description }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="md:col-span-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <div className="md:col-span-2 mt-1 md:mt-0">
        {children}
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>

      {/* General Settings */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">General</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage your organization's general settings.</p>

        <FormField label="Company Name" id="companyName" description="The name of your ISP business.">
          <input type="text" id="companyName" defaultValue="ISP Admin Inc." className="block w-full max-w-md px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </FormField>
        
        <FormField label="Default Currency" id="currency" description="The default currency for billing and reports.">
          <select id="currency" className="block w-full max-w-md px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
            <option>BDT - Bangladeshi Taka</option>
            <option>USD - US Dollar</option>
            <option>EUR - Euro</option>
          </select>
        </FormField>
      </div>
      
      {/* Billing Settings */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Billing</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Configure invoicing and payment gateway settings.</p>

        <FormField label="Invoice Due Date" id="invoiceDue" description="Number of days after issue date that an invoice is due.">
          <input type="number" id="invoiceDue" defaultValue="15" className="block w-full max-w-xs px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </FormField>

        <FormField label="Late Fee" id="lateFee" description="A flat fee or percentage to apply to overdue invoices.">
          <div className="flex items-center space-x-2">
            <input type="number" id="lateFeeValue" defaultValue="5" className="block w-24 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
            <select id="lateFeeType" className="block px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
              <option value="percentage">% (Percentage)</option>
              <option value="flat">BDT (Flat Fee)</option>
            </select>
          </div>
        </FormField>
      </div>

      {/* API Integrations */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">API Integrations</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage API keys for third-party services.</p>

        <FormField label="Gemini API Key" id="geminiApiKey" description="Used for AI-powered insights on the dashboard.">
           <input type="password" id="geminiApiKey" placeholder="••••••••••••••••••••••••••" disabled className="block w-full max-w-md px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
           <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Note: The API Key is managed via environment variables and cannot be changed here.</p>
        </FormField>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;