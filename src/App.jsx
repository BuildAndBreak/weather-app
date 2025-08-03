import { useState, useEffect } from "react";
import "./App.css";
import { getTimeZone } from "./utils/weatherUtils";
import CityInput from "./components/CityInput";
import DisplayWeather from "./components/DisplayWeather";
import CityList from "./components/CityList";

function App() {
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [pickedCity, setPickedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "cba8ecb1fc20f62c7e46699d4a3f9d8b";

  const getCoordinates = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          city
        )}&limit=5&appid=${apiKey}`
      );
      const cityData = await res.json();

      if (cityData.length > 0) {
        return cityData.map((city) => ({
          lat: city.lat,
          lon: city.lon,
          name: city.name,
          country: city.country,
        }));
      } else {
        return null;
      }
    } catch (error) {
      setError("Can't find location.");
      return null;
    }
  };

  const fetchWeather = async () => {
    if (!city || !pickedCity) {
      return setError(
        !city
          ? "Please enter a city name"
          : "Please select a city from the list"
      );
    }

    const { lat, lon, name } = pickedCity;

    if (!lat || !lon) {
      setError("Failed to get coords for the city");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const weatherData = await res.json();

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
    } catch (error) {
      setError("Error gathering data");
    }
  };

  useEffect(() => {
    if (!city) {
      setCityList([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const cities = await getCoordinates(city);

        const normalize = (str) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        if (cities) {
          const filtCities = cities.filter(
            (city, i, self) =>
              i ===
              self.findIndex(
                (c) =>
                  normalize(c.name) === normalize(city.name) &&
                  c.country === city.country
              )
          );
          setCityList(filtCities);
        }
      } catch (error) {
        setCityList([]);
        setError("Error fetching city list.");
      }
    };

    fetchCities();
  }, [city]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
      <div className="absolute inset-0 bg-[url('/bg-mobile.jpg')] opacity-80"></div>
      <div className="flex flex-col items-center z-10">
        <div className="relative">
          <img
            className="absolute w-100 scale-158 top-4 left-2 rotate-9"
            src="/rainbow.png"
            alt="rainbow image"
          />
          <img
            className="w-50 relative"
            src="/weather.png"
            alt="weather image"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">What's The Weather?!</h1>

        <CityInput
          city={city}
          setCity={setCity}
          error={error}
          setError={setError}
        />

        <CityList
          cityList={cityList}
          setCityList={setCityList}
          setPickedCity={setPickedCity}
          setCity={setCity}
        />

        <button
          onClick={fetchWeather}
          className="w-full bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Search
        </button>
      </div>
      <DisplayWeather weather={weather} />

      {error && <p className="relative mt-2 text-red-600">{error}!</p>}
    </div>
  );
}

export default App;
