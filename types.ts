// This file was empty. Populating with type definitions.

export interface DashboardStats {
  totalRevenue: number;
  newCustomers: number;
  churnedCustomers: number;
  activeSubscriptions: number;
  arpu: number;
  topPackage: string;
  openTickets: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended' | 'inactive';
  onlineStatus: 'online' | 'offline';
  package: string;
  joinDate: string; // YYYY-MM-DD
  address: string;
}

export enum InvoiceStatus {
  Paid = 'Paid',
  Due = 'Due',
  Overdue = 'Overdue',
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  status: InvoiceStatus;
}

export interface Package {
  id: string;
  name: string;
  speed: string; // "100/20 Mbps"
  price: number;
  dataLimit: string;
  activeCustomers: number;
}

export type MikrotikServerStatus = 'active' | 'disabled';
export type MikrotikServerVersion = 'v6' | 'v7';

export interface MikrotikServer {
    id: string;
    name: string;
    host: string;
    api_port: number;
    username: string;
    password?: string;
    version: MikrotikServerVersion;
    timeout_seconds: number;
    status: MikrotikServerStatus;
    last_checked_at: string; // ISO 8601 string or similar
}


// Types for Remote Router Configuration
export interface NtpConfig {
    enabled: boolean;
    primaryServer: string;
    secondaryServer: string;
}

export interface DnsConfig {
    primaryServer: string;
    secondaryServer: string;
}

export interface FirewallRule {
    id: string;
    name: string;
    action: 'accept' | 'drop' | 'reject';
    protocol: 'tcp' | 'udp' | 'icmp' | 'any';
    srcAddress?: string;
    dstPort?: string;
    enabled: boolean;
}

export interface MikrotikConfig {
    identity: string;
    systemTime: string; // e.g., "14:30:00"
    systemDate: string; // e.g., "2024-07-30"
    ntp: NtpConfig;
    dns: DnsConfig;
    firewallRules: FirewallRule[];
}

export interface OnlineClient {
    id: string;
    username: string;
    ip_address: string;
    mac_address: string;
    server: string;
    uptime: string;
    download_speed: string;
    upload_speed: string;
}