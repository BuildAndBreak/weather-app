import { getCoordinates } from "../services/weatherService";
import { useState, useEffect } from "react";

export function useCitySearch({ city, selectedCity, setPickedCity, setError }) {
  const [cityList, setCityList] = useState([]);

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
      } catch {
        setCityList([]);
        setError("Error fetching city list");
      }
    };

    if (city === selectedCity) {
      return;
    }
    setPickedCity(null);

    fetchCities();
  }, [city, selectedCity, setError, setPickedCity]);

  return { cityList, setCityList };
}
