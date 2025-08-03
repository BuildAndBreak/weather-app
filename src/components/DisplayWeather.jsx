import { getWindDirection, convertToKmh } from "../utils/weatherUtils";

export default function DisplayWeather({ weather }) {
  return (
    <>
      {weather && (
        <div className="bg-gradient-to-b from-blue-400 to-blue-100 shadow-lg rounded-xl p-2 mt-10 text-center w-full max-w-sm md:max-w-md z-1">
          <div>
            <p className="text-2xl">
              {weather.city}, {weather.country}
            </p>
            <p>{weather.localDate}</p>
            <div>
              <span className="px-2">{weather.utc}</span>
              <span className="px-2">{weather.localTime}</span>
            </div>
            <p></p>
            <p>{weather.description}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between my-2">
            <div className="flex items-center justify-center">
              <img src={weather.icon} alt="weather-icon" />
              <div className="flex flex-col items-start border-red-500">
                <p className="text-4xl font-semibold">
                  {weather.temp.toFixed(1)}°C
                </p>
                <p className="text-sm mt-1">
                  Feels Like: {weather.feelsLike.toFixed(1)}°C
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start justify-center mx-5">
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind velocity: {convertToKmh(weather.windSpeed)}Km/h</p>
              <p>Wind direction: {getWindDirection(weather.windDir)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
