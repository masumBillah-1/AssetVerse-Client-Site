import React, { useState, useEffect } from 'react';
import { Bell, Eye, Users, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import useAxios from '../Hooks/useAxios';

const NotificationAnalytics = ({ companyId }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    if (companyId) {
      fetchAnalytics();
    }
  }, [companyId]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/notifications/company/${companyId}/analytics`);
      if (data.success) {
        setAnalytics(data);
        console.log('✅ Analytics loaded:', data);
      }
    } catch (error) {
      console.error('❌ Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-xl shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06393a]"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-lg">
        <Bell className="w-24 h-24 text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">No analytics data available</p>
      </div>
    );
  }

  const { totalNotifications, totalReads, avgReadsPerNotification, unreadNotifications } = analytics.analytics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#06393a] to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Notification Analytics</h2>
            <p className="text-teal-100">Company-wide engagement overview</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Notifications</p>
          <p className="text-3xl font-bold text-blue-600">{totalNotifications}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Reads</p>
          <p className="text-3xl font-bold text-green-600">{totalReads}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg Reads/Notification</p>
          <p className="text-3xl font-bold text-purple-600">{avgReadsPerNotification}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Unread</p>
          <p className="text-3xl font-bold text-orange-600">{unreadNotifications}</p>
        </div>
      </div>

      {/* Detailed Notifications Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-[#06393a]">Notification Details</h3>
          <p className="text-gray-600 text-sm mt-1">View who read each notification</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Message</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Reads</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Read By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analytics.notifications.map((notif) => (
                <tr key={notif._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800 text-sm">{notif.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      notif.notificationType === 'asset_added' 
                        ? 'bg-blue-100 text-blue-700'
                        : notif.notificationType === 'asset_request'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {notif.notificationType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(notif.date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {notif.totalReads > 0 ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        notif.totalReads > 0 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {notif.totalReads}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {notif.readers.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {notif.readers.map((reader, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#06393a] to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {reader.name.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-700">
                              {reader.name}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              reader.role === 'hr' 
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {reader.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">No reads yet</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {analytics.notifications.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-16 h-16 mx-auto mb-3 opacity-20" />
            <p className="font-medium">No notifications found</p>
          </div>
        )}
      </div>

      {/* Engagement Insight */}
      {analytics.notifications.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Engagement Insights</h4>
              <p className="text-sm text-gray-700 mb-2">
                Out of <span className="font-bold text-blue-600">{totalNotifications}</span> notifications sent, 
                <span className="font-bold text-green-600"> {totalReads}</span> have been read.
                {unreadNotifications > 0 && (
                  <> There are still <span className="font-bold text-orange-600">{unreadNotifications}</span> unread notifications.</>
                )}
              </p>
              <p className="text-sm text-gray-600">
                Average engagement rate: <span className="font-bold">{avgReadsPerNotification} reads per notification</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationAnalytics;