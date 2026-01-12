import { createContext, useContext, useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) {
        setLoading(false);
        setMongoUser(null);
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(`/users/${user.email}`);
        
        if (data.success) {
          setMongoUser(data.user);
        }
      } catch (error) {
        console.error('❌ Error fetching user:', error);
        setMongoUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.email, axios]);

  const value = {
    mongoUser,
    loading,
    role: mongoUser?.role,
    userId: mongoUser?._id,
    companyId: mongoUser?.role === 'hr' ? mongoUser?._id : mongoUser?.affiliatedCompanies?.[0],
    refreshUser: async () => {
      if (user?.email) {
        try {
          const { data } = await axios.get(`/users/${user.email}`);
          if (data.success) {
            setMongoUser(data.user);
          }
        } catch (error) {
          console.error('❌ Error refreshing user:', error);
        }
      }
    }
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useMongoUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useMongoUser must be used within UserProvider');
  }
  return context;
};
