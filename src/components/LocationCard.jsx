import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import "./LocationCard.css";
import { MdArrowForwardIos, MdDelete } from "react-icons/md";
import { addLocation, deleteLocation } from "../services/location-service";
import { IoCloseSharp, IoRemoveOutline } from "react-icons/io5";
import { Bounce, toast } from "react-toastify";
export default function LocationCard({ parentId = null }) {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [addLocationData, setAddLocationData] = useState({
    parentId: null,
    name: "",
  });

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
  }, [dialog, parentId]);

  const handleExpand = (id) => {
    console.log(id);

    setOpen(open === id ? null : id);
  };

  const handleLocationClick = (name) => {
    console.log(name);
  };
  const handleAddLocationButton = async () => {
    if (addLocationData.name === "") return;
    if (addLocationData.parentId === null) return;
    const res = await addLocation(addLocationData);
    const result = await res.json();
    console.log(result);
    setDialog(false);
    toast.success("Location added successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "dark",
      transition: Bounce,
      pauseOnHover: false,
    });
    setAddLocationData((prev) => {
      return { ...prev, name: "" };
    });
  };
  const handleAddButton = (parentId) => {
    setAddLocationData((p) => {
      return { ...p, parentId: parentId };
    });
    setDialog(true);
  };

  const handleLocationNameChange = (e) => {
    setAddLocationData((p) => {
      return { ...p, name: e.target.value };
    });
  };

  const handleDeleteLocation = async (id) => {
    const res = await deleteLocation(id);
    const result = await res.text();
    console.log(result);
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
                  {location.havingChild ? (
                    open === location.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )
                  ) : (
                    <FaMinus />
                  )}
                </div>
                <div
                  className="location-name"
                  onClick={() => handleLocationClick(location.name)}
                >
                  {location.name}
                </div>
              </div>
              <div style={{ display: "flex", gap: "30px" }}>
                <div
                  className="add-location-button"
                  onClick={() => handleDeleteLocation(location.id)}
                >
                  <MdDelete />
                </div>
                <div
                  className="add-location-button"
                  // onClick={() => handleAddLocationButton(location.parent_id)}
                  onClick={() => handleAddButton(location.id)}
                >
                  <FaPlus />
                </div>
                <div className="add-location-button">
                  <FaChevronRight />
                </div>
              </div>
            </div>
          </div>
          {open === location.id && (
            <div style={{ marginLeft: "60px" }}>
              <LocationCard parentId={location.id} />
            </div>
          )}
        </div>
      ))}
      <dialog className="dialog" open={dialog}>
        <div className="dialog-container">
          <div className="dialog-content-container">
            <div style={{ width: "100%" }}>
              <div
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "red",
                  float: "right",
                }}
                onClick={() => setDialog(false)}
              >
                <IoCloseSharp />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                // width: "100%",
                padding: "100px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div>
                  <input
                    name="addLocationData.name"
                    placeholder="location name"
                    onChange={handleLocationNameChange}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => handleAddLocationButton(location.parent_id)}
                  >
                    Add
                  </button>
                  <button onClick={() => setDialog(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
