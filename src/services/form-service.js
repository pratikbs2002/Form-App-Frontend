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

export async function getAllForms(
  pageNumber = 0,
  pageSize = 5,
  sortBy = "id",
  sortDir = "asc"
) {
  return await fetch(
    `${hostUrl}/api/forms/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
      },
    }
  );
}

export async function deleteFormById(formId) {
  return await fetch(`${hostUrl}/api/forms/${formId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export async function editFormById(data, formId) {
  return await fetch(`${hostUrl}/api/forms/edit/${formId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: JSON.stringify(data),
  });
}


export async function submitForm(data) {
  console.log(data);
  
  return await fetch(`${hostUrl}/api/fillform/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: JSON.stringify(data),
  });
}