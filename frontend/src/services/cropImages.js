const cache = {};

export const getCropImage = async (cropName) => {
  const key = cropName.toLowerCase().trim();

  if (cache[key]) {
    return cache[key];
  }

  const image = `https://source.unsplash.com/600x400/?${encodeURIComponent(
    cropName + ",agriculture"
  )}`;

  cache[key] = image;

  return image;
};