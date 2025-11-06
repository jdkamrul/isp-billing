import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import { mockMikrotikServers } from '../data/mockData';
import { MikrotikServer, MikrotikServerStatus } from '../types';
import { Server, Edit, Trash2, Plug, PlusCircle, Loader2, CheckCircle, XCircle, Cog } from 'lucide-react';
import Modal from '../components/Modal';
import AddMikrotikServerForm from '../components/AddMikrotikServerForm';
import ConfirmationModal from '../components/ConfirmationModal';


const StatusBadge: React.FC<{ status: MikrotikServerStatus }> = ({ status }) => {
    const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    const statusClasses = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        disabled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const MikrotikServers: React.FC = () => {
    const [servers, setServers] = useState<MikrotikServer[]>(mockMikrotikServers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingServer, setEditingServer] = useState<MikrotikServer | null>(null);
    const [serverToDelete, setServerToDelete] = useState<MikrotikServer | null>(null);
    const [testingConnection, setTestingConnection] = useState<{ id: string; status: 'testing' | 'success' | 'failed' } | null>(null);

    const handleOpenModalToAdd = () => {
        setEditingServer(null);
        setIsModalOpen(true);
    };

    const handleOpenModalToEdit = (server: MikrotikServer) => {
        setEditingServer(server);
        setIsModalOpen(true);
    };

    const handleDeleteServer = (server: MikrotikServer) => {
        setServerToDelete(server);
    };
    
    const confirmDelete = () => {
        if (serverToDelete) {
            setServers(currentServers => currentServers.filter(s => s.id !== serverToDelete.id));
            setServerToDelete(null);
        }
    };

    const handleTestConnection = (server: MikrotikServer) => {
        setTestingConnection({ id: server.id, status: 'testing' });
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% chance of success
            setTestingConnection({ id: server.id, status: success ? 'success' : 'failed' });
            setTimeout(() => setTestingConnection(null), 2500);
        }, 1500);
    };

    const handleSaveServer = async (serverData: Omit<MikrotikServer, 'id' | 'last_checked_at'>) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        if (editingServer) {
            const updatedServer: MikrotikServer = {
                ...editingServer,
                ...serverData,
                last_checked_at: now,
            };
            setServers(servers.map(s => s.id === editingServer.id ? updatedServer : s));
        } else {
            const newServer: MikrotikServer = {
                ...serverData,
                id: `MKT${(Date.now()).toString(16).slice(-4).toUpperCase()}`,
                last_checked_at: now,
            };
            setServers([newServer, ...servers]);
        }
        setIsModalOpen(false);
        setEditingServer(null);
    };

    const columns = [
        { header: 'Name', accessor: 'name' as keyof MikrotikServer },
        { header: 'Host', accessor: 'host' as keyof MikrotikServer },
        { header: 'API Port', accessor: 'api_port' as keyof MikrotikServer },
        { header: 'Version', accessor: 'version' as keyof MikrotikServer },
        {
            header: 'Status',
            accessor: 'status' as keyof MikrotikServer,
            render: (server: MikrotikServer) => <StatusBadge status={server.status} />
        },
        { header: 'Last Checked', accessor: 'last_checked_at' as keyof MikrotikServer },
        {
            header: 'Actions',
            accessor: 'id' as keyof MikrotikServer,
            render: (server: MikrotikServer) => {
                const testStatus = testingConnection?.id === server.id ? testingConnection.status : null;

                return (
                    <div className="flex space-x-2 items-center">
                        <Link to={`/mikrotik-servers/${server.id}/manage`} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" title="Manage & Configure">
                            <Cog className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </Link>
                        <button onClick={() => handleOpenModalToEdit(server)} className="p-1 rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-900" title="Edit Server Entry">
                            <Edit className="h-4 w-4 text-yellow-600" />
                        </button>
                        <button 
                            onClick={() => handleTestConnection(server)} 
                            className="p-1 w-6 h-6 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 disabled:opacity-50 disabled:cursor-wait" 
                            title="Test Connection"
                            disabled={!!testStatus}
                        >
                            {testStatus === 'testing' && <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />}
                            {testStatus === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                            {testStatus === 'failed' && <XCircle className="h-4 w-4 text-red-600" />}
                            {!testStatus && <Plug className="h-4 w-4 text-blue-600" />}
                        </button>
                        <button onClick={() => handleDeleteServer(server)} className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900" title="Delete">
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                    </div>
                )
            }
        }
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center"><Server className="mr-3 h-8 w-8"/>MikroTik Servers</h1>
                    <button
                        onClick={handleOpenModalToAdd}
                        className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                    >
                        <PlusCircle className="h-5 w-5 mr-2" />
                        Add Server
                    </button>
                </div>
                <DataTable title="Configured RouterOS Servers" columns={columns} data={servers} />
            </div>

            <ConfirmationModal
                isOpen={!!serverToDelete}
                onClose={() => setServerToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Server Confirmation"
                message={`Are you sure you want to delete the server "${serverToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete Server"
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingServer ? "Edit MikroTik Server" : "Add New MikroTik Server"}>
                <AddMikrotikServerForm
                    onSave={handleSaveServer}
                    onCancel={() => setIsModalOpen(false)}
                    serverToEdit={editingServer}
                />
            </Modal>
        </>
    );
};

export default MikrotikServers;