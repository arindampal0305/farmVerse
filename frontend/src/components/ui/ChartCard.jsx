function ChartCard({title,children}){

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-6">

{title}

</h2>

{children}

</div>

);

}

export default ChartCard;