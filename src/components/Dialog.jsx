import React, { useState } from "react";
import "./Dialog.css";
import LocationCard from "./LocationCardView";
export default function Dialog(props) {
  const location = props.location;
  const isAssignDialog = props.isAssignDialog;
  const [isOpen, setIsOpen] = useState(isAssignDialog ? true : false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div
      style={{
        width: "100%",
        gap: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!isAssignDialog && (
        <div
          style={{
            width: "100%",
            gap: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "0.5rem",
              paddingLeft: "1rem",
            }}
          >
            {location.name}
          </div>
          <div>
            <button type="button" onClick={openDialog}>
              Add Location
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-container">
              <div className="dialog-header">
                <h1>
                  <u>Select Location</u>
                </h1>
              </div>
              <div className="dialog-body">
                <div style={{ color: "red", fontWeight: "800" }}>
                  <div>{location.name}</div>
                </div>
                <div style={{ backgroundColor: "white", marginTop: "1rem" }}>
                  <LocationCard setLocation={props.setLocation} />
                </div>
              </div>
              <div className="dialog-footer">
                <div className="dialog-footer-button-container">
                  {props.isAssignDialog ? (
                    <>
                      <button
                        className="close-button"
                        type="button"
                        onClick={() => props.handleAssignForm(location.id)}
                      >
                        Assign
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="close-button"
                        type="button"
                        onClick={closeDialog}
                      >
                        Close
                      </button>

                      <button
                        className="done-button"
                        type="button"
                        onClick={closeDialog}
                      >
                        Done
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
