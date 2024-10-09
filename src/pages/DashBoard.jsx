import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { getCurrentSchema } from "../services/schema-service";
import LocationCard from "../components/LocationCard";

export default function DashBoard() {
  const { authData } = useAuth();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { username, password } = authData;

      const response = await getCurrentSchema();

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
      } else {
        console.log(response);
        const result = await response.json();
        console.log(result);
        setData(result);
      }
    };

    fetchData();
  }, [authData]);
  return (
    <div>
      {/* DashBoard:<br></br> {JSON.stringify(data)} */}
      {data && (
        <div className="container">
          <div className="inside-container">
            <div className="title">SchemaName</div>
            <div className="title-value">{data.schemaName}</div>
          </div>
          <div className="inside-container">
            <div className="title">SchemaUUID</div>
            <div className="title-value">{data.schemaUUID}</div>
          </div>
        </div>
      )}
      <div>
        <LocationCard />
      </div>
    </div>
  );
}
