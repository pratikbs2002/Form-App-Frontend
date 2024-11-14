const hostUrl = `${import.meta.env.VITE_SERVER_URL}`;
const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
};
export async function getAllUser() {
  return await fetch(`${hostUrl}/api/user/all`, {
    method: "GET",
    headers,
  });
}

export async function getUserWithUsername(username) {
  return await fetch(`${hostUrl}/api/user/${username}`, {
    method: "GET",
    headers,
  });
}

// to add admin (add by existing admin)
export async function addAdmin(data) {
  return await fetch(`${hostUrl}/api/user/add/user`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
}

// Get Users by schemaName
export async function getUserBySchemaName(
  schemaUUID,
  page = 0,
  size = 10,
  role = null
) {
  // if (role === "all") {
  //   role = null;
  // }
  return await fetch(
    `${hostUrl}/api/user/all/${schemaUUID}?page=${page}&size=${size}&role=${role}`,
    {
      method: "GET",
      headers,
    }
  );
}

export async function getAllUserForRoot(page = 0, size = 5, role = null) {
  if (role === "all") {
    role = null;
  }
  return await fetch(
    `${hostUrl}/api/user/all/root?page=${page}&size=${size}&role=${role}`,
    {
      method: "GET",
      headers,
    }
  );
}

// Soft delete a user by ID
export async function softDeleteUser(userId) {
  return await fetch(`${hostUrl}/api/user/soft-delete/${userId}`, {
    method: "DELETE",
    headers,
  });
}

// Restore a soft-deleted user by ID
export async function restoreUser(userId) {
  return await fetch(`${hostUrl}/api/user/restore/${userId}`, {
    method: "PUT",
    headers,
  });
}
