import React, { useState, useEffect } from 'react';
import { Crown, Check, Zap } from 'lucide-react';

import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const UpgradePackage = () => {
  const axiosInstance = useAxiosSecure();
    const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loadingId, setLoadingId] = useState(null);




  // Load packages from server
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axiosInstance.get('/packages');
        setPackages(res.data);
      } catch {
        // console.error('Failed to fetch packages:', err);
        Swal.fire('Error', 'Failed to fetch packages', 'error');
      }
    };
    fetchPackages();
  }, []);

  // Buy package → Stripe Checkout
  const handleBuy = async (pkg) => {
    if (loadingId) return;
    setLoadingId(pkg._id);
    // console.log("User Email:", user?.email);

    // Save package info for payment success page
    localStorage.setItem('selectedPackageId', pkg._id);
    localStorage.setItem('selectedPackageName', pkg.name);
    localStorage.setItem('selectedPackagePrice', pkg.price);
    localStorage.setItem('userEmail', user?.email || '');
      

    try {
      const res = await axiosInstance.post('/create-checkout-session', {
        packageId: pkg._id,
        packageName: pkg.name,
        price: pkg.price
      });

      if (res.data?.url) {
        window.location.assign(res.data.url);
      } else {
        throw new Error('No checkout URL received');
      }
    } catch {
      // console.error('Checkout error:', err);
      Swal.fire('Error', 'Cannot initiate checkout. Please try again.', 'error');
      setLoadingId(null);
    }
  };

  // Package badge color based on package name
  const getBadgeColor = (name) => {
    if (name === 'Basic') return 'bg-blue-100 text-blue-700';
    if (name === 'Standard') return 'bg-purple-100 text-purple-700';
    if (name === 'Premium') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };


  const [users, setUser] = useState(null);
  const subscriptionName = users?.subscription ? users.subscription.toLowerCase() : '';


useEffect(() => {
  const fetchUser = async () => {
    try {
      if (!user?.email) return;

      const res = await axiosInstance.get(`/users/${user.email}`);
      setUser(res.data?.user); // শুধুমাত্র user object set করলাম

    } catch {
      // console.error('Failed to fetch user:', err);
    }
  };

  fetchUser();
}, [user?.email]);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-3">
          <Crown className="w-8 h-8 mr-2" color="#06393a" />
          <h3 className="text-3xl font-bold" style={{ color: '#06393a' }}>
            Upgrade Package
          </h3>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your business needs. All packages include secure payment via Stripe and instant activation.
        </p>
      </div>

      {packages.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#06393a' }}></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`relative p-6 rounded-2xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                pkg.name === 'Standard' ? 'border-purple-500 shadow-lg' : 'border-gray-200'
              }`}
            >
              {/* Popular Badge for Standard package */}
              {pkg.name === 'Standard' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Zap className="w-4 h-4 mr-1" /> Most Popular
                  </span>
                </div>
              )}

              {/* Package Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(pkg.name)}`}>
                  {pkg.name}
                </span>
              </div>

              {/* Package Name */}
              <h4 className="font-bold text-2xl mb-2" style={{ color: '#06393a' }}>
                {pkg.name}
              </h4>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold" style={{ color: '#06393a' }}>
                  ${pkg.price}
                </span>
                <span className="text-gray-500 text-sm ml-2">/month</span>
              </div>

              {/* Employee Limit */}
              <div className="mb-6 p-3 rounded-lg" style={{ backgroundColor: '#f0f9f9' }}>
                <p className="text-sm text-gray-600">Employee Limit</p>
                <p className="text-xl font-bold" style={{ color: '#06393a' }}>
                  Up to {pkg.packageLimit} employees
                </p>
              </div>

              {/* Features List */}
              <div className="mb-6 space-y-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">Features included:</p>
                {pkg.features && pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" color="#06393a" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Buy Button */}
<button
  onClick={() => handleBuy(pkg)}
  disabled={loadingId === pkg._id || subscriptionName?.toLowerCase() === pkg.name.toLowerCase()}
  className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 btn disabled:cursor-not-allowed ${
    pkg.name === 'Standard' ? 'shadow-lg hover:shadow-xl' : ''
  }`}
  style={{
    backgroundColor: loadingId === pkg._id
      ? '#6b7280' // processing
      : subscriptionName?.toLowerCase() === pkg.name.toLowerCase()
        ? '#10b981' // active subscription
        : '#06393a', // default
    color: 'white'
  }}
>
  {loadingId === pkg._id
    ? 'Processing...'
    : subscriptionName?.toLowerCase() === pkg.name.toLowerCase()
      ? 'Subscription Active'
      : 'Get Started Now'}
</button>

            </div>
          ))}
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          🔒 Secure payment powered by Stripe • Cancel anytime • Instant activation
        </p>
      </div>
    </div>
  );
};

export default UpgradePackage;