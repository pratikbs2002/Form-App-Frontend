const hostUrl = `${import.meta.env.VITE_SERVER_URL}`;

export async function getCurrentSchema() {
  return await fetch(`${hostUrl}/api/fetch-schema/current-schema`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export async function addSchema(schemaName) {
  return await fetch(`${hostUrl}/api/schema/mg/${schemaName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}


export async function getAllSchema() {
  return await fetch(`${hostUrl}/api/schema-map/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}