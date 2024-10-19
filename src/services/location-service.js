const hostUrl = `${import.meta.env.VITE_SERVER_URL}`;

export async function addLocation(data) {
  return await fetch(`${hostUrl}/api/locations/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: JSON.stringify(data),
  });
}

export async function deleteLocation(data) {
  return await fetch(`${hostUrl}/api/locations/delete/${data}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export async function updateLocation(data) {
  return await fetch(`${hostUrl}/api/locations/update/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: data.name,
  });
}
