import React, { useState } from "react";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

export default function UserManagement() {
  const [refresh, setRefresh] = useState(false);
  const props = {
    refresh: refresh,
    setRefresh: setRefresh,
  };
  return (
    <div className="root-dashboard">
      <UserForm {...props} />
      <UserTable refresh={refresh} />
    </div>
  );
}
