const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";


// =========================
// LOGIN
// =========================
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();

    console.error("LOGIN NON-JSON RESPONSE:", text);

    throw new Error(
      `Server returned ${response.status} instead of JSON`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};


// =========================
// REGISTER
// =========================
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();

    console.error("REGISTER NON-JSON RESPONSE:", text);

    throw new Error(
      `Server returned ${response.status} instead of JSON`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Registration failed"
    );
  }

  return data;
};


// =========================
// VERIFY EMAIL
// =========================
export const verifyEmail = async (email, otp) => {
  const response = await fetch(
    `${API_URL}/auth/verify-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    }
  );

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();

    console.error("VERIFY NON-JSON RESPONSE:", text);

    throw new Error(
      `Server returned ${response.status} instead of JSON`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "OTP verification failed"
    );
  }

  return data;
};