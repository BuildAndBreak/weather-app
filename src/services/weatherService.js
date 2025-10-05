const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function getCoordinates(city) {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=5&appid=${apiKey}`
  );
  return await res.json();
}

export async function getWeather(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );
  return await res.json();
}
