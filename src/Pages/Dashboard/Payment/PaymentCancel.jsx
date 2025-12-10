import React from 'react';
import { useNavigate } from 'react-router';
import { XCircle } from 'lucide-react';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <XCircle className="w-16 h-16 mx-auto mb-4" color="#ef4444" />
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#06393a' }}>Payment Cancelled</h2>
        <p className="text-gray-600 mb-6">Your payment was not completed.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#06393a', color: 'white' }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;