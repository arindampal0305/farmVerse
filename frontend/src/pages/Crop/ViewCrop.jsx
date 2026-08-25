import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCropById } from "../../services/crop";
import { getAllFarms } from "../../services/farm";
import MandiPriceWidget from "../../components/ui/MandiPriceWidget";
import { FaArrowLeft } from "react-icons/fa";

export default function ViewCrop() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [crop, setCrop] = useState(null);
    const [farmLocation, setFarmLocation] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCrop();
    }, []);

    const loadCrop = async () => {
        try {
            const response = await getCropById(id);
            setCrop(response.crop);

            try {
                const farmsResponse = await getAllFarms();
                const matchedFarm = (farmsResponse.farms || []).find(f => f.farmName === response.crop.farmName);
                if (matchedFarm) {
                    setFarmLocation(matchedFarm.location);
                }
            } catch (farmErr) {
                console.error("Failed to load farm location:", farmErr);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if(loading){

        return(
            <DashboardLayout>
                <div className="text-center py-20 text-xl">
                    Loading...
                </div>
            </DashboardLayout>
        );

    }

    return(

        <DashboardLayout>

            <button
                onClick={()=>navigate(-1)}
                className="flex items-center gap-2 text-green-700 mb-6"
            >
                <FaArrowLeft/>
                Back
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-4xl font-bold text-green-700 mb-6">
                    {crop.cropName}
                </h1>

                <div className="space-y-4 text-lg">
                    <p><strong>Crop Type:</strong> {crop.cropType}</p>
                    <p><strong>Quantity:</strong> {crop.quantity} Tons</p>
                    <p><strong>Sowing Date:</strong> {crop.sowingDate}</p>
                    <p><strong>Harvest Date:</strong> {crop.harvestDate}</p>
                    <p><strong>Farm:</strong> {crop.farmName}</p>
                </div>
                <div className="mt-8 max-w-md">
                    <MandiPriceWidget cropName={crop.cropName} farmLocation={farmLocation} />
                </div>

            </div>

        </DashboardLayout>

    );

}