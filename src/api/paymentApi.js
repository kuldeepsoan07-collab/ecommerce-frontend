const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const createPaymentOrder = async (amount) => {
  const response = await fetch(
    `${API_URL}/payment/create-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create payment order"
    );
  }

  return data;
};

export const verifyPayment = async (paymentData) => {
  const response = await fetch(
    `${API_URL}/payment/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Payment verification failed"
    );
  }

  return data;
};