const hostUrl = `${import.meta.env.VITE_SERVER_URL}/auth`;

export async function login(username, password) {
  return await fetch(`${hostUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
}
