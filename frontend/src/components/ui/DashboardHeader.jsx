import {
FaBell,
FaSearch,
FaSun,
FaUserCircle
} from "react-icons/fa";

function DashboardHeader(){

const today=new Date();

return(

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

<div className="flex justify-between items-center">

<div>

<div className="flex items-center gap-3">

<FaSun className="text-yellow-500 text-3xl"/>

<h1 className="text-4xl font-bold">

Good Morning

</h1>

</div>

<p className="text-gray-500 mt-2">

Welcome to FarmVerse Dashboard

</p>

<p className="text-sm text-gray-400">

{today.toDateString()}

</p>

</div>

<div className="flex items-center gap-4">

<div className="relative">

<FaSearch className="absolute left-4 top-4 text-gray-400"/>

<input placeholder="Search..." className="pl-12 pr-4 py-3 border rounded-xl outline-none w-72" />

</div>

<button className="bg-green-100 p-4 rounded-xl">

<FaBell/>

</button>

<div className="flex items-center gap-3">

<FaUserCircle className="text-4xl text-green-700"/>

<div>

<h3 className="font-semibold">

Ananya

</h3>

<p className="text-sm text-gray-500">

Frontend Developer

</p>

</div>

</div>

</div>

</div>

</div>

);

}

export default DashboardHeader;