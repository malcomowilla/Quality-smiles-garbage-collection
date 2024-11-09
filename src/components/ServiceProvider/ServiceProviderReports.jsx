import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { format } from 'date-fns';
import { IoFilterSharp, IoCalendarOutline, IoDownloadOutline } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ServiceProviderReports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [reportData, setReportData] = useState({
    performanceData: [],
    serviceDistribution: [],
    stats: {
      total_providers: 0,
      average_rating: 0,
      completion_rate: 0,
      provider_change: '0%',
      rating_change: '0',
      completion_change: '0%'
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/service_provider_reports?date_range=${dateRange}&metric=${selectedMetric}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch report data');
        }

        const data = await response.json();
        setReportData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [dateRange, selectedMetric]);

  if (loading) {
    return <div className="p-6 text-center">Loading reports...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 dark:bg-white bg-black min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white dark:text-black mb-2">
          Service Provider Reports
        </h1>
        <p className="text-white dark:text-black font-extralight">
          Comprehensive analytics and performance metrics
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-xl bg-white dark:bg-gray-800"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#22c55e" />
              <Bar dataKey="cancelled" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-xl bg-white dark:bg-gray-800"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData.serviceDistribution}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {reportData.serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceProviderReports; 