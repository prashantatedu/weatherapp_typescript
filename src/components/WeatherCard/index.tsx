import React from "react";
import { Weather } from "../../data/weatherData";
import { waitFor } from "@testing-library/dom";

interface WeatherCardProps {
  weather: Weather;
  unit: "C" | "F";
  onAddFavorite: (cityId: number) => void;
  onRemoveFavorite: (cityId: number) => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  console.log({ weather });
  const handleAddFavoriteClick = () => {
    console.log("add to fav", weather.id);
    onAddFavorite(weather.id);
  };

  const handleRemoveFavoriteClick = () => {
    console.log("add to fav", weather.id);
    onRemoveFavorite(weather.id);
  };

  let absTemp = weather?.temperature;
  if (unit === "F") {
    absTemp = Math.floor(((weather?.temperature - 32) * 5) / 9);
  }

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>{weather?.city}</td>
      <td>{absTemp}</td>
      <td>{weather?.description}</td>
      <td>
        {isFavorite && (
          <button
            onClick={handleAddFavoriteClick}
            data-testid={`weather-card-action-${weather.id}`}
          >
            Add to favorites
          </button>
        )}
        {!isFavorite && (
          <button
            onClick={handleRemoveFavoriteClick}
            data-testid={`weather-card-action-${weather.id}`}
          >
            Remove from favorites
          </button>
        )}
      </td>
    </tr>
  );
};

export default WeatherCard;
