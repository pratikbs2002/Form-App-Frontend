import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./LocationCard.css";
export default function LocationCard({ parentId = null }) {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      let url = parentId
        ? `${import.meta.env.VITE_SERVER_URL}/api/locations/${parentId}`
        : `${import.meta.env.VITE_SERVER_URL}/api/locations/root`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(`${localStorage.username}:${localStorage.password}`),
        },
      });
      const data = await response.json();
      setLocations(data);
      console.log(data);
    };

    fetchLocations();
  }, [parentId]);

  const handleExpand = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div
      className=""
      // style={{
      //   borderLeft: "2px solid #252525",
      //   borderBottom: "2px solid #252525",
      // }}
    >
      {locations.map((location) => (
        <>
          <div className="location-inside-container" key={location.id}>
            <div
              className={`location-container ${
                open === location.id && !location.children.length ? "hover" : ""
              }`}
              style={{
                borderLeft:
                  open === location.id && location.children.length
                    ? "3px solid #0073e6"
                    : "",
                // borderBottom:
                //   open === location.id && !location.children.length
                //     ? "3px solid #0073e6"
                //     : "",
              }}
              onClick={() => handleExpand(location.id)}
            >
              <div className="location-name">{location.name}</div>
              <div className="location-icon">
                {location.children.length !== 0 &&
                  (open === location.id ? <FaChevronUp /> : <FaChevronDown />)}
              </div>
            </div>
          </div>
          {open === location.id && (
            <div style={{ marginLeft: "40px" }}>
              <LocationCard parentId={location.id} />
            </div>
          )}
        </>
      ))}
    </div>
  );
}
