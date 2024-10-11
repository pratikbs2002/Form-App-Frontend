const hostUrl = `${import.meta.env.VITE_SERVER_URL}`;

export async function getAllUser() {
  return await fetch(`${hostUrl}/api/user/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export async function getUserWithUsername(username) {
  return await fetch(`${hostUrl}/api/user/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

// to add admin (add by existing admin)
export async function addAdmin() {
  return await fetch(`${hostUrl}/api/user/add/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: JSON.stringify({
      username: "pratik",
    }),
  });
}
