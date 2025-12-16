import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const AllRequestsPage = () => {
  const axiosInstance = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchRequests();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchCurrentUser = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail'); // Or from your auth context
      const response = await axiosInstance.get(`/users/${userEmail}`);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      // Use companyId to filter requests
      const companyId = currentUser.role === 'hr' ? currentUser._id : null;
      
      if (!companyId) {
        console.error('Company ID not found');
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get(`/requests?companyId=${companyId}`);
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setLoading(false);
    }
  };

const approveRequest = async (id) => {
  try {
    const response = await axiosInstance.patch(`/requests/${id}/approve`);
    
    if (response.data.success) {
      await fetchRequests(); // refresh the table
      Swal.fire({
        icon: 'success',
        title: 'Approved!',
        text: response.data.message || 'Request has been approved successfully.',
        timer: 1000,
        showConfirmButton: false
      });
    }
  } catch (error) {
    console.error('Error approving request:', error);
    
    // ✅ Check if package limit reached
    if (error.response?.data?.limitReached) {
      Swal.fire({
        icon: 'warning',
        title: 'Package Limit Reached!',
        html: `
          <p>${error.response.data.message}</p>
          <p class="mt-2"><strong>Current: ${error.response.data.currentEmployees}/${error.response.data.packageLimit}</strong></p>
        `,
        showCancelButton: true,
        confirmButtonText: 'Upgrade Package',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#06393a',
      }).then((result) => {
        if (result.isConfirmed) {
          // ✅ Auto redirect to upgrade page
         navigate('/hr-dashboard/upgrade-package');
        }
      });
    } else {
      // Other errors
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: error.response?.data?.message || 'Failed to approve the request.',
      });
    }
  }
};

const rejectRequest = async (id) => {
  try {
    const response = await axiosInstance.patch(`/requests/${id}`, { 
      requestStatus: 'rejected',
      rejectedAt: new Date()
    });
    
    if (response.data) {
      await fetchRequests();
      Swal.fire({
        icon: 'success',
        title: 'Rejected!',
        text: 'Request has been rejected successfully.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  } catch (error) {
    console.error('Error rejecting request:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed!',
      text: error.response?.data?.message || 'Failed to reject the request.',
    });
  }
};
  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.requestStatus === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200'
    };

    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />
    };

    return (
      <span className={`px-3 py-1.5 rounded-full font-semibold text-sm flex items-center gap-1.5 border ${styles[status] || styles.pending}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#06393a] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 border border-gray-100">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                filter === 'all' 
                  ? 'bg-[#06393a] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({requests.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                filter === 'pending' 
                  ? 'bg-yellow-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({requests.filter(r => r.requestStatus === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                filter === 'approved' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved ({requests.filter(r => r.requestStatus === 'approved').length})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                filter === 'rejected' 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rejected ({requests.filter(r => r.requestStatus === 'rejected').length})
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#06393a]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Asset</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Request Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-3">
                        <FileText className="w-16 h-16 text-gray-300" />
                        <p className="text-lg font-semibold">No requests found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req._id} className="hover:bg-[#06393a]/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">{req.employeeName}</p>
                          <p className="text-sm text-gray-500">{req.employeeEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
  <div className="flex items-center gap-3">
    {req.assetImage ? (
      <img 
        src={req.assetImage} 
        alt={req.assetName}
        className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200"
      />
    ) : (
      <span className="text-4xl">📦</span>
    )}
    <div>
      <p className="font-semibold text-gray-800">{req.assetName}</p>
      <span className="text-xs bg-[#06393a]/10 px-2 py-1 rounded-full text-[#06393a] font-medium">
        {req.assetType}
      </span>
    </div>
  </div>
</td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">
                          {new Date(req.requestDate).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(req.requestStatus)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {req.requestStatus === 'pending' ? (
                            <>
                              <button 
                                onClick={() => approveRequest(req._id)}
                                className="bg-green-500 hover:bg-green-600 btn btn-sm text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </button>
                              <button 
                                onClick={() => rejectRequest(req._id)}
                                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-sm text-gray-400 font-medium">No actions</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRequestsPage;