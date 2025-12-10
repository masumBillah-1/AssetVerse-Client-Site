import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import useAxios from '../Hooks/useAxios';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      Swal.fire('Error', 'Invalid payment session', 'error');
      navigate('/');
      return;
    }

    // Save payment data to database
    const savePayment = async () => {
      try {
        const hrEmail = localStorage.getItem('userEmail'); // অথবা আপনার auth থেকে email নিন
        
        const res = await axiosInstance.post('/payment-success', {
          sessionId,
          hrEmail,
          packageId: localStorage.getItem('selectedPackageId'),
          packageName: localStorage.getItem('selectedPackageName'),
          amount: localStorage.getItem('selectedPackagePrice')
        });

        if (res.data.success) {
          setProcessing(false);
          // Clear localStorage
          localStorage.removeItem('selectedPackageId');
          localStorage.removeItem('selectedPackageName');
          localStorage.removeItem('selectedPackagePrice');
          
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: 'Your subscription has been upgraded.',
            timer: 2000
          });

          setTimeout(() => navigate('/dashboard'), 2000);
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to save payment', 'error');
        navigate('/');
      }
    };

    savePayment();
  }, [searchParams, navigate, axiosInstance]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#06393a' }}></div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#06393a' }}>Processing Payment...</h2>
            <p className="text-gray-600">Please wait while we confirm your payment.</p>
          </>
        ) : (
          <>
            <CheckCircle className="w-16 h-16 mx-auto mb-4" color="#10b981" />
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#06393a' }}>Payment Successful!</h2>
            <p className="text-gray-600">Your subscription has been upgraded successfully.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;