import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser } from "../../services/user-service";
import SchemaForm from "./SchemaForm";
import UserTable from "./UserTable";
import "./DashBoard.css";
import { getAllSchema } from "../../services/schema-service";
import SchemaMappingTable from "./SchemaMappingTable";
import { useNavigate } from "react-router";
import UserForm from "../admin/UserForm";

export default function DashBoard() {
  const [load, setLoad] = useState(false);

  return (
    <div className="root-dashboard">
      <div className="root-section">
        <div className="root-section-title">User Table</div>
        <div className="root-section-data">
          <UserTable load={load} />
        </div>
      </div>
      <div className="root-section">
        <div className="root-section-title">Schema Table</div>
        <div className="root-section-data">
          <SchemaMappingTable load={load} />
        </div>
      </div>
      <div className="root-section">
        <div className="root-section-title">Schema Form</div>
        <div className="root-section-data">
          <SchemaForm load={load} setLoad={setLoad} />
        </div>
      </div>
    </div>
  );
}
