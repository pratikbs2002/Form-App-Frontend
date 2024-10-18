import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import "./LocationCard.css";
import { MdArrowForwardIos } from "react-icons/md";
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
    console.log(id);

    setOpen(open === id ? null : id);
  };

  const handleLocationClick = (name) => {
    console.log(name);
  };

  return (
    <div>
      {locations.map((location) => (
        <div key={location.id}>
          <div className="location-inside-container">
            <div
              className={`location-container ${
                open === location.id && !location.havingChild ? "hover" : ""
              }`}
              // style={{
              //   borderLeft:
              //     open === location.id && location.havingChild
              //       ? "3px solid #0073e6"
              //       : "",
              // }} 
              onClick={() => handleExpand(location.id)}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="location-icon">
                  {location.havingChild &&
                    (open === location.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    ))}
                </div>
                <div
                  className="location-name"
                  onClick={() => handleLocationClick(location.name)}
                >
                  {location.name}
                </div>
              </div>
              <FaChevronRight />
            </div>
          </div>
          {open === location.id && (
            <div style={{ marginLeft: "60px" }}>
              <LocationCard parentId={location.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
