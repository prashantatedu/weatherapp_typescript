import "./index.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface ProjectionConfig {
  scale: number;
  center: [number, number];
}

interface State {
  id: number;
  capital: string;
  latitude: string;
  longitude: string;
  name: string;
  state_code: string;
  type: string;
}

interface MapDisplayProps {
  setToolTip: Dispatch<SetStateAction<string>>;
  states: State[];
}

const MapIndia: React.FC<MapDisplayProps> = ({ setToolTip, states }) => {
  //   const usUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  const urlIndia =
    "https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json";

  const PROJECTION_CONFIG: ProjectionConfig = {
    scale: 600,
    center: [78.9629, 22.5937],
  };
  const navigate = useNavigate();
  const handleStateClick = (geoId: string) => {
    navigate(`/listcities/${geoId}`, { state: { stateId: geoId } });
  };

  return (
    <div className="weathermap-container">
      <>
        <ComposableMap
          data-tip=""
          height={500}
          projection="geoMercator"
          projectionConfig={PROJECTION_CONFIG}
        >
          <Geographies geography={urlIndia}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#404040"
                    geography={geo}
                    fill="#121212"
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#04D", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    onClick={() => {
                      handleStateClick(geo.id);
                    }}
                  />
                ))}
              </>
            )}
          </Geographies>
          {states?.length > 0 &&
            states?.map((state) => (
              <>
                <Marker
                  key={state?.id}
                  coordinates={[+state.longitude, +state.latitude]}
                  onMouseEnter={() => setToolTip(`<div>${state.capital}</div>`)}
                  onMouseLeave={() => setToolTip("")}
                >
                  <circle
                    r={3}
                    fill={"#00ff00"}
                    stroke="#fff"
                    strokeWidth={0.5}
                  />
                </Marker>
              </>
            ))}
        </ComposableMap>
      </>
    </div>
  );
};

export default MapIndia;
