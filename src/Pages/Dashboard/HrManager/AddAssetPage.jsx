import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AddAsset = () => {
  const axiosSecure = useAxiosSecure();

  const {user} = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (assetData) => {
      const res = await axiosSecure.post("/assets", assetData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Asset Added Successfully!", "success");
      reset();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to add asset", "error");
    },
  });

 const onSubmit = (data) => {
  const newAsset = {
     assetName: data.assetName,
    assetType: data.assetType,
    quantity: Number(data.quantity),
    assetImage: data.assetImage || "",
    returnType: data.returnType,
    addedBy: {
      name: user.displayName,
      email: user.email
    }
  };


  mutation.mutate(newAsset);
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-5">Add New Asset</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-5 rounded-lg shadow"
      >
        {/* Asset Name */}
        <div>
          <label className="block mb-1">Asset Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Laptop / Keyboard / Chair"
            {...register("assetName", { required: true })}
          />
          {errors.assetName && (
            <p className="text-red-500 text-sm">Asset name is required</p>
          )}
        </div>

        {/* Asset Type */}
        <div>
          <label className="block mb-1">Asset Type</label>
          <select
            className="w-full p-2 border rounded"
            {...register("assetType", { required: true })}
          >
            <option value="">Select Type</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="furniture">Furniture</option>
          </select>
          {errors.assetType && (
            <p className="text-red-500 text-sm">Asset type is required</p>
          )}
        </div>

        {/* 🎯 RETURN TYPE (NEW) */}
        <div>
          <label className="block mb-1">Return Type</label>
          <select
            className="w-full p-2 border rounded"
            {...register("returnType", { required: true })}
          >
            <option value="">Select Return Type</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
          {errors.returnType && (
            <p className="text-red-500 text-sm">Return type is required</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Enter quantity"
            {...register("quantity", { required: true, min: 1 })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">
              Quantity must be at least 1
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1">Image URL (optional)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="https://example.com/image.jpg"
            {...register("assetImage")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="px-5 py-2 bg-[#063A3A] text-white rounded shadow hover:opacity-90 disabled:opacity-50"
        >
          {mutation.isLoading ? "Adding..." : "Add Asset"}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
