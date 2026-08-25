function FarmCard(){

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-6">

Farm Details

</h2>

<div className="space-y-4">

<div className="flex justify-between">

<span>Total Farms</span>

<span className="font-bold">

12

</span>

</div>

<div className="flex justify-between">

<span>Healthy Crops</span>

<span className="font-bold text-green-600">

98%

</span>

</div>

<div className="flex justify-between">

<span>Area Covered</span>

<span className="font-bold">

152 Acres

</span>

</div>

<div className="flex justify-between">

<span>Water Usage</span>

<span className="font-bold text-blue-600">

82%

</span>

</div>

</div>

</div>

);

}

export default FarmCard;