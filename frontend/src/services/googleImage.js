const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CX = import.meta.env.VITE_GOOGLE_CX;

const cache = {};

export const getCropImage = async (cropName) => {
  const key = cropName.toLowerCase();

  if (cache[key]) {
    return cache[key];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
        cropName + " crop plant"
      )}&searchType=image&num=1&safe=active`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      cache[key] = data.items[0].link;
      return data.items[0].link;
    }

    return "https://via.placeholder.com/500x350?text=No+Image";
  } catch (err) {
    console.error(err);
    return "https://via.placeholder.com/500x350?text=No+Image";
  }
};