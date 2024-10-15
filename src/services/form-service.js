const hostUrl = `${import.meta.env.VITE_SERVER_URL}`;

export async function addCreatedForm(data) {
  return await fetch(`${hostUrl}/api/forms/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: JSON.stringify(data),
  });
}

export async function getFormById(formId) {
  return await fetch(`${hostUrl}/api/forms/${formId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export async function getAllForms() {
  return await fetch(`${hostUrl}/api/forms/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}
