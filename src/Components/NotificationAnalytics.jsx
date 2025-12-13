// NotificationAnalytics.jsx
import React, { useState, useEffect } from 'react';
import useAxios from '../Hooks/useAxios';


const NotificationAnalytics = ({ companyId }) => {
  const [analytics, setAnalytics] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(`/notifications/company/${companyId}/analytics`);
      if (data.success) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error('❌ Error fetching analytics:', error);
    }
  };

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notification Analytics</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Notifications</p>
          <p className="text-2xl font-bold">{analytics.analytics.totalNotifications}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Reads</p>
          <p className="text-2xl font-bold">{analytics.analytics.totalReads}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Avg Reads/Notification</p>
          <p className="text-2xl font-bold">{analytics.analytics.avgReadsPerNotification}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Unread</p>
          <p className="text-2xl font-bold">{analytics.analytics.unreadNotifications}</p>
        </div>
      </div>

      {/* Detailed List */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Reads</th>
              <th className="px-4 py-3 text-left">Read By</th>
            </tr>
          </thead>
          <tbody>
            {analytics.notifications.map((notif) => (
              <tr key={notif._id} className="border-t">
                <td className="px-4 py-3">{notif.message}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(notif.date).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {notif.totalReads}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {notif.readers.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {notif.readers.map((reader, idx) => (
                        <span key={idx} className="text-sm text-gray-700">
                          {reader.name} ({reader.role})
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No reads yet</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationAnalytics;
