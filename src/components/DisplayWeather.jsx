import { getWindDirection, convertToKmh } from "../utils/weatherUtils";

export default function DisplayWeather({ weather }) {
  return (
    <>
      {weather && (
        <div className="bg-gradient-to-b from-blue-400 to-blue-100 shadow-lg rounded-xl p-2 mt-10 text-center w-[340px] md:w-[440px] z-1">
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
            <p className="font-semibold my-2">{weather.description}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between my-2">
            <div className="flex items-center justify-center">
              <img src={weather.icon} alt="weather-icon" />
              <div className="flex flex-col items-start border-red-500">
                <p className="text-4xl font-semibold">
                  {weather.temp.toFixed(1)}°C
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold mr-1">Feels Like:</span>
                  {weather.feelsLike.toFixed(1)}°C
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-center justify-center mx-5">
              <p className="md:flex md:flex-col">
                <span className="font-semibold mr-2">Humidity:</span>
                {weather.humidity}%
              </p>
              <p className="md:flex md:flex-col">
                <span className="font-semibold mr-2">Wind velocity:</span>
                {convertToKmh(weather.windSpeed)}
                Km/h
              </p>
              <p className="md:flex md:flex-col">
                <span className="font-semibold mr-2">Wind direction:</span>
                {getWindDirection(weather.windDir)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
