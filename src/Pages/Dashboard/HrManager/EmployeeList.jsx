import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";


const EmployeeList = () => {
  const axiosPublic = useAxios();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------
  //   Load all employees (role = employee)
  // -------------------------------------------------
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosPublic.get("/employees");
        setEmployees(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchEmployees();
  }, [axiosPublic]);

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
          console.log(error);
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
      <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
        <p>Loading employees...</p>
      </div>
    );
  }

  // -------------------------------------------------
  //   UI Design (Original Design Maintained)
  // -------------------------------------------------
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2" /> Employees
      </h3>

      <div className="space-y-3">
        {employees.map((e) => (
          <div
            key={e._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
          >
            <div className="flex items-center space-x-4">
              <img
                src={e.photoURL}
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
                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {employees.length === 0 && (
          <p className="text-center text-gray-500">No Employees Found</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
