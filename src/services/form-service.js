const hostUrl = `${import.meta.env.VITE_SERVER_URL}/auth`;

export async function addCreatedForm(data) {
  return await fetch(`${hostUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      createForm: data,
    }),
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
