import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../api/orderApi";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllOrders();

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Fetch admin orders error:", error);

        setError(
          error.message || "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingOrderId(orderId);

      const data = await updateOrderStatus(
        orderId,
        status
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: data.order.orderStatus,
              }
            : order
        )
      );
    } catch (error) {
      console.error("Update status error:", error);

      alert(
        error.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Status color
  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <div className="mb-3 text-4xl">
            ⚠️
          </div>

          <h2 className="text-xl font-semibold text-red-600">
            Failed to Load Orders
          </h2>

          <p className="mt-2 text-gray-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Orders
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all customer orders
          </p>
        </div>

        {/* Total Orders */}
        <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>

          <p className="mt-1 text-3xl font-bold text-gray-900">
            {orders.length}
          </p>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <div className="mb-4 text-5xl">
              📦
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Orders Found
            </h2>

            <p className="mt-2 text-gray-500">
              There are no customer orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >

                {/* Order Header */}
                <div className="border-b p-5">
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    {/* Order ID */}
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Order ID
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        #
                        {order._id
                          .slice(-8)
                          .toUpperCase()}
                      </p>
                    </div>

                    {/* Customer */}
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Customer
                      </p>

                      <p className="mt-1 font-semibold text-gray-800">
                        {order.user?.name || "Unknown"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.user?.email || "No email"}
                      </p>
                    </div>

                    {/* Date */}
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Order Date
                      </p>

                      <p className="mt-1 font-medium text-gray-800">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="mb-2 text-xs font-medium text-gray-500">
                        Order Status
                      </p>

                      <select
                        value={order.orderStatus}
                        disabled={
                          updatingOrderId === order._id
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium capitalize outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="pending">
                          Pending
                        </option>

                        <option value="processing">
                          Processing
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>
                      </select>

                      {updatingOrderId === order._id && (
                        <span className="ml-2 text-xs text-gray-500">
                          Updating...
                        </span>
                      )}

                      <div
                        className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Products */}
                <div className="divide-y">
                  {order.items.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex gap-4 p-5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 font-medium text-gray-900">
                          ₹
                          {Number(item.price).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      <div className="hidden text-right sm:block">
                        <p className="text-xs text-gray-500">
                          Item Total
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                          ₹
                          {(
                            item.price * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="grid gap-5 border-t bg-gray-50 p-5 md:grid-cols-3">

                  {/* Payment Method */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Method
                    </p>

                    <p className="mt-1 font-semibold uppercase text-gray-800">
                      {order.paymentMethod}
                    </p>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Status
                    </p>

                    <p
                      className={`mt-1 font-semibold capitalize ${
                        order.paymentStatus === "paid"
                          ? "text-green-600"
                          : order.paymentStatus === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="md:text-right">
                    <p className="text-sm text-gray-500">
                      Total Amount
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      ₹
                      {Number(
                        order.totalAmount
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;