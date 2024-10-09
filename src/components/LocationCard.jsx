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
    <div>
      {locations.map((location) => (
        <div className="location-inside-container" key={location.id}>
          <div
            className="title-value"
            onClick={() => handleExpand(location.id)}
          >
            {location.name}
            {location.children.length !== 0 &&
              (!open ? <FaChevronDown /> : <FaChevronUp />)}
          </div>
          {open === location.id && (
            <div style={{ marginLeft: "20px" }}>
              <LocationCard parentId={location.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
