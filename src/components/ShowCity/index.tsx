interface CityProps {
  id: string;
  name: string;
  stateName: string;
}

const ShowCity: React.FC<CityProps> = ({ id, name, stateName }) => {
  return (
    <tr className="weather-card">
      <td>{id}</td>
      <td>{name}</td>
      <td>{stateName}</td>
      <td>None</td>
    </tr>
  );
};

export default ShowCity;
