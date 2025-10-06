export default function CityList({
  cityList,
  setCityList,
  setPickedCity,
  setSelectedCity,
  setCity,
  setError,
  activeIndex,
  setActiveIndex,
}) {
  return (
    <>
      {cityList.length > 0 && (
        <ul className="bg-white m-2 shadow-lg rounded w-full max-w-sm z-10">
          {cityList.map((city, i) => {
            console.log(i, activeIndex);
            return (
              <li
                className={`${
                  i === activeIndex ? "bg-blue-500" : ""
                } cursor-pointer hover:bg-blue-500 p-2 rounded hover:text-white`}
                key={city.name + city.country}
                onMouseEnter={() => {
                  console.log(i);
                  setActiveIndex(i);
                }}
                onClick={() => {
                  setPickedCity({
                    name: city.name,
                    lat: city.lat,
                    lon: city.lon,
                  });
                  setCity(`${city.name}, ${city.country}`);
                  setSelectedCity(`${city.name}, ${city.country}`);
                  setCityList([]);
                  setError(null);
                }}>
                {city.name}, {city.country}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
