import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

import {
  createPaymentOrder,
  verifyPayment,
} from "../../api/paymentApi";

import { createOrder } from "../../api/orderApi";

function Checkout() {
  const navigate = useNavigate();

  const { cart, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shipping = cartTotal >= 100 ? 0 : 10;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Place Order
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      return;
    }

    // =========================
    // COD
    // =========================

    if (paymentMethod === "cod") {
      try {
        setLoading(true);

        const orderData = {
          items: cart.map((item) => ({
            product: item._id || item.id,
            quantity: item.quantity,
          })),

          shippingAddress: {
            fullName: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },

          paymentMethod: "COD",
        };

        console.log("Sending order:", orderData);

        const data = await createOrder(orderData);

        console.log("Order created successfully:", data);

        setOrderPlaced(true);
        clearCart();
      } catch (error) {
        console.error("Place order error:", error);

        alert(
          error.message ||
            "Failed to place order. Please try again."
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    // =========================
    // Razorpay
    // =========================

    try {
      setLoading(true);

      // Create Razorpay order from backend
      const data = await createPaymentOrder(total);

      if (!data?.order?.id) {
        throw new Error("Razorpay order was not created");
      }

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay SDK failed to load. Please refresh the page."
        );
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency || "INR",

        name: "Your E-Commerce",

        description: "E-Commerce Purchase",

        order_id: data.order.id,

        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },

        notes: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },

        theme: {
          color: "#2563EB",
        },

        // =========================
        // Payment Success
        // =========================

        handler: async function (response) {
          try {
            setLoading(true);

            const verification = await verifyPayment({
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            });

            if (verification.success) {
              setOrderPlaced(true);
              clearCart();
            } else {
              alert(
                "Payment verification failed."
              );
            }
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            alert(
              error.message ||
                "Payment verification failed. Please contact support."
            );
          } finally {
            setLoading(false);
          }
        },

        // =========================
        // Razorpay Closed
        // =========================

        modal: {
          ondismiss: function () {
            setLoading(false);

            console.log(
              "Razorpay payment popup closed"
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      // =========================
      // Payment Failed
      // =========================

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          setLoading(false);

          alert(
            response.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay payment error:",
        error
      );

      alert(
        error.message ||
          "Unable to start payment. Please try again."
      );

      setLoading(false);
    }
  };

  // =========================
  // Order Success
  // =========================

  if (orderPlaced) {
    return (
      <main className="min-h-[70vh] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <Package className="h-9 w-9 text-green-600" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#0F172A]">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#64748B]">
            Thank you for your order. Your order has been
            successfully placed.
          </p>

          <div className="mt-6 rounded-2xl bg-[#EFF6FF] p-5">
            <p className="text-xs uppercase tracking-wide text-[#64748B]">
              Order Total
            </p>

            <p className="mt-1 text-2xl font-bold text-[#2563EB]">
              ₹{total.toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            Continue Shopping
          </button>

        </div>
      </main>
    );
  }

  // =========================
  // Empty Cart
  // =========================

  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 text-center shadow-sm">

          <h1 className="text-3xl font-bold text-[#0F172A]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm text-[#64748B]">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to Shop
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8">

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Checkout
          </h1>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* =========================
                Left
            ========================= */}

            <div className="space-y-6">

              {/* Customer Information */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
                    <CreditCard className="h-5 w-5 text-[#2563EB]" />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#0F172A]">
                      Customer Information
                    </h2>

                    <p className="text-xs text-[#64748B]">
                      Enter your contact details
                    </p>
                  </div>

                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />

                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />

                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />

                </div>

              </section>

              {/* Shipping Address */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
                    <MapPin className="h-5 w-5 text-[#2563EB]" />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#0F172A]">
                      Shipping Address
                    </h2>

                    <p className="text-xs text-[#64748B]">
                      Where should we deliver your order?
                    </p>
                  </div>

                </div>

                <div className="mt-6 space-y-4">

                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no, street, area"
                    required
                  />

                  <div className="grid gap-4 sm:grid-cols-3">

                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Raipur"
                      required
                    />

                    <Input
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Chhattisgarh"
                      required
                    />

                    <Input
                      label="PIN Code"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="492001"
                      required
                    />

                  </div>

                </div>

              </section>

              {/* Payment */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
                    <CreditCard className="h-5 w-5 text-[#2563EB]" />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#0F172A]">
                      Payment Method
                    </h2>

                    <p className="text-xs text-[#64748B]">
                      Choose your preferred payment option
                    </p>
                  </div>

                </div>

                <div className="mt-6 space-y-3">

                  {/* COD */}

                  <PaymentOption
                    value="cod"
                    selected={paymentMethod === "cod"}
                    onChange={setPaymentMethod}
                    title="Cash on Delivery"
                    description="Pay when your order arrives"
                  />

                  {/* UPI */}

                  <PaymentOption
                    value="upi"
                    selected={paymentMethod === "upi"}
                    onChange={setPaymentMethod}
                    title="UPI"
                    description="Pay using Razorpay"
                  />

                  {/* Card */}

                  <PaymentOption
                    value="card"
                    selected={paymentMethod === "card"}
                    onChange={setPaymentMethod}
                    title="Credit / Debit Card"
                    description="Pay securely using Razorpay"
                  />

                </div>

              </section>

            </div>

            {/* =========================
                Right - Order Summary
            ========================= */}

            <div className="h-fit lg:sticky lg:top-24">

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-[#0F172A]">
                  Order Summary
                </h2>

                {/* Products */}

                <div className="mt-6 space-y-4">

                  {cart.map((item) => (
                    <div
                      key={item.id || item._id}
                      className="flex gap-3"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">

                        <p className="line-clamp-2 text-sm font-semibold text-[#0F172A]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-[#64748B]">
                          Qty: {item.quantity}
                        </p>

                      </div>

                      <p className="text-sm font-bold text-[#0F172A]">
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                    </div>
                  ))}

                </div>

                <div className="my-6 h-px bg-slate-200" />

                {/* Subtotal */}

                <div className="flex justify-between text-sm">

                  <span className="text-[#64748B]">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#0F172A]">
                    ₹{cartTotal.toFixed(2)}
                  </span>

                </div>

                {/* Shipping */}

                <div className="mt-4 flex justify-between text-sm">

                  <span className="text-[#64748B]">
                    Shipping
                  </span>

                  <span className="font-semibold text-[#0F172A]">
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping.toFixed(2)}`}
                  </span>

                </div>

                <div className="my-5 h-px bg-slate-200" />

                {/* Total */}

                <div className="flex items-center justify-between">

                  <span className="font-semibold text-[#0F172A]">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#2563EB]">
                    ₹{total.toFixed(2)}
                  </span>

                </div>

                {/* Place Order */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <ShieldCheck className="h-5 w-5" />

                  {loading
                    ? "Processing..."
                    : paymentMethod === "cod"
                    ? "Place Order"
                    : "Pay with Razorpay"}

                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#64748B]">
                  Your payment and personal information are secure.
                </p>

              </section>

            </div>

          </div>

        </form>

      </div>

    </main>
  );
}

{/* =========================
   Input Component
========================= */}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#0F172A]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
      />

    </div>
  );
}

{/* =========================
   Payment Option
========================= */}

function PaymentOption({
  value,
  selected,
  onChange,
  title,
  description,
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
        selected
          ? "border-[#2563EB] bg-[#EFF6FF]"
          : "border-slate-200 hover:border-[#2563EB]/40"
      }`}
    >

      <input
        type="radio"
        name="payment"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="h-4 w-4 accent-[#2563EB]"
      />

      <div>

        <p className="text-sm font-semibold text-[#0F172A]">
          {title}
        </p>

        <p className="mt-1 text-xs text-[#64748B]">
          {description}
        </p>

      </div>

    </label>
  );
}

export default Checkout;