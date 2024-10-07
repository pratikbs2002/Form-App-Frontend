import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser } from "../../services/user-service";

export default function DashBoard() {
  const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUser(
          auth.authData.username,
          auth.authData.password
        );

        console.log(await response.json());
        if (response.status === 400) {
          console.log(await response.text());
        }
        if (response.status === 401) {
          console.log(await response.text());
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    fetchData();
  }, [auth.authData.password, auth.authData.username]);

  return <div>DashBoard</div>;
}
