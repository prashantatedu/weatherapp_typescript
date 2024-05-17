import React, { useState } from "react";
import { Weather, weatherData } from "../../data/weatherData";
import WeatherCard from "../WeatherCard";
import "./index.css";
import { waitFor } from "@testing-library/dom";

const WeatherList: React.FC = () => {
  const [searchCity, setSearchCity] = useState("");
  const [favouriteCities, setFavouriteCities] = useState<Weather[]>([]);
  const [searchCities, setSeachCities] = useState<Weather[]>([]);

  type Degree = "C" | "F";
  const [degreeUnit, setDegreeUnit] = useState<Degree>("C");

  //check if the city is added to the favs
  const checkCityPresent = (cityId: number): boolean => {
    if (favouriteCities.length === 0) {
      return true;
    }

    const duplicateCity = favouriteCities?.find((city) => city.id === cityId);
    if (duplicateCity) {
      return false;
    } else {
      return true;
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(event.target.value);
    let enteredValue = event.target.value.toLowerCase();
    let filteredSearch: Weather[] = weatherData.filter((weather) => {
      return (
        enteredValue && weather.city.toLowerCase().startsWith(enteredValue)
      );
    });
    console.log({ filteredSearch });
    setSeachCities([...filteredSearch]);
  };

  const handleClearSearch = () => {
    setSearchCity("");
    setSeachCities([]);
  };

  console.log({ weatherData });
  const selectedCity: Weather[] = weatherData.filter((weather) => {
    console.log(weather.city, searchCity);
    return weather.city === searchCity;
  });
  let isFavorite = true;
  if (selectedCity.length) {
    let selectCity = selectedCity[0];
    isFavorite = checkCityPresent(selectCity.id);
  } else {
    isFavorite = false;
  }

  console.log({ selectedCity });
  const handleUnitChange = () => {
    if (degreeUnit === "C") {
      setDegreeUnit("F");
    } else {
      setDegreeUnit("C");
    }
  };

  const handleAddFavorite = (cityId: number) => {
    console.log({ cityId });
    const favCity: Weather[] =
      weatherData.filter((weather) => weather.id === cityId) || null;
    console.log({ favCity });
    setFavouriteCities([...favouriteCities, ...favCity]);
  };

  const handleRemoveFavorite = (cityId: number) => {
    const favCity: Weather[] =
      favouriteCities.filter((weather) => weather.id !== cityId) || null;
    setFavouriteCities([...favCity]);
  };

  return (
    <div
      className="layout-column align-items-center justify-content-start weather-list"
      data-testid="weather-list"
    >
      <h3>Dashboard</h3>
      <p className="city-details">
        Search for Current Temperature in cities like: New York, London, Paris
        etc.
      </p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleSearch}
            data-testid="search-input"
            value={searchCity}
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchCities.length > 0 &&
              searchCities.map((searchCity) => (
                <WeatherCard
                  key={searchCity.id}
                  weather={searchCity}
                  unit={degreeUnit}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  isFavorite={checkCityPresent(searchCity.id)}
                />
              ))}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button
            onClick={handleUnitChange}
            data-testid="unit-change-button"
            className="outlined"
          >
            Switch to {degreeUnit === "C" ? "Celsius" : "Fahrenheit"}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favouriteCities.length > 0 &&
              favouriteCities?.map((favoCity) => (
                <WeatherCard
                  key={favoCity.id}
                  weather={favoCity || {}}
                  unit={degreeUnit}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  isFavorite={false}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
