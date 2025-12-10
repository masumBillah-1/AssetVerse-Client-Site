import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddAssetPage = ({ addAsset, PRIMARY, ACCENT }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Returnable");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    addAsset({ 
      name, 
      type, 
      quantity: Number(quantity), 
      image: "📦" 
    });
    // Reset form after submit
    setName("");
    setType("Returnable");
    setQuantity(1);
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-2xl">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <Plus className="w-5 h-5 mr-2" /> Add New Asset
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-[var(--primary)] block mb-1">
            Product Name
          </label>
          <input 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter asset name"
            className="w-full px-4 py-2 border rounded-lg focus:border-[var(--primary)] focus:outline-none" 
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-[var(--primary)] block mb-1">
            Type
          </label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg focus:border-[var(--primary)] focus:outline-none"
          >
            <option>Returnable</option>
            <option>Non-returnable</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-[var(--primary)] block mb-1">
            Quantity
          </label>
          <input 
            type="number" 
            min={1} 
            required
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            placeholder="Enter quantity"
            className="w-full px-4 py-2 border rounded-lg focus:border-[var(--primary)] focus:outline-none" 
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-[var(--primary)] block mb-1">
            Image (demo)
          </label>
          <input 
            placeholder="ImgBB upload integration can be added here" 
            className="w-full px-4 py-2 border rounded-lg bg-gray-50" 
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">
            Current demo uses an emoji placeholder (📦) — replace with ImgBB flow in production.
          </p>
        </div>

        <div className="flex space-x-3">
          <button 
            type="submit" 
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition"
          >
            Submit
          </button>
          <button 
            type="button" 
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAssetPage;