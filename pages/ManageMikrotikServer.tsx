import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockMikrotikServers, mockMikrotikConfigs } from '../data/mockData';
import { MikrotikConfig, MikrotikServer, FirewallRule } from '../types';
// Fix: Replaced non-existent 'Dns' icon with 'Database' icon.
import { ChevronLeft, Clock, Database, Network, ShieldCheck, Loader2, Save } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import ToggleSwitch from '../components/ToggleSwitch';

// A reusable card component for settings sections
const SettingsCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center mb-4">
            {icon}
            <span className="ml-2">{title}</span>
        </h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

// A reusable form field component
const FormField: React.FC<{ label: string; id: string; children: React.ReactNode }> = ({ label, id, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
        </label>
        <div className="md:col-span-2">
            {children}
        </div>
    </div>
);

const ManageMikrotikServer: React.FC = () => {
    const { serverId } = useParams<{ serverId: string }>();
    const navigate = useNavigate();
    const [server, setServer] = useState<MikrotikServer | null>(null);
    const [config, setConfig] = useState<MikrotikConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    useEffect(() => {
        // Simulate fetching data
        setIsLoading(true);
        setTimeout(() => {
            const foundServer = mockMikrotikServers.find(s => s.id === serverId);
            const foundConfig = serverId ? mockMikrotikConfigs[serverId] : null;
            if (foundServer && foundConfig) {
                setServer(foundServer);
                setConfig(JSON.parse(JSON.stringify(foundConfig))); // Deep copy to allow edits
            } else {
                // Handle not found case
                navigate('/router-controls');
            }
            setIsLoading(false);
        }, 500);
    }, [serverId, navigate]);

    const handleConfigChange = (section: keyof MikrotikConfig, key: string, value: any) => {
        setConfig(prevConfig => {
            if (!prevConfig) return null;
            const newConfig = { ...prevConfig };
            (newConfig[section] as any)[key] = value;
            return newConfig;
        });
    };

    const handleFirewallRuleToggle = (ruleId: string, enabled: boolean) => {
        setConfig(prevConfig => {
            if (!prevConfig) return null;
            return {
                ...prevConfig,
                firewallRules: prevConfig.firewallRules.map(rule =>
                    rule.id === ruleId ? { ...rule, enabled } : rule
                )
            };
        });
    };

    const handleApplyChanges = async () => {
        setIsSaving(true);
        // Simulate API call to apply changes
        console.log("Applying new configuration:", config);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        alert(`Configuration for ${server?.name} applied successfully!`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
            </div>
        );
    }

    if (!server || !config) {
        return <p>Server not found.</p>;
    }

    return (
        <>
            <div className="space-y-6">
                {/* Breadcrumbs and Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                     <div>
                        <nav className="text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
                            <ol className="list-none p-0 inline-flex space-x-2">
                                <li><Link to="/router-controls" className="hover:underline">Router Controls</Link></li>
                                <li><span>&gt;</span></li>
                                <li className="font-medium text-gray-700 dark:text-gray-200">Manage Configuration</li>
                            </ol>
                        </nav>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                            {server.name}
                        </h1>
                    </div>
                    <button onClick={() => navigate('/router-controls')} className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Router Controls
                    </button>
                </div>
                
                {/* Configuration Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SettingsCard title="System & Time" icon={<Clock className="h-5 w-5" />}>
                        <FormField label="Router Identity" id="identity">
                             <input type="text" id="identity" value={config.identity} onChange={e => setConfig({...config, identity: e.target.value})} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </FormField>
                         <FormField label="System Date" id="systemDate">
                             <input type="date" id="systemDate" value={config.systemDate} onChange={e => setConfig({...config, systemDate: e.target.value})} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </FormField>
                        <FormField label="System Time" id="systemTime">
                             <input type="time" id="systemTime" value={config.systemTime} onChange={e => setConfig({...config, systemTime: e.target.value})} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </FormField>
                    </SettingsCard>

                    <SettingsCard title="NTP Client" icon={<Network className="h-5 w-5" />}>
                        <FormField label="Enable NTP Client" id="ntpEnabled">
                           <ToggleSwitch enabled={config.ntp.enabled} onChange={val => handleConfigChange('ntp', 'enabled', val)} />
                        </FormField>
                        <FormField label="Primary Server" id="ntpPrimary">
                           <input type="text" id="ntpPrimary" value={config.ntp.primaryServer} onChange={e => handleConfigChange('ntp', 'primaryServer', e.target.value)} disabled={!config.ntp.enabled} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm disabled:opacity-50" />
                        </FormField>
                        <FormField label="Secondary Server" id="ntpSecondary">
                           <input type="text" id="ntpSecondary" value={config.ntp.secondaryServer} onChange={e => handleConfigChange('ntp', 'secondaryServer', e.target.value)} disabled={!config.ntp.enabled} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm disabled:opacity-50" />
                        </FormField>
                    </SettingsCard>

                     {/* Fix: Replaced non-existent 'Dns' icon with 'Database' icon. */}
                     <SettingsCard title="DNS Servers" icon={<Database className="h-5 w-5" />}>
                        <FormField label="Primary DNS" id="dnsPrimary">
                           <input type="text" id="dnsPrimary" value={config.dns.primaryServer} onChange={e => handleConfigChange('dns', 'primaryServer', e.target.value)} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </FormField>
                         <FormField label="Secondary DNS" id="dnsSecondary">
                           <input type="text" id="dnsSecondary" value={config.dns.secondaryServer} onChange={e => handleConfigChange('dns', 'secondaryServer', e.target.value)} className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </FormField>
                    </SettingsCard>
                    
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center mb-4"><ShieldCheck className="h-5 w-5" /><span className="ml-2">Firewall Rules</span></h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rule</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Protocol</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Port</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Enabled</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                    {config.firewallRules.map(rule => (
                                        <tr key={rule.id}>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">{rule.name}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm uppercase">{rule.protocol}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">{rule.dstPort || 'any'}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm capitalize">{rule.action}</td>
                                            <td className="px-4 py-2 text-center">
                                                <ToggleSwitch enabled={rule.enabled} onChange={val => handleFirewallRuleToggle(rule.id, val)} />
                                            </td>
                                        </tr>
                                    ))}
                                    {config.firewallRules.length === 0 && (
                                      <tr><td colSpan={5} className="text-center py-4 text-sm text-gray-500">No firewall rules configured.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={() => setIsConfirmModalOpen(true)}
                        disabled={isSaving}
                        className="flex items-center justify-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 disabled:opacity-50"
                    >
                       {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                       {isSaving ? 'Applying...' : 'Apply Changes'}
                    </button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleApplyChanges}
                title="Apply Configuration"
                message={`Are you sure you want to apply these changes to the router "${server.name}"? This could affect network connectivity.`}
                confirmText="Yes, Apply"
            />
        </>
    );
};

export default ManageMikrotikServer;