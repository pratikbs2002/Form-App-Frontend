/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./Navbar.css";
import { GiExitDoor } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { MdOutlineSettings } from "react-icons/md";

function ProfileDropdown({ logoutClick, dropdown }) {
  return (
    <div className={`profile-dropdown ${dropdown ? "show" : ""}`}>
      <ul>
        <li>
          <div className="dropdown-icon">
            <ImProfile />
          </div>
          <div>Profile</div>
        </li>
        <li>
          <div className="dropdown-icon">
            <MdOutlineSettings />
          </div>
          <div>Settings</div>
        </li>
        <li onClick={logoutClick}>
          <div className="dropdown-icon">
            <GiExitDoor />
          </div>
          <div>Logout</div>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
