import { Customer, Invoice, InvoiceStatus, Package, DashboardStats, MikrotikServer, MikrotikConfig } from '../types';

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 525000,
  newCustomers: 25,
  churnedCustomers: 5,
  activeSubscriptions: 450,
  arpu: 1166.67,
  topPackage: 'Fiber 100 Mbps',
  openTickets: 12,
};

export const mockPackages: Package[] = [
  { id: 'PKG001', name: 'Fiber 100 Mbps', speed: '100/20 Mbps', price: 1200, dataLimit: 'Unlimited', activeCustomers: 200 },
  { id: 'PKG002', name: 'Fiber 200 Mbps', speed: '200/50 Mbps', price: 1800, dataLimit: 'Unlimited', activeCustomers: 150 },
  { id: 'PKG003', name: 'Fiber 50 Mbps', speed: '50/10 Mbps', price: 800, dataLimit: 'Unlimited', activeCustomers: 80 },
  { id: 'PKG004', name: 'Fiber 1 Gbps', speed: '1000/200 Mbps', price: 4000, dataLimit: 'Unlimited', activeCustomers: 20 },
];

export const mockCustomers: Customer[] = [
  { id: 'CUST001', name: 'John Doe', email: 'john.doe@example.com', phone: '555-0100', status: 'active', onlineStatus: 'online', package: 'Fiber 100 Mbps', joinDate: '2023-05-15', address: '123 Main St, Anytown' },
  { id: 'CUST002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-0101', status: 'active', onlineStatus: 'offline', package: 'Fiber 200 Mbps', joinDate: '2022-11-20', address: '456 Oak Ave, Somecity' },
  { id: 'CUST003', name: 'Bob Johnson', email: 'bob.j@example.com', phone: '555-0102', status: 'suspended', onlineStatus: 'offline', package: 'Fiber 50 Mbps', joinDate: '2023-01-10', address: '789 Pine Ln, Otherville' },
  { id: 'CUST004', name: 'Alice Williams', email: 'alice.w@example.com', phone: '555-0103', status: 'inactive', onlineStatus: 'offline', package: 'Fiber 100 Mbps', joinDate: '2021-08-01', address: '101 Maple Dr, Newplace' },
  { id: 'CUST005', name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '555-0104', status: 'active', onlineStatus: 'online', package: 'Fiber 1 Gbps', joinDate: '2023-09-30', address: '212 Birch Rd, Oldtown' },
];

export const mockInvoices: Invoice[] = [
  { id: 'INV-2024-001', customerId: 'CUST001', customerName: 'John Doe', amount: 1200, issueDate: '2024-07-01', dueDate: '2024-07-15', status: InvoiceStatus.Paid },
  { id: 'INV-2024-002', customerId: 'CUST002', customerName: 'Jane Smith', amount: 1800, issueDate: '2024-07-01', dueDate: '2024-07-15', status: InvoiceStatus.Due },
  { id: 'INV-2024-003', customerId: 'CUST003', customerName: 'Bob Johnson', amount: 800, issueDate: '2024-06-01', dueDate: '2024-06-15', status: InvoiceStatus.Overdue },
  { id: 'INV-2024-004', customerId: 'CUST005', customerName: 'Charlie Brown', amount: 4000, issueDate: '2024-07-05', dueDate: '2024-07-20', status: InvoiceStatus.Due },
];

export const mockMikrotikServers: MikrotikServer[] = [
  { id: 'MKT001', name: 'Main POP', host: '192.168.88.1', api_port: 8728, username: 'admin', version: 'v7', timeout_seconds: 10, status: 'active', last_checked_at: '2024-07-30 10:00:00' },
  { id: 'MKT002', name: 'Branch Office 1', host: 'router.branch1.isp.com', api_port: 8728, username: 'admin', version: 'v6', timeout_seconds: 15, status: 'active', last_checked_at: '2024-07-30 10:05:00' },
  { id: 'MKT003', name: 'Backup Server', host: '10.0.0.2', api_port: 8728, username: 'readonly', version: 'v7', timeout_seconds: 10, status: 'disabled', last_checked_at: '2024-07-29 15:30:00' },
];

export const mockMikrotikConfigs: Record<string, MikrotikConfig> = {
  'MKT001': {
    identity: 'Main-POP-Router',
    systemTime: '10:15:30',
    systemDate: '2024-07-30',
    ntp: { enabled: true, primaryServer: 'time.google.com', secondaryServer: 'pool.ntp.org' },
    dns: { primaryServer: '8.8.8.8', secondaryServer: '8.8.4.4' },
    firewallRules: [
      { id: 'fw1', name: 'Allow Winbox', action: 'accept', protocol: 'tcp', dstPort: '8291', enabled: true },
      { id: 'fw2', name: 'Drop Invalid', action: 'drop', protocol: 'any', enabled: true },
    ]
  },
  'MKT002': {
    identity: 'Branch-1-Router',
    systemTime: '10:16:00',
    systemDate: '2024-07-30',
    ntp: { enabled: false, primaryServer: '', secondaryServer: '' },
    dns: { primaryServer: '1.1.1.1', secondaryServer: '1.0.0.1' },
    firewallRules: [
       { id: 'fw3', name: 'Block Ping', action: 'drop', protocol: 'icmp', enabled: false },
    ]
  },
  'MKT003': {
    identity: 'Backup-Router-Config',
    systemTime: '11:00:00',
    systemDate: '2024-07-30',
    ntp: { enabled: true, primaryServer: 'time.google.com', secondaryServer: 'pool.ntp.org' },
    dns: { primaryServer: '8.8.8.8', secondaryServer: '1.1.1.1' },
    firewallRules: []
  },
};
