import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { SimpleLoader } from "../../../Components/Loader";



const EmployeeList = () => {
  const axiosPublic = useAxiosSecure();
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // -------------------------------------------------
  //   Load data when user is available
  // -------------------------------------------------
  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch current user
      const userResponse = await axiosPublic.get(`/users/${user.email}`);
      
      if (!userResponse.data.success || !userResponse.data.user) {
        console.error('❌ User not found');
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "Could not fetch user data. Please login again.",
          confirmButtonColor: '#06393a'
        });
        setLoading(false);
        return;
      }
      
      const userData = userResponse.data.user;
      setCurrentUser(userData);

      // Get company ID (HR's _id)
      const companyId = userData.role === 'hr' ? userData._id : null;

      if (!companyId) {
        console.error('❌ Company ID not found');
        Swal.fire({
          icon: "warning",
          title: "No Company Found",
          text: "You are not affiliated with any company yet.",
          confirmButtonColor: '#06393a'
        });
        setLoading(false);
        return;
      }

      console.log('✅ Fetching employees for company:', companyId);

      // Fetch only employees affiliated with this company
      const res = await axiosPublic.get(`/employees/company/${companyId}`);
      console.log('✅ Employees fetched:', res.data.employees?.length || 0);
      setEmployees(res.data.employees || []);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: error.response.data?.error || error.response.data?.message || "Failed to fetch data",
          confirmButtonColor: '#06393a'
        });
      } else if (error.request) {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Poor Network Connection 🛜. Please check your internet.",
          confirmButtonColor: '#06393a'
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred. Please try again.",
          confirmButtonColor: '#06393a'
        });
      }
      
      setLoading(false);
    }
  };

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
        } catch (error) {
          console.error('❌ Error removing employee:', error);
          Swal.fire("Error", "Failed to remove employee", "error");
        }
      }
    });
  };

  // -------------------------------------------------
  //   Loading State
  // -------------------------------------------------
  if (loading) {
    return <SimpleLoader message="Loading employees..." />;
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
                className="btn btn-sm bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors border-none"
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