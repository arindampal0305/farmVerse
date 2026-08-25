function ActivityCard() {

  const activities = [

    "🌾 Rice farm added",

    "🌦 Weather updated",

    "🤖 AI Recommendation generated",

    "💧 Irrigation scheduled",

    "🚜 Tractor assigned",

  ];

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Activities

      </h2>

      <div className="space-y-4"> {activities.map((item,index)=>(

          <div key={index} className="bg-green-50 rounded-xl p-4" >

            {item}

          </div>

        ))}

      </div>

    </div>

  );

}

export default ActivityCard;