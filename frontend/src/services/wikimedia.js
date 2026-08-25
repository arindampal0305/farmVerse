const cropImages = {
  tomato:
    "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg",

  rice:
    "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg",

  wheat:
    "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg",

  maize:
    "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg",

  corn:
    "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg",

  potato:
    "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg",

  onion:
    "https://images.pexels.com/photos/4197446/pexels-photo-4197446.jpeg",

  sugarcane:
    "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg",

  cotton:
    "https://images.pexels.com/photos/6157055/pexels-photo-6157055.jpeg",

  banana:
    "https://images.pexels.com/photos/5945904/pexels-photo-5945904.jpeg",

  mango:
    "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg",

  chilli:
    "https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg",

  carrot:
    "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",

  cabbage:
    "https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg",

  cauliflower:
    "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",

  cucumber:
    "https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg",

  brinjal:
    "https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg",

  eggplant:
    "https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg",

  okra:
    "https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg",
};

export const getCropImage = (cropName) => {
  return (
    cropImages[cropName.toLowerCase()] ||
    "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg"
  );
};