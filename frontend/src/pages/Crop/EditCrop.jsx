import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCropById, updateCrop } from "../../services/crop";
import { useNotifications } from "../../hooks/useNotifications";

export default function EditCrop() {
    const { farmId, cropId, id } = useParams();

    const actualCropId = cropId || id;

    const navigate = useNavigate();
    const { addNotification } = useNotifications();

    const [form, setForm] = useState({
        cropName: "",
        cropType: "",
        quantity: "",
        sowingDate: "",
        harvestDate: "",
        revenue: ""
    });

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        fetchCrop();
    }, [actualCropId]);

    const fetchCrop = async () => {
        try {
            const response = await getCropById(actualCropId);

            const crop = response.crop;

            setForm({
                cropName: crop.cropName,
                cropType: crop.cropType,
                quantity: crop.quantity,
                sowingDate: crop.sowingDate,
                harvestDate: crop.harvestDate,
                revenue: crop.revenue || ""
            });

        } catch (err) {
            console.error(err);
            alert("Failed to load crop details.");
        } finally {
            setInitialLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updateData = {
                cropName: form.cropName,
                cropType: form.cropType,
                quantity: Number(form.quantity),
                sowingDate: form.sowingDate,
                harvestDate: form.harvestDate,
                revenue: Number(form.revenue)
            };

            if (farmId) {
                updateData.farmId = Number(farmId);
            }

            await updateCrop(actualCropId, updateData);

            addNotification(
                `Successfully updated ${form.cropName} details.`,
                "success"
            );

            alert("Crop updated successfully!");

            if (farmId) {
                navigate(`/farm/${farmId}`);
            } else {
                navigate(-1);
            }

        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message ||
                "Failed to update crop."
            );
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <DashboardLayout>
                <div className="text-center py-20 text-xl">
                    Loading...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto mt-6">

                <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-10">

                    <h1 className="text-3xl font-bold text-gray-800 mb-8">
                        Edit Crop
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Crop Name
                            </label>

                            <input
                                type="text"
                                name="cropName"
                                value={form.cropName}
                                onChange={handleChange}
                                placeholder="Enter crop name"
                                className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Crop Type
                            </label>

                            <input
                                type="text"
                                name="cropType"
                                value={form.cropType}
                                onChange={handleChange}
                                placeholder="e.g. Kharif, Rabi, Organic"
                                className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Quantity
                            </label>

                            <input
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                placeholder="Enter quantity"
                                min="1"
                                className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Sowing Date
                                </label>

                                <input
                                    type="date"
                                    name="sowingDate"
                                    value={form.sowingDate}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Harvest Date
                                </label>

                                <input
                                    type="date"
                                    name="harvestDate"
                                    value={form.harvestDate}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    required
                                />
                            </div>

                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Revenue (₹)
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="revenue"
                                value={form.revenue}
                                onChange={handleChange}
                                placeholder="Enter total revenue"
                                className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-6">

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-4 rounded-xl shadow-lg disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    farmId
                                        ? navigate(`/farm/${farmId}`)
                                        : navigate(-1)
                                }
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-4 rounded-xl"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>
                </div>

            </div>
        </DashboardLayout>
    );
}