import { getTimeZone } from "../utils/weatherUtils";
import { getWeather } from "../services/weatherService";

export function useWeather({
  city,
  cityList,
  setWeather,
  pickedCity,
  setError,
}) {
  const fetchWeather = async () => {
    if (!city || !pickedCity) {
      return setError(
        !city
          ? "Please enter a city name"
          : cityList.length === 0
          ? "Invalid City"
          : "Please select a city from the list"
      );
    }

    const { lat, lon, name } = pickedCity;

    if (!lat || !lon) {
      setError("Failed to get coords for the city");
      return;
    }

    try {
      const weatherData = await getWeather(lat, lon);
      const { formattedDate, utc, localTime } = getTimeZone(
        weatherData.timezone
      );

      setWeather({
        city: name,
        country: weatherData.sys.country,
        localDate: formattedDate,
        localTime: localTime,
        utc: utc,
        temp: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].main,
        windDir: weatherData.wind.deg,
        windSpeed: weatherData.wind.speed,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      });
    } catch {
      setError("Error gathering data");
    }
  };
  return { fetchWeather };
}
