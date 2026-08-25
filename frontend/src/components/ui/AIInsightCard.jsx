function AIInsightCard(){

  return(

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        🤖 AI Insights

      </h2>

      <div className="space-y-5">

        <div className="bg-green-50 rounded-xl p-5">

          <h3 className="font-semibold text-green-700">

            Recommended Crop

          </h3>

          <p className="text-xl mt-2">

            Rice 🌾

          </p>

        </div>

        <div className="bg-blue-50 rounded-xl p-5">

          <h3 className="font-semibold text-blue-700">

            AI Confidence

          </h3>

          <p className="text-xl mt-2">

            96%

          </p>

        </div>

        <div className="bg-yellow-50 rounded-xl p-5">

          <h3 className="font-semibold text-yellow-700">

            Fertilizer

          </h3>

          <p className="text-xl mt-2">

            NPK 20-20-20

          </p>

        </div>

      </div>

    </div>

  );

}

export default AIInsightCard;