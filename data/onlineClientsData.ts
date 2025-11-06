import { OnlineClient } from '../types';

export const onlineClientsData: OnlineClient[] = [
    { id: 'cl1', username: 'john.doe', ip_address: '10.5.50.112', mac_address: 'AA:BB:CC:11:22:33', server: 'Main POP', uptime: '2h 15m', download_speed: '12.5 Mbps', upload_speed: '2.1 Mbps' },
    { id: 'cl2', username: 'charlie.b', ip_address: '10.5.50.115', mac_address: 'BB:CC:DD:22:33:44', server: 'Main POP', uptime: '1d 4h 30m', download_speed: '85.2 Mbps', upload_speed: '15.7 Mbps' },
    { id: 'cl3', username: 'testuser1', ip_address: '172.16.10.5', mac_address: 'CC:DD:EE:33:44:55', server: 'Branch Office 1', uptime: '5h 2m', download_speed: '5.6 Mbps', upload_speed: '0.8 Mbps' },
];
