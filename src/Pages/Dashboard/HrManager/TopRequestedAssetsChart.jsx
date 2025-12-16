import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const TopRequestedAssetsChart = ({ companyId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxiosSecure();

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(`/requests?companyId=${companyId}`);
      
      // Count requests per asset
      const assetCounts = {};
      
      response.forEach(request => {
        const assetName = request.assetName;
        if (assetCounts[assetName]) {
          assetCounts[assetName]++;
        } else {
          assetCounts[assetName] = 1;
        }
      });

      // Convert to array and sort by count (descending)
      const chartData = Object.entries(assetCounts)
        .map(([name, count]) => ({
          assetName: name,
          totalRequests: count
        }))
        .sort((a, b) => b.totalRequests - a.totalRequests)
        .slice(0, 5); // Take top 5

      setData(chartData);
      // console.log('✅ Bar chart data loaded:', chartData);
    } catch  {
      // console.error('❌ Error fetching bar chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].payload.assetName}</p>
          <p className="text-sm text-gray-600">
            Total Requests: <span className="font-bold text-blue-600">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-xl shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06393a]"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-lg">
        <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-gray-500 font-medium">No request data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Most Requested Assets
        </h2>
        <p className="text-gray-600">
          Top 5 assets by request count
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="assetName" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#666', fontSize: 12 }}
            label={{ value: 'Total Requests', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ paddingBottom: '20px' }}
          />
          <Bar 
            dataKey="totalRequests" 
            name="Total Requests"
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Rank</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Asset Name</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Requests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">{item.assetName}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-700">{item.totalRequests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insight Card */}
      {data.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Top Asset Insight</p>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-blue-600">{data[0].assetName}</span> is the most requested asset with{' '}
                <span className="font-bold text-blue-600">{data[0].totalRequests}</span> total requests.
                Consider increasing stock or improving availability.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRequestedAssetsChart;