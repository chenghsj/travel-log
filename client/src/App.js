import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "./Header";
import PopupContent from "./PopupContent";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

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
    latitude: 23.7,
    longitude: 120.9,
    zoom: 7,
  });
  const mapRef = useRef();

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
    console.log(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

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

  const markerSvg = (color, entry, clickable = true) => {
    return (
      <svg
        viewBox="0 0 24 24"
        onClick={
          clickable
            ? () => {
                setShowPopup({ [entry._id]: true });
                setAddEntryLocation(null);
              }
            : undefined
        }
        style={{
          cursor: "pointer",
          stroke: "none",
          fill: `${color}`,
          height: `${3 * viewport.zoom}`,
          transform: `translate(${(-3 * viewport.zoom) / 2}px,${
            -3 * viewport.zoom
          }px)`,
        }}
      >
        <path d={ICON} />
      </svg>
    );
  };

  return (
    <>
      <Header />
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/shawn-cheng/ckfcve2ir01e019p794n1gh9t"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={handleViewportChange}
        doubleClickZoom={false}
        onDblClick={showAddMarkerPopup}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="top-right"
        />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <NavigationControl />
        {logEntries.map((entry, index) => (
          <React.Fragment key={entry._id}>
            <Marker latitude={entry.latitude} longitude={entry.longitude}>
              {markerSvg("#f77b72", entry)}
            </Marker>
            {showPopup[entry._id] && (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeOnClick={false}
                anchor="top"
              >
                <PopupContent
                  entry={entry}
                  setShowPopup={setShowPopup}
                  viewport={viewport}
                  handleDelete={handleDelete}
                />
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
              {markerSvg("#e91e63", null, false)}
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
