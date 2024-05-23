import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import ShowCity from "../ShowCity";
import "./index.css";
import { ChangeEvent, useState } from "react";

type CitiesParam = {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
};

const ListCities: React.FC = () => {
  const { state } = useLocation();
  const { stateId } = state;
  const [page, setPage] = useState(1);
  const rowsPerPageChoice = [5, 10, 15, 20];
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log("id in listcities is :", stateId);

  const fetchStateCities = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/stateandcities/${stateId}`
      );
      const respData = res.data;
      console.log("state and cities", respData);
      return respData;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["statecities"],
    queryFn: fetchStateCities,
  });

  if (isLoading) {
    return <div>Loading Cities</div>;
  }

  let currCities: CitiesParam[] = data?.cities || [];
  console.log(
    currCities.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
  );

  const handleRowPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(1);
  };

  const handlePageChange = (sign: string) => {
    if (sign === "-") {
      if (page <= 1) {
        setPage(1);
        return;
      }
      setPage((prepage) => prepage - 1);
    }
    if (sign === "+") {
      if (rowsPerPage * page < currCities?.length)
        setPage((prevpage) => prevpage + 1);
      return;
    }
  };

  console.log({ page });
  return (
    <div className="list-container">
      <div className="list-header">
        <h4>Cities of Travel Interest</h4>
      </div>
      <table className="">
        <thead className="list-header">
          <tr>
            <td>City Id</td>
            <td>City Name</td>
            <td>State</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            currCities &&
            currCities.length > 0 &&
            currCities
              .slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
              .map(({ id, name }) => (
                <ShowCity id={id} name={name} stateName={data?.name} />
              ))}
        </tbody>
        <tfoot>
          <td>
            <select
              name="cars"
              id="cars"
              onChange={(e) => handleRowPerPageChange(e)}
            >
              {rowsPerPageChoice.map((rowsperpagelimit, index) => (
                <option key={`rpp${index}`} value={rowsperpagelimit}>
                  {rowsperpagelimit}
                </option>
              ))}
            </select>
          </td>
          <td className="page-arrows">
            <button onClick={() => handlePageChange("-")} disabled={page <= 1}>
              &lArr;
            </button>
            <button
              onClick={() => handlePageChange("+")}
              disabled={rowsPerPage * (page + 1) > currCities?.length}
            >
              &rArr;
            </button>
          </td>
        </tfoot>
      </table>
    </div>
  );
};

export default ListCities;
