// This file was empty. Populating with OnlineClientsMonitoring page component.
import React from 'react';
import DataTable from '../components/DataTable';
// Fix: Imported OnlineClient type from types.ts instead of onlineClientsData.ts.
import { onlineClientsData } from '../data/onlineClientsData';
import { OnlineClient } from '../types';
import { Wifi, Search, XCircle } from 'lucide-react';

const OnlineClientsMonitoring: React.FC = () => {
    // In a real app, this data would be fetched live and updated via WebSocket or polling
    const [clients, setClients] = React.useState<OnlineClient[]>(onlineClientsData);
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredClients = clients.filter(client =>
        Object.values(client).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleKickUser = (client: OnlineClient) => {
        alert(`Simulating kicking user: ${client.username} from server ${client.server}`);
        // Here you would call an API to disconnect the user
    };

    const columns = [
        { header: 'Username', accessor: 'username' as keyof OnlineClient },
        { header: 'IP Address', accessor: 'ip_address' as keyof OnlineClient },
        { header: 'MAC Address', accessor: 'mac_address' as keyof OnlineClient },
        { header: 'Server', accessor: 'server' as keyof OnlineClient },
        { header: 'Uptime', accessor: 'uptime' as keyof OnlineClient },
        { header: 'Download', accessor: 'download_speed' as keyof OnlineClient },
        { header: 'Upload', accessor: 'upload_speed' as keyof OnlineClient },
        {
            header: 'Actions',
            accessor: 'id' as keyof OnlineClient,
            render: (client: OnlineClient) => (
                <button
                    onClick={() => handleKickUser(client)}
                    className="flex items-center text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Disconnect User"
                >
                    <XCircle className="h-4 w-4 mr-1" />
                    Kick
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                    <Wifi className="mr-3 h-8 w-8" />
                    Online Clients Monitoring
                </h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Displaying real-time data of active PPPoE or Hotspot clients. Data is for demonstration purposes.
            </p>
            <DataTable title={`Online Clients (${filteredClients.length})`} columns={columns} data={filteredClients} />
        </div>
    );
};

export default OnlineClientsMonitoring;