import React, { useEffect, useMemo } from 'react';
import { DollarSign, Users, UserMinus, Wifi, BarChart2, Ticket, BrainCircuit } from 'lucide-react';
import StatCard from '../components/StatCard';
import { mockDashboardStats } from '../data/mockData';
import { useGemini } from '../hooks/useGemini';
import ReactMarkdown from 'react-markdown';

const Dashboard: React.FC = () => {
  // In a real app, this data would be fetched from an API
  const stats = mockDashboardStats;
  const { data: insights, isLoading, error, generate } = useGemini();

  useEffect(() => {
      generate(stats);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statCards = useMemo(() => [
    { title: 'Total Revenue', value: `BDT ${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign className="h-6 w-6 text-green-500" />, color: 'bg-green-100 dark:bg-green-900' },
    { title: 'New Customers', value: `+${stats.newCustomers}`, icon: <Users className="h-6 w-6 text-blue-500" />, color: 'bg-blue-100 dark:bg-blue-900' },
    { title: 'Churned Customers', value: `-${stats.churnedCustomers}`, icon: <UserMinus className="h-6 w-6 text-red-500" />, color: 'bg-red-100 dark:bg-red-900' },
    { title: 'Active Subscriptions', value: stats.activeSubscriptions.toLocaleString(), icon: <Wifi className="h-6 w-6 text-indigo-500" />, color: 'bg-indigo-100 dark:bg-indigo-900' },
    { title: 'ARPU', value: `BDT ${stats.arpu.toFixed(2)}`, icon: <BarChart2 className="h-6 w-6 text-yellow-500" />, color: 'bg-yellow-100 dark:bg-yellow-900' },
    { title: 'Open Tickets', value: stats.openTickets.toString(), icon: <Ticket className="h-6 w-6 text-orange-500" />, color: 'bg-orange-100 dark:bg-orange-900' },
  ], [stats]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map(card => <StatCard key={card.title} {...card} />)}
      </div>

      {/* AI Insights Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          <BrainCircuit className="h-6 w-6 mr-2 text-primary-500" />
          AI-Powered Insights
        </h2>
        <div className="mt-4 prose prose-sm dark:prose-invert max-w-none">
          {isLoading && <p>Generating insights...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {insights && <ReactMarkdown>{insights}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
