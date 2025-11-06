import React, { useState } from 'react';
import { Wifi, Server } from 'lucide-react';
import OnlineClientsView from '../components/views/OnlineClientsView';
import MikrotikServersView from '../components/views/MikrotikServersView';

type Tab = 'clients' | 'servers';

const RouterControls: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('clients');

    const TabButton: React.FC<{ tabName: Tab; label: string; icon: React.ReactNode }> = ({ tabName, label, icon }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none ${
                activeTab === tabName
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </button>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Router Controls</h1>
            
            <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                <TabButton tabName="clients" label="Online Clients Monitoring" icon={<Wifi className="h-5 w-5" />} />
                <TabButton tabName="servers" label="Server Management" icon={<Server className="h-5 w-5" />} />
            </div>

            <div className="mt-4">
                {activeTab === 'clients' && <OnlineClientsView />}
                {activeTab === 'servers' && <MikrotikServersView />}
            </div>
        </div>
    );
};

export default RouterControls;
