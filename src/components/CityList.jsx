export default function CityList({
  cityList,
  setCityList,
  setPickedCity,
  setCity,
}) {
  return (
    <>
      {cityList.length > 0 && (
        <ul className="bg-white m-2 shadow-lg rounded w-full max-w-sm z-10">
          {cityList.map((city, i) => (
            <li
              className="cursor-pointer hover:bg-blue-500 p-2 rounded hover:text-white"
              key={i}
              onClick={() => {
                setPickedCity({
                  name: city.name,
                  lat: city.lat,
                  lon: city.lon,
                });
                setCity(`${city.name}, ${city.country}`);
                setCityList([]);
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
