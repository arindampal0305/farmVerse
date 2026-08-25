const API_KEY = "YOUR_OPENWEATHER_API_KEY";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getForecast(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}