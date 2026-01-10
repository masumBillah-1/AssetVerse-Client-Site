import React, { useState, useEffect } from 'react';
import { Bell, Eye, Users, TrendingUp, Clock, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const NotificationAnalytics = ({ companyId }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openNotifications, setOpenNotifications] = useState(new Set());
  const axios = useAxiosSecure();

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
        // console.log('✅ Analytics loaded:', data);
      }
    } catch  {
      // console.error('❌ Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNotification = (id) => {
    setOpenNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDeleteNotification = async (notificationId) => {
    const confirmed = confirm('Are you sure you want to delete this notification?');
    if (!confirmed) return;

    try {
      await axios.delete(`/notifications/${notificationId}`);
      
      setAnalytics(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n._id !== notificationId),
        analytics: {
          ...prev.analytics,
          totalNotifications: prev.analytics.totalNotifications - 1
        }
      }));

      // console.log('✅ Notification deleted');
    } catch (error) {
      // console.error('❌ Error deleting notification:', error);
      alert('Failed to delete notification. Please try again.');
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

  // ✅ FIXED: Remove duplicate notifications by unique _id
  const uniqueNotifications = analytics.notifications.reduce((acc, current) => {
    const exists = acc.find(item => item._id === current._id);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);

  // console.log('✅ Unique notifications:', uniqueNotifications.length);
  // console.log('📊 All notification types:', uniqueNotifications.map(n => n.notificationType));

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
          <p className="text-3xl font-bold text-blue-600">{uniqueNotifications.length}</p>
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

      {/* Accordion Notifications - All Types */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-[#06393a]">All Notifications</h3>
          <p className="text-gray-600 text-xs mt-1">
            View all company notifications ({uniqueNotifications.length} items)
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {uniqueNotifications.length > 0 ? (
            uniqueNotifications.map((notif) => {
              const isOpen = openNotifications.has(notif._id);
              
              return (
                <div key={notif._id} className="border-b border-gray-100">
                  {/* Accordion Header */}
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleNotification(notif._id)}
                      className="flex-1 px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition"
                    >
                      {/* Icon */}
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="w-4 h-4 text-blue-600" />
                      </div>

                      {/* Message */}
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{notif.message}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500">
                            {new Date(notif.date).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Read Count Badge */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {notif.totalReads > 0 ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          notif.totalReads > 0 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {notif.totalReads}
                        </span>
                      </div>

                      {/* Chevron */}
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteNotification(notif._id)}
                      className="px-3 py-3 text-red-500 hover:bg-red-50 transition flex-shrink-0"
                      title="Delete notification"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      {notif.readers.length > 0 ? (
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-3">
                            Read by {notif.readers.length} {notif.readers.length === 1 ? 'person' : 'people'}:
                          </h4>
                          
                          {/* ✅ Avatar Group with Real Photos & Tooltips - Like Screenshot 2 */}
                          <div className="flex -space-x-3">
                            {notif.readers.map((reader, idx) => (
                              <div 
                                key={idx} 
                                className="group relative"
                              >
                                {/* Avatar */}
                                <div className="relative">
                                  <div className="w-12 h-12 rounded-full ring-2 ring-white hover:ring-[#06393a] transition-all cursor-pointer overflow-hidden bg-gradient-to-br from-[#06393a] to-teal-600 flex items-center justify-center">
                                    {reader.photoURL ? (
                                      <img 
                                        src={reader.photoURL} 
                                        alt={reader.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          // Fallback to initial if image fails
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                    ) : (
                                      <span className="text-white text-lg font-bold">
                                        {reader.name.charAt(0).toUpperCase()}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* ✅ Tooltip on Hover */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                                    <div className="font-bold">{reader.name}</div>
                                    <div className="text-gray-300 text-[10px]">{reader.email}</div>
                                    <div className="text-teal-300 text-[10px] uppercase font-semibold mt-0.5">
                                      {reader.role}
                                    </div>
                                    {/* Tooltip Arrow */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                      <div className="border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-gray-400">
                          <Clock className="w-8 h-8 mb-1 opacity-50" />
                          <p className="font-medium text-xs">No reads yet</p>
                        </div>
                      )}

                      {/* Unread Count */}
                      {notif.unreadCount > 0 && (
                        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-xs text-orange-700">
                            <span className="font-bold">{notif.unreadCount}</span> not read yet
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p className="font-medium text-sm">No notifications found</p>
              <p className="text-xs mt-1">Notifications will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Engagement Insight */}
      {uniqueNotifications.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Engagement Insights</h4>
              <p className="text-sm text-gray-700 mb-2">
                You have <span className="font-bold text-blue-600">{uniqueNotifications.length}</span> total notifications.
                {totalReads > 0 && (
                  <> <span className="font-bold text-green-600">{totalReads}</span> reads across all notifications.</>
                )}
              </p>
              <p className="text-sm text-gray-600">
                Average engagement: <span className="font-bold">{avgReadsPerNotification} reads per notification</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationAnalytics;