export default function CityInput({
  city,
  setCity,
  error,
  setError,
  activeIndex,
  setActiveIndex,
  setPickedCity,
  setSelectedCity,
  cityList,
  setCityList,
}) {
  return (
    <input
      type="text"
      id="city-input"
      className="p-2 rounded border border-black w-full max-w-sm"
      placeholder="Type a city..."
      value={city}
      onChange={(e) => {
        setCity(e.target.value);
        if (error) setError(null);
      }}
      onKeyDown={(e) => {
        if (!cityList.length) return;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % cityList.length);
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev <= 0 ? cityList.length - 1 : prev - 1
          );
        }

        if (e.key === "Enter" && activeIndex >= 0) {
          e.preventDefault();
          const selected = cityList[activeIndex];
          setPickedCity(selected);
          setSelectedCity(`${selected.name}, ${selected.country}`);
          setCity(`${selected.name}, ${selected.country}`);
          setCityList([]);
          setActiveIndex(-1);
        }

        if (e.key === "Escape") {
          setActiveIndex(-1);
        }
      }}
    />
  );
}
