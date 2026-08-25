import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { addCrop } from "../../services/crop";
import { useNotifications } from "../../hooks/useNotifications";

export default function AddCrop() {
  const { id } = useParams(); // Farm ID from URL
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [form, setForm] = useState({ cropName: "", cropType: "", quantity: "", sowingDate: "", harvestDate: "", revenue: "", });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addCrop({
        farmId: Number(id),
        cropName: form.cropName,
        cropType: form.cropType,
        quantity: Number(form.quantity),
        sowingDate: form.sowingDate,
        harvestDate: form.harvestDate,
        revenue: Number(form.revenue),
      });

      addNotification(`Successfully added ${form.cropName} to your farm.`, 'success');
      alert("Crop added successfully!");

      navigate(`/farm/${id}`);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to add crop."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto mt-6">
        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Add Crop
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ">
                Crop Name
              </label>
              <input type="text" name="cropName" value={form.cropName} onChange={handleChange} placeholder="Enter crop name" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ">
                Crop Type
              </label>
              <input type="text" name="cropType" value={form.cropType} onChange={handleChange} placeholder="e.g. Kharif, Rabi, Organic" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ">
                Quantity
              </label>
              <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Enter quantity" min="1" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 ">
                  Sowing Date
                </label>
                <input type="date" name="sowingDate" value={form.sowingDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 ">
                  Harvest Date
                </label>
                <input type="date" name="harvestDate" value={form.harvestDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ">
                Revenue (₹)
              </label>
              <input type="number" step="0.01" name="revenue" value={form.revenue} onChange={handleChange} placeholder="Enter total revenue in exact ₹ (e.g. 260000)" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-4 rounded-xl shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0" >
                {loading ? "Saving..." : "Save Crop"}
              </button>

              <button type="button" onClick={() => navigate(`/farm/${id}`)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-4 rounded-xl transition-all" >
                Cancel
              </button>
            </div>

          </form>

        </div>
      </div>
    </DashboardLayout>
  );
}