import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useLocationTree } from "../context/LocationTreeProvider";
import "./LocationCardView.css";

export default function LocationCardView({ parentId = null, setLocation }) {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(null);
  const { selectedLocation, setSelectedLocation, loadFlag } = useLocationTree();

  useEffect(() => {
    const fetchLocations = async () => {
      const url = parentId
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
    };

    fetchLocations();
  }, [loadFlag, parentId]);

  const handleExpand = (id) => {
    setOpen(open === id ? null : id);
    setSelectedLocation(id);
  };

  const handleLocationClick = (e, id, name) => {
    e.stopPropagation();
    console.log(name);
    setLocation((prev) => ({
      ...prev,
      id: id,
      name: name,
    }));
  };

  return (
    <div>
      {locations.map((location) => (
        <div key={location.id}>
          <div className="location-view-inside-container">
            <div
              className={`location-view-container ${
                open === location.id && selectedLocation === location.id
                  ? "hover"
                  : ""
              }`}
              onClick={(e) => {
                handleExpand(location.id),
                  handleLocationClick(e, location.id, location.name);
              }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="location-icon">
                  {location.havingChild ? (
                    open === location.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )
                  ) : (
                    <GoDotFill />
                  )}
                </div>

                <div
                  className="location-name"
                  // onClick={(e) =>
                  // }
                >
                  {location.name}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div className="add-location-view-button">
                  <FaChevronRight />
                </div>
              </div>
            </div>
          </div>

          {open === location.id && (
            <div style={{ marginLeft: "60px" }}>
              <LocationCardView parentId={location.id} setLocation={setLocation} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
