import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getFarmById } from "../../services/farm";
import { deleteCrop } from "../../services/crop";
import MandiPriceWidget from "../../components/ui/MandiPriceWidget";
import { MapPin, Sprout, Ruler, Globe } from "lucide-react";

import {
  FaArrowLeft,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaList
} from "react-icons/fa";

// Curated crop images
const CROP_IMAGES = {
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=400&fit=crop",
  onion: "https://images.unsplash.com/photo-1508747703725-719777637510?w=600&h=400&fit=crop",
  rice: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
  maize: "https://images.unsplash.com/photo-1601593768799-76d33b2e8a76?w=600&h=400&fit=crop",
  corn: "https://images.unsplash.com/photo-1601593768799-76d33b2e8a76?w=600&h=400&fit=crop",
  potato: "https://images.unsplash.com/photo-1518977676405-d573e4fce94b?w=600&h=400&fit=crop",
  sugarcane: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop",
  cotton: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop",
  soybean: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=600&h=400&fit=crop",
  groundnut: "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=600&h=400&fit=crop",
  mustard: "https://images.unsplash.com/photo-1624695891471-27b22c8a5bc4?w=600&h=400&fit=crop",
  banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=400&fit=crop",
  mango: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=400&fit=crop",
  chilli: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&h=400&fit=crop",
  pepper: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&h=400&fit=crop",
  spinach: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop",
  cabbage: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&h=400&fit=crop",
  cauliflower: "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=600&h=400&fit=crop",
  brinjal: "https://images.unsplash.com/photo-1613145997970-db84a7975fbb?w=600&h=400&fit=crop",
  eggplant: "https://images.unsplash.com/photo-1613145997970-db84a7975fbb?w=600&h=400&fit=crop",
  garlic: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=600&h=400&fit=crop",
  ginger: "https://images.unsplash.com/photo-1603431777007-47e4ca72ca6c?w=600&h=400&fit=crop",
  carrot: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=400&fit=crop",
  peas: "https://images.unsplash.com/photo-1587334207902-a2ce1a0049e9?w=600&h=400&fit=crop",
  lentil: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop",
  sunflower: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&h=400&fit=crop",
  turmeric: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop",
  cucumber: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&h=400&fit=crop",
  watermelon: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=400&fit=crop",
  grapes: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=400&fit=crop",
  orange: "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=400&fit=crop"
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&h=400&fit=crop"
];

function getCropImage(cropName) {
  const key = cropName?.toLowerCase().trim();

  if (CROP_IMAGES[key]) {
    return CROP_IMAGES[key];
  }

  let hash = 0;

  for (let i = 0; i < (key?.length || 0); i++) {
    hash = key.charCodeAt(i) + hash;
  }

  return FALLBACK_IMAGES[Math.abs(hash) % FALLBACK_IMAGES.length];
}

export default function ViewFarm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarm();
  }, []);

  const loadFarm = async () => {
    try {
      const response = await getFarmById(id);
      setFarm(response.farm);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCrop = async (cropId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCrop(cropId);
      alert("Crop deleted successfully.");
      loadFarm();
    } catch (error) {
      console.error(error);
      alert("Failed to delete crop.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-xl">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!farm) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-red-600 text-xl">
          Farm not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Back Button */}
      <button
        onClick={() => navigate("/farm")}
        className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-4 md:mb-6 font-semibold text-sm md:text-base"
      >
        <FaArrowLeft />
        Back to Farms
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

        {/* Farm Details */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 break-words">
          {farm.farmName}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">

          <div className="space-y-4 text-lg text-gray-700">

            <p className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <strong>Location:</strong> {farm.location}
            </p>

            <p className="flex items-center gap-3">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <strong>Farm Type:</strong> {farm.farmType}
            </p>

            <p className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-emerald-600" />
              <strong>Area:</strong> {farm.areaSqMt} sq.m
            </p>

            <p className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-600" />
              <strong>Soil:</strong> {farm.soilType}
            </p>

          </div>

        </div>

        {/* Crop Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 md:mt-12 mb-6 md:mb-8 gap-4 md:gap-0">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Crops
          </h2>

          <div className="flex gap-2 md:gap-3 w-full md:w-auto">

            <button
              onClick={() => navigate("/crops")}
              className="flex-1 md:flex-none justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-2.5 md:py-3 rounded-xl flex items-center gap-1.5 md:gap-2 text-sm md:text-base font-semibold"
            >
              <FaList />
              View All
            </button>

            <button
              onClick={() =>
                navigate(`/farm/${farm.farmId}/crop/add`)
              }
              className="flex-1 md:flex-none justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-3 md:px-6 py-2.5 md:py-3 rounded-xl flex items-center gap-1.5 md:gap-2 shadow-lg shadow-green-600/30 transition-all hover:scale-105 text-sm md:text-base"
            >
              <FaPlus />
              Add Crop
            </button>

          </div>

        </div>

        {/* Crop List */}
        {(farm.crops ?? []).length === 0 ? (

          <div className="mt-6 bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
            No crops added yet. Start by adding a crop!
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {(farm.crops ?? []).map((crop) => (

              <div
                key={crop.cropId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >

                {/* Crop Image */}
                <div className="overflow-hidden">
                  <img
                    src={getCropImage(crop.cropName)}
                    alt={crop.cropName}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {crop.cropName}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">

                    <p className="flex justify-between border-b pb-1">
                      <span className="font-semibold text-gray-500">
                        Type
                      </span>
                      <span>{crop.cropType}</span>
                    </p>

                    <p className="flex justify-between border-b pb-1">
                      <span className="font-semibold text-gray-500">
                        Quantity
                      </span>
                      <span>{crop.quantity}</span>
                    </p>

                    <p className="flex justify-between border-b pb-1">
                      <span className="font-semibold text-gray-500">
                        Sowing
                      </span>
                      <span>{crop.sowingDate}</span>
                    </p>

                    <p className="flex justify-between border-b pb-1">
                      <span className="font-semibold text-gray-500">
                        Harvest
                      </span>
                      <span>{crop.harvestDate}</span>
                    </p>

                    <p className="flex justify-between pb-1">
                      <span className="font-semibold text-gray-500">
                        Revenue
                      </span>
                      <span className="text-emerald-600 font-bold">
                        ₹{crop.revenue || 0}
                      </span>
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

                  <MandiPriceWidget cropName={crop.cropName} farmLocation={farm.location} />

                </div>

                {/* Actions */}
                <div className="flex border-t border-gray-100 divide-x divide-gray-100">

                  <button
                    onClick={() =>
                      navigate(`/crop/${crop.cropId}`)
                    }
                    className="flex-1 py-4 text-blue-600 font-semibold hover:bg-blue-50 flex justify-center items-center gap-2 transition-colors"
                  >
                    <FaEye />
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/farm/${farm.farmId}/crop/edit/${crop.cropId}`
                      )
                    }
                    className="flex-1 py-4 text-yellow-600 font-semibold hover:bg-yellow-50 flex justify-center items-center gap-2 transition-colors"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteCrop(crop.cropId)
                    }
                    className="flex-1 py-4 text-red-600 font-semibold hover:bg-red-50 flex justify-center items-center gap-2 transition-colors"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}