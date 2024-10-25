import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
  FaPlus,
} from "react-icons/fa";
import { MdDelete, MdDone, MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { Bounce, toast } from "react-toastify";
import {
  addLocation,
  deleteLocation,
  updateLocation,
} from "../services/location-service";
import { useLocationTree } from "../context/LocationTreeProvider";
import "./LocationCard.css";

export default function LocationCard({ parentId = null }) {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState(false);

  const [addLocationData, setAddLocationData] = useState({
    parentId: null,
    name: "",
  });
  const [updateData, setUpdateData] = useState({ id: null, name: "" });

  const {
    selectedLocation,
    setSelectedLocation,
    loadFlag,
    setLoadFlag,
    editFlag,
    setEditFlag,
  } = useLocationTree();

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
  }, [loadFlag, dialog, parentId]);

  const handleExpand = (id) => {
    setOpen(open === id ? null : id);
    setSelectedLocation(id);
    setEditFlag(null);
  };

  const handleLocationClick = (name) => {};

  const handleAddLocationButton = async () => {
    if (!addLocationData.name) {
      toast.error("Location cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    const res = await addLocation(addLocationData);
    const result = await res.json();

    toast.success("Location added successfully", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });

    setDialog(false);
    setAddLocationData({ ...addLocationData, name: "" });
    setLoadFlag(!loadFlag);
  };

  const handleDeleteLocation = async (event, id) => {
    event.stopPropagation();
    const res = await deleteLocation(id);
    const result = await res.text();
    console.log(result);

    toast.success("Location deleted successfully", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
    setLoadFlag(!loadFlag);
  };

  const handleEditLocation = async (event) => {
    event.stopPropagation();
    const res = await updateLocation(updateData);
    const result = await res.text();
    console.log(result);

    toast.success("Location updated successfully", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
    setEditFlag(null);
    setLoadFlag(!loadFlag);
  };

  const handleAddButton = (e, parentId) => {
    e.stopPropagation();
    setAddLocationData({ ...addLocationData, parentId });
    setDialog(true);
  };

  const handleLocationNameChange = (e) => {
    e.stopPropagation();
    setAddLocationData({ ...addLocationData, name: e.target.value });
  };

  const handleUpdateLocationNameChange = (e) => {
    setUpdateData({ ...updateData, name: e.target.value });
  };

  const handleEditLocationButton = (event, id, name) => {
    event.stopPropagation();
    setUpdateData({ id, name });
    setEditFlag(id);
  };

  return (
    <div>
      {locations.map((location) => (
        <div key={location.id}>
          <div className="location-inside-container">
            <div
              className={`location-container ${
                open === location.id && selectedLocation === location.id
                  ? "hover"
                  : ""
              }`}
              onClick={
                editFlag === location.id
                  ? () => {}
                  : () => handleExpand(location.id)
              }
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
                  onClick={() => handleLocationClick(location.name)}
                >
                  {editFlag === location.id ? (
                    <input
                      className="new-location-input-container"
                      name="addLocationData.name"
                      placeholder="New location"
                      value={updateData.name}
                      onChange={handleUpdateLocationNameChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    location.name
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                {open === location.id && selectedLocation === location.id && (
                  <>
                    {location.parent_id !== null &&
                      editFlag !== location.id && (
                        <>
                          <div
                            className="add-location-button"
                            onClick={(e) =>
                              handleEditLocationButton(
                                e,
                                location.id,
                                location.name
                              )
                            }
                          >
                            <MdEdit />
                          </div>
                          <div
                            className="add-location-button"
                            onClick={(e) =>
                              handleDeleteLocation(e, location.id)
                            }
                          >
                            <MdDelete />
                          </div>
                        </>
                      )}

                    {editFlag === location.id && (
                      <div
                        className="add-location-button"
                        style={{ minWidth: "40px" }}
                        onClick={(e) => handleEditLocation(e, location.id)}
                      >
                        <MdDone />
                      </div>
                    )}

                    {editFlag !== location.id && (
                      <div
                        className="add-location-button"
                        onClick={(e) => handleAddButton(e, location.id)}
                      >
                        <FaPlus />
                      </div>
                    )}
                  </>
                )}
                <div className="add-location-button">
                  <FaChevronRight />
                </div>
              </div>
            </div>
          </div>

          {open === location.id && (
            <div style={{ marginLeft: "60px" }}>
              {dialog && selectedLocation === location.id && (
                <div className="location-inside-container">
                  <div className="location-container">
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div
                        className="location-icon"
                        onClick={() => setDialog(false)}
                      >
                        <IoClose />
                      </div>

                      <div className="location-name" style={{ width: "100%" }}>
                        <input
                          className="new-location-input-container"
                          name="addLocationData.name"
                          placeholder="New location"
                          onChange={handleLocationNameChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "30px" }}>
                      <div
                        className="add-location-button"
                        style={{ minWidth: "40px" }}
                        onClick={() =>
                          handleAddLocationButton(location.parent_id)
                        }
                      >
                        <MdDone />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <LocationCard parentId={location.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
