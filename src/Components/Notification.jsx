import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertCircle, Package, Clock, X } from 'lucide-react';
import useAxios from '../Hooks/useAxios';


const NotificationComponent = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  // Fetch notifications from server
  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      console.log('📡 Fetching notifications for userId:', userId);
      const { data } = await axios.get(`/notifications/${userId}`);
      
      if (data.success) {
        setNotifications(data.notifications);
        console.log('✅ Notifications loaded:', data.notifications.length, 'items');
      }
    } catch (error) {
      console.error('❌ Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark notification as read - এখন userId পাঠাচ্ছে
  const markAsRead = async (notificationId) => {
    try {
      const { data } = await axios.patch(`/notifications/${notificationId}/read`, {
        userId: userId  // ✅ Backend এ userId পাঠানো হচ্ছে
      });
      
      if (data.success) {
        // ✅ Local state update - শুধু এই notification কে read করুন
        setNotifications(notifications.map(notif =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        ));
        console.log('✅ Notification marked as read:', notificationId);
      }
    } catch (error) {
      console.error('❌ Error marking notification as read:', error);
    }
  };

  // Unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Icon based on message type
  const getNotificationIcon = (message) => {
    if (message.includes('approved')) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (message.includes('pending') || message.includes('waiting')) return <Clock className="w-5 h-5 text-yellow-600" />;
    if (message.includes('added')) return <Package className="w-5 h-5 text-blue-600" />;
    if (message.includes('return') || message.includes('reminder')) return <AlertCircle className="w-5 h-5 text-red-600" />;
    return <Bell className="w-5 h-5 text-gray-600" />;
  };

  const getIconBackground = (message) => {
    if (message.includes('approved')) return 'bg-green-100';
    if (message.includes('pending') || message.includes('waiting')) return 'bg-yellow-100';
    if (message.includes('added')) return 'bg-blue-100';
    if (message.includes('return') || message.includes('reminder')) return 'bg-red-100';
    return 'bg-gray-100';
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-[#06393a]/5 rounded-full transition-all"
      >
        <Bell className="w-6 h-6 text-[#06393a]" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl z-20 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#06393a] to-teal-600 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06393a]"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Bell className="w-16 h-16 mb-3 opacity-20" />
                  <p className="text-sm font-medium">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification._id}
                    onClick={() => !notification.read && markAsRead(notification._id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      notification.read ? 'hover:bg-gray-50' : 'hover:bg-[#06393a]/5 bg-blue-50/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${getIconBackground(notification.message)} p-2 rounded-full flex-shrink-0`}>
                        {getNotificationIcon(notification.message)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm break-words">
                          {notification.message}
                        </p>
                        <span className="text-gray-400 text-xs mt-1 block">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-gray-100 p-3">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-[#06393a] hover:bg-[#06393a]/90 text-white font-semibold py-2.5 rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationComponent;