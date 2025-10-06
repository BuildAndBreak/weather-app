import { useState } from "react";
import CityInput from "./components/CityInput";
import DisplayWeather from "./components/DisplayWeather";
import CityList from "./components/CityList";
import { useCitySearch } from "./hooks/useCitySearch";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pickedCity, setPickedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { cityList, setCityList } = useCitySearch({
    city,
    selectedCity,
    setError,
    setPickedCity,
  });

  const { fetchWeather } = useWeather({
    city,
    cityList,
    setWeather,
    pickedCity,
    setError,
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
      <div className="absolute inset-0 bg-[url('/bg.jpg')] opacity-80"></div>

      <div className="flex flex-col items-center z-10">
        <div className="relative">
          <img
            className="absolute w-100 scale-140 top-4 left-2 rotate-10"
            src="/rainbow.png"
            alt="decorative rainbow illustration"
          />
          <img
            className="w-50 relative"
            src="/weather.png"
            alt="decorative weather illustration"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">What's The Weather?</h1>

        <CityInput
          city={city}
          setCity={setCity}
          error={error}
          setError={setError}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setPickedCity={setPickedCity}
          setSelectedCity={setSelectedCity}
          cityList={cityList}
          setCityList={setCityList}
        />

        <CityList
          cityList={cityList}
          setCityList={setCityList}
          setPickedCity={setPickedCity}
          setSelectedCity={setSelectedCity}
          setCity={setCity}
          setError={setError}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <button
          onClick={fetchWeather}
          className="w-full bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition-all hover:scale-102 duration-350 shadow-lg cursor-pointer"
          aria-label="Search weather for selected city">
          Search
        </button>

        {error && (
          <p className="relative mt-2 text-red-600 font-semibold">{error}!</p>
        )}
      </div>
      <DisplayWeather weather={weather} />
    </div>
  );
}

export default App;
