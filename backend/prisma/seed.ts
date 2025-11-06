// This file was empty. Populating with mock backend Prisma seed script.
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  const hashedPassword = await bcrypt.hash('password', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // Seed Packages
  const packages = [
      { id: 'PKG001', name: 'Fiber 100 Mbps', speed: '100/20 Mbps', price: 1200, dataLimit: 'Unlimited' },
      { id: 'PKG002', name: 'Fiber 200 Mbps', speed: '200/50 Mbps', price: 1800, dataLimit: 'Unlimited' },
      { id: 'PKG003', name: 'Fiber 50 Mbps', speed: '50/10 Mbps', price: 800, dataLimit: 'Unlimited' },
      { id: 'PKG004', name: 'Fiber 1 Gbps', speed: '1000/200 Mbps', price: 4000, dataLimit: 'Unlimited' },
  ];
  for (const pkg of packages) {
      await prisma.package.upsert({
          where: { id: pkg.id },
          update: {},
          create: pkg,
      });
  }
  console.log(`Seeded ${packages.length} packages.`);

  // Seed Customers
  const customers = [
    { id: 'CUST001', name: 'John Doe', email: 'john.doe@example.com', phone: '555-0100', status: 'ACTIVE', packageId: 'PKG001', address: '123 Main St, Anytown' },
    { id: 'CUST002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-0101', status: 'ACTIVE', packageId: 'PKG002', address: '456 Oak Ave, Somecity' },
    { id: 'CUST003', name: 'Bob Johnson', email: 'bob.j@example.com', phone: '555-0102', status: 'SUSPENDED', packageId: 'PKG003', address: '789 Pine Ln, Otherville' },
  ];

  for (const customer of customers) {
      await prisma.customer.upsert({
          where: { id: customer.id },
          update: {},
          create: customer,
      });
  }
  console.log(`Seeded ${customers.length} customers.`);

  // Seed MikroTik Servers
  const mikrotikServers = [
    { name: 'My Main Router', host: '180.149.232.33', api_port: 1111, username: 'admin', password: '13579', version: 'V7', status: 'ACTIVE', timeout_seconds: 10 },
    { name: 'Main POP', host: '192.168.88.1', api_port: 8728, username: 'admin', password: 'password', version: 'V7', status: 'ACTIVE', timeout_seconds: 10 },
    { name: 'Branch Office 1', host: 'router.branch1.isp.com', api_port: 8728, username: 'admin', password: 'password', version: 'V6', status: 'ACTIVE', timeout_seconds: 15 },
    { name: 'Backup Server', host: '10.0.0.2', api_port: 8728, username: 'readonly', password: 'password', version: 'V7', status: 'DISABLED', timeout_seconds: 10 },
  ];

  for(const server of mikrotikServers) {
      const encryptedPassword = await bcrypt.hash(server.password, 10);
      await prisma.mikrotikServer.upsert({
          where: { host: server.host },
          update: { ...server, password: encryptedPassword },
          create: { ...server, password: encryptedPassword },
      });
  }
  console.log(`Seeded ${mikrotikServers.length} MikroTik servers.`);


  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })