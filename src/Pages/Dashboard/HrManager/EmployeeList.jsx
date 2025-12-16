import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";



const EmployeeList = () => {
  const axiosPublic = useAxiosSecure();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // -------------------------------------------------
  //   Load current HR user
  // -------------------------------------------------
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail'); // Or from auth context
        const response = await axiosPublic.get(`/users/${userEmail}`);
        setCurrentUser(response.data.user);
      } catch  {
        // console.error('Error fetching user:', error);
      }
    };

    fetchCurrentUser();
  }, [axiosPublic]);

  // -------------------------------------------------
  //   Load employees of current HR's company
  // -------------------------------------------------
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!currentUser) return;

      try {
        // Get company ID (HR's _id)
        const companyId = currentUser.role === 'hr' ? currentUser._id : null;

        if (!companyId) {
          // console.error('Company ID not found');
          setLoading(false);
          return;
        }

        // Fetch only employees affiliated with this company
        const res = await axiosPublic.get(`/employees/company/${companyId}`);
        setEmployees(res.data.employees || []);
      } catch {
        // console.error('Error fetching employees:', error);
      }
      setLoading(false);
    };

    if (currentUser) {
      fetchEmployees();
    }
  }, [axiosPublic, currentUser]);

  // -------------------------------------------------
  //   Remove Employee Function
  // -------------------------------------------------
  const removeEmployee = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This employee will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/employees/${id}`);

          if (res.data.deletedCount > 0) {
            setEmployees((prev) => prev.filter((e) => e._id !== id));

            Swal.fire("Removed!", "Employee has been removed.", "success");
          }
        } catch  {
 
          Swal.fire("Error", "Failed to remove employee", "error");
        }
      }
    });
  };

  // -------------------------------------------------
  //   Loading State
  // -------------------------------------------------
  if (loading) {
    return (
     <div className="text-center py-12 min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#06393a' }}></div>
          <p className="mt-4 text-gray-600">Loading ...</p>
        </div>
    );
  }

  // -------------------------------------------------
  //   UI Design (Original Design Maintained)
  // -------------------------------------------------
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2" /> My Team Members ({employees.length})
      </h3>

      <div className="space-y-3">
        {employees.map((e) => (
          <div
            key={e._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
          >
            <div className="flex items-center space-x-4">
              <img
                src={e.photoURL || 'https://via.placeholder.com/150'}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-[var(--primary)]">{e.name}</p>
                <p className="text-sm text-gray-600">{e.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">
                {e?.affiliatedCompanies?.length || 0} Assets
              </span>

              <button
                onClick={() => removeEmployee(e._id)}
                className="btn btn-sm bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {employees.length === 0 && (
          <p className="text-center text-gray-500">No Employees Found in Your Company</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;