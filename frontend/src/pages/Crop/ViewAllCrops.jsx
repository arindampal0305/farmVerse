import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllCrops } from "../../services/crop";
import { getAllFarms } from "../../services/farm";
import MandiPriceWidget from "../../components/ui/MandiPriceWidget";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEdit } from "react-icons/fa";

export default function ViewAllCrops() {

    const navigate = useNavigate();

    const [crops, setCrops] = useState([]);
    const [farmLocations, setFarmLocations] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCrops();
    }, []);

    const loadCrops = async () => {
        try {
            const response = await getAllCrops();
            setCrops(response);

            try {
                const farmsResponse = await getAllFarms();
                const locMap = {};
                (farmsResponse.farms || []).forEach(f => {
                    locMap[f.farmName] = f.location;
                });
                setFarmLocations(locMap);
            } catch (farmErr) {
                console.error("Failed to load farms mapping:", farmErr);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {

        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    Loading...
                </div>
            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-green-700 mb-6"
            >
                <FaArrowLeft />
                Back
            </button>

            <h1 className="text-4xl font-bold text-green-700 mb-8">
                All Crops
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {crops.map((crop) => (

                    <div
                        key={crop.cropId}
                        className="bg-white rounded-xl shadow-lg border overflow-hidden"
                    >

                        <img
                            src={`https://loremflickr.com/600/400/${crop.cropName}`}
                            alt={crop.cropName}
                            className="w-full h-52 object-cover"
                        />

                        <div className="p-5">

                            <h2 className="text-2xl font-bold text-green-700">
                                {crop.cropName}
                            </h2>

                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <p className="flex justify-between border-b pb-1">
                                    <span className="font-semibold text-gray-500">Farm</span>
                                    <span>{crop.farmName}</span>
                                </p>
                                <p className="flex justify-between border-b pb-1">
                                    <span className="font-semibold text-gray-500">Type</span>
                                    <span>{crop.cropType}</span>
                                </p>
                                <p className="flex justify-between border-b pb-1">
                                    <span className="font-semibold text-gray-500">Quantity</span>
                                    <span>{crop.quantity}</span>
                                </p>
                                <p className="flex justify-between border-b pb-1">
                                    <span className="font-semibold text-gray-500">Sowing</span>
                                    <span>{crop.sowingDate}</span>
                                </p>
                                <p className="flex justify-between border-b pb-1">
                                    <span className="font-semibold text-gray-500">Harvest</span>
                                    <span>{crop.harvestDate}</span>
                                </p>
                                <p className="flex justify-between pb-1">
                                    <span className="font-semibold text-gray-500">Revenue</span>
                                    <span className="text-emerald-600 font-bold">₹{crop.revenue || 0}</span>
                                </p>
                            </div>

                            {(() => {
                                const calculateProgress = (sowingDateStr, harvestDateStr) => {
                                    if (!sowingDateStr || !harvestDateStr) return null;
                                    try {
                                        const sowing = new Date(sowingDateStr);
                                        const harvest = new Date(harvestDateStr);
                                        const now = new Date();

                                        if (isNaN(sowing.getTime()) || isNaN(harvest.getTime())) return null;

                                        sowing.setHours(0,0,0,0);
                                        harvest.setHours(0,0,0,0);
                                        now.setHours(0,0,0,0);

                                        const totalDuration = harvest.getTime() - sowing.getTime();
                                        if (totalDuration <= 0) return null;

                                        const elapsed = now.getTime() - sowing.getTime();
                                        let percent = Math.round((elapsed / totalDuration) * 100);
                                        percent = Math.max(0, Math.min(100, percent));

                                        const msPerDay = 1000 * 60 * 60 * 24;
                                        const daysLeft = Math.max(0, Math.ceil((harvest.getTime() - now.getTime()) / msPerDay));

                                        return { percent, daysLeft };
                                    } catch (e) {
                                        console.error(e);
                                        return null;
                                    }
                                };

                                const progress = calculateProgress(crop.sowingDate, crop.harvestDate);
                                if (!progress) return null;

                                return (
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <div className="flex justify-between items-center mb-1 text-xs">
                                            <span className="font-semibold text-gray-500 font-medium">Harvest Progress</span>
                                            <span className="font-bold text-emerald-600">{progress.percent}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-green-600"
                                                style={{ width: `${progress.percent}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between items-center mt-1 text-[10px] text-gray-400 font-medium">
                                            <span>Sown: {new Date(crop.sowingDate).toLocaleDateString()}</span>
                                            <span>
                                                {progress.percent >= 100
                                                    ? "Ready to Harvest!"
                                                    : `${progress.daysLeft} days left`}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })()}

                            <MandiPriceWidget cropName={crop.cropName} farmLocation={farmLocations[crop.farmName] || ""} />

                            <div className="grid grid-cols-2 gap-2 mt-5">

                                <button
                                    onClick={() => navigate(`/crop/${crop.cropId}`)}
                                    className="bg-blue-600 text-white rounded-lg py-2 flex justify-center items-center gap-2"
                                >
                                    <FaEye />
                                    View
                                </button>

                                <button
                                    onClick={() => navigate(`/crop/edit/${crop.cropId}`)}
                                    className="bg-yellow-500 text-white rounded-lg py-2 flex justify-center items-center gap-2"
                                >
                                    <FaEdit />
                                    Edit
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </DashboardLayout>

    );

}