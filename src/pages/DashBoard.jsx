import React, { useEffect, useState } from "react";
import { useAuth } from "../service/AuthProvider";

export default function DashBoard() {
  const { authData } = useAuth();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { username, password } = authData;

      const response = await fetch("http://localhost:9191/current-schema", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
      } else {
        console.log(response);
        const result = await response.json();
        setData(result);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      DashBoard:<br></br> {JSON.stringify(data)}
    </div>
  );
}
