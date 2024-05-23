import { useState } from "react";
import MapIndia from "../MapIndia";
import "./index.css";
import ReactTooltip from "react-tooltip";
import { useQuery } from "react-query";
import axios from "axios";

type InfoTipType = string;

interface State {
  id: number;
  capital: string;
  latitude: string;
  longitude: string;
  name: string;
  state_code: string;
  type: string;
}

const WeatherMap: React.FC = () => {
  const [infoTip, setInfoTip] = useState<InfoTipType>("");
  let statescount = 0;
  let unionTerritories = 0;

  const fetchStateCapitals = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/statecapital");
      const data = resp;
      console.log({ data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: typedData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["statecapital"],
    queryFn: fetchStateCapitals,
  });

  let states: State[] = [];
  if (typedData) {
    states = typedData?.data[0]?.states || [];
  }

  const allStates = states?.filter((state) => state?.type === "state");
  const allUTs = states?.filter((state) => state?.type === "Union territory");

  for (let i = 0; i < states?.length; i++) {
    const currState = states[i];
    if (currState?.type === "Union territory") {
      unionTerritories++;
    }
    if (currState?.type === "state") {
      statescount++;
    }
  }
  return (
    <div className="mapcontainer">
      <div className="weathermap-container">
        <MapIndia setToolTip={setInfoTip} states={states} />
        <ReactTooltip html={true}>{infoTip}</ReactTooltip>
      </div>
      <div className="mapstats-container">
        <div className="mapstats-box">
          <span>Number of States</span>
          <span>{statescount}</span>
        </div>
        <div className="mapstats-box">
          <span>Number of UTs</span>
          <span>{unionTerritories}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
