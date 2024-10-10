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
