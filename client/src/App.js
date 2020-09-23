import React, { useState, useEffect } from "react";
import Header from "./Header";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listLogEntries, deleteLogEntry } from "./API";
import LogEntryForm from "./LogEntryForm";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 23.795164,
    longitude: 120.795833,
    zoom: 7,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
    console.log(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (e) => {
    const [longitude, latitude] = e.lngLat;
    setShowPopup({});
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const removedID = await deleteLogEntry(id);
    console.log(removedID);
    getEntries();
  };

  return (
    <>
      <Header />
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/shawn-cheng/ckfcve2ir01e019p794n1gh9t"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        doubleClickZoom={false}
        onDblClick={showAddMarkerPopup}
      >
        {logEntries.map((entry, index) => (
          <React.Fragment key={entry._id}>
            <Marker latitude={entry.latitude} longitude={entry.longitude}>
              <svg
                viewBox="0 0 24 24"
                onClick={() => {
                  setShowPopup({ [entry._id]: true });
                  setAddEntryLocation(null);
                }}
                style={{
                  height: `${4 * viewport.zoom}`,
                  cursor: "pointer",
                  fill: "#f77b72",
                  stroke: "none",
                  transform: `translate(${(-4 * viewport.zoom) / 2}px,${
                    -4 * viewport.zoom
                  }px)`,
                }}
              >
                <path d={ICON} />
              </svg>
            </Marker>
            {showPopup[entry._id] && (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeOnClick={false}
                anchor="top"
              >
                <img
                  className="closeBtn"
                  src="close.svg"
                  alt="close button"
                  onClick={() => setShowPopup({})}
                />
                <div
                  className="popUp-container"
                  style={{
                    maxWidth: `calc(4vmin * ${viewport.zoom})`,
                  }}
                >
                  <h4 style={{ margin: "2px" }}>{entry.title}</h4>
                  {entry?.image && (
                    <img
                      className="logImage"
                      style={{
                        width: `calc(4vmin * ${viewport.zoom})`,
                        height: `calc(2.5vmin * ${viewport.zoom})`,
                      }}
                      src={entry.image}
                      alt="view"
                    />
                  )}
                  <p style={{ margin: "2px", alignSelf: "baseline" }}>
                    {entry.comments}
                  </p>
                  <small style={{ alignSelf: "flex-end" }}>
                    <i>
                      <p style={{ margin: "2px" }}>
                        {new Date(entry.visitDate).toLocaleDateString()}
                      </p>
                    </i>
                  </small>
                </div>
                <button
                  className="deleteBtn"
                  onClick={(e) => {
                    handleDelete(e, entry._id);
                  }}
                >
                  DELETE
                </button>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {addEntryLocation && (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <svg
                viewBox="0 0 24 24"
                style={{
                  height: `${4 * viewport.zoom}`,
                  cursor: "pointer",
                  fill: "#e91e63",
                  stroke: "none",
                  transform: `translate(${(-4 * viewport.zoom) / 2}px,${
                    -4 * viewport.zoom
                  }px)`,
                }}
              >
                <path d={ICON} />
              </svg>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeOnClick={false}
              anchor="top"
            >
              <img
                className="closeBtn"
                src="close.svg"
                alt="close button"
                onClick={() => setAddEntryLocation(null)}
              />
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
              />
            </Popup>
          </>
        )}
      </ReactMapGL>
    </>
  );
};

export default App;
