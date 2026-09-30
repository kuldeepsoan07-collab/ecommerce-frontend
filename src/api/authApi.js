const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";


// ===============================
// REGISTER
// ===============================
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}


// ===============================
// LOGIN
// ===============================
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}


// ===============================
// GET ME
// ===============================
export async function getMe(accessToken) {
  const response = await fetch(`${API_URL}/auth/get-me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get user");
  }

  return data;
}


// ===============================
// REFRESH TOKEN
// ===============================
export async function refreshToken() {
  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Token refresh failed");
  }

  return data;
}


// ===============================
// LOGOUT
// ===============================
export async function logoutUser() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
}


// ===============================
// LOGOUT ALL
// ===============================
export async function logoutAllUsers(accessToken) {
  const response = await fetch(`${API_URL}/auth/logout-all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout all failed");
  }

  return data;
}