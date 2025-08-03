export default function CityInput({ city, setCity, error, setError }) {
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
    />
  );
}
