import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser } from "../../services/user-service";
import SchemaForm from "./SchemaForm";
import SchemaTable from "./SchemaTable";
import "./DashBoard.css";

export default function DashBoard() {
  return (
    <div className="root-dashboard">
      <div className="root-section">
        <div className="root-section-title">Schema Table</div>
        <div className="root-section-data">
          <SchemaTable />
        </div>
      </div>
      <div className="root-section">
        <div className="root-section-title">Schema Form</div>
        <div className="root-section-data">
          <SchemaForm />
        </div>
      </div>
    </div>
  );
}
