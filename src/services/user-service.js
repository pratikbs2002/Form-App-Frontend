const hostUrl = `${import.meta.env.VITE_SERVER_URL}`;

export async function getAllUser(username, password) {
  console.log(username + password);

  return await fetch(`${hostUrl}/api/user/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
  });
}
