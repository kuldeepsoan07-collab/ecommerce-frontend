import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const emptyForm = {
  name: "",
  description: "",
  brand: "",
  category: "electronics",
  price: "",
  originalPrice: "",
  discount: "",
  stock: "",
  rating: "",
  reviews: "",
  image: "",
  badge: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/products`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(
        "Fetch products error:",
        error
      );

      setError(
        error.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // IMAGE SELECT
  // =========================
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Check file size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image size must be less than 5MB."
      );
      return;
    }

    setError("");
    setSelectedImage(file);
  };

  // =========================
  // UPLOAD IMAGE TO CLOUDINARY
  // =========================
  const handleImageUpload = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    try {
      setUploadingImage(true);
      setError("");

      const token =
        localStorage.getItem("accessToken");

      if (!token) {
        throw new Error(
          "Please login first."
        );
      }

      const imageFormData = new FormData();

      imageFormData.append(
        "image",
        selectedImage
      );

      const response = await fetch(
        `${API_URL}/upload/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageFormData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Image upload failed"
        );
      }

      if (!data.imageUrl) {
        throw new Error(
          "Cloudinary image URL not received."
        );
      }

      // Save Cloudinary URL in product form
      setFormData((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));

      setSelectedImage(null);

      // Reset file input
      const fileInput =
        document.getElementById(
          "product-image"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      setError("");

      alert(
        "Image uploaded successfully!"
      );
    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      setError(
        error.message ||
          "Image upload failed."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setSelectedImage(null);
    setError("");

    const fileInput =
      document.getElementById(
        "product-image"
      );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const token =
        localStorage.getItem("accessToken");

      if (!token) {
        throw new Error(
          "Please login first."
        );
      }

      // Image required
      if (!formData.image) {
        throw new Error(
          "Please upload a product image first."
        );
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        brand: formData.brand,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(
          formData.originalPrice
        ),
        discount: Number(
          formData.discount || 0
        ),
        stock: Number(formData.stock),
        rating: Number(
          formData.rating || 0
        ),
        reviews: Number(
          formData.reviews || 0
        ),
        image: formData.image,
        badge: formData.badge,
      };

      const url = editingId
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save product"
        );
      }

      resetForm();

      await fetchProducts();
    } catch (error) {
      console.error(
        "Save product error:",
        error
      );

      setError(
        error.message ||
          "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const handleEdit = (product) => {
    setEditingId(product._id);

    setSelectedImage(null);

    setFormData({
      name: product.name || "",
      description:
        product.description || "",
      brand: product.brand || "",
      category:
        product.category || "electronics",
      price: product.price ?? "",
      originalPrice:
        product.originalPrice ?? "",
      discount: product.discount ?? "",
      stock: product.stock ?? "",
      rating: product.rating ?? "",
      reviews: product.reviews ?? "",
      image: product.image || "",
      badge: product.badge || "",
    });

    const fileInput =
      document.getElementById(
        "product-image"
      );

    if (fileInput) {
      fileInput.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const token =
        localStorage.getItem("accessToken");

      if (!token) {
        throw new Error(
          "Please login first."
        );
      }

      const response = await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete product"
        );
      }

      await fetchProducts();
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete product"
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Products
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Add, edit and delete products.
            </p>
          </div>

          <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
            <span className="text-sm text-slate-500">
              Total Products
            </span>

            <p className="text-2xl font-bold text-blue-600">
              {products.length}
            </p>
          </div>

        </div>

        {/* =========================
            ERROR
        ========================= */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =========================
            FORM
        ========================= */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold text-slate-900">
              {editingId
                ? "Edit Product"
                : "Add Product"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
                Cancel
              </button>
            )}

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >

            {/* =========================
                NAME
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Product Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Premium Laptop"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                BRAND
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Brand
              </label>

              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Apple / Samsung / Nike"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                DESCRIPTION
            ========================= */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter product description"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                CATEGORY
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="fashion">
                  Fashion
                </option>

                <option value="electronics">
                  Electronics
                </option>

                <option value="laptops">
                  Laptops
                </option>

                <option value="watches">
                  Watches
                </option>

                <option value="bags">
                  Bags
                </option>

                <option value="headphones">
                  Headphones
                </option>

                <option value="home-living">
                  Home & Living
                </option>

                <option value="fitness">
                  Fitness
                </option>
              </select>
            </div>

            {/* =========================
                PRICE
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="599"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                ORIGINAL PRICE
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Original Price
              </label>

              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                required
                min="0"
                placeholder="699"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                DISCOUNT
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Discount (%)
              </label>

              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                placeholder="14"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                STOCK
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="50"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                RATING
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                placeholder="4.5"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                REVIEWS
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Reviews
              </label>

              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                min="0"
                placeholder="120"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                CLOUDINARY IMAGE
            ========================= */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
                Product Image
              </label>

              <div className="rounded-xl border border-dashed border-slate-300 p-5">

                {/* File Input */}
                <input
                  id="product-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="w-full cursor-pointer text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
                />

                <p className="mt-2 text-xs text-slate-500">
                  JPG, PNG, WEBP etc. Maximum size: 5MB
                </p>

                {/* Selected File */}
                {selectedImage && (
                  <div className="mt-4 rounded-lg bg-slate-50 p-3">

                    <p className="text-sm font-medium text-slate-700">
                      Selected:
                    </p>

                    <p className="mt-1 break-all text-sm text-slate-500">
                      {selectedImage.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {(
                        selectedImage.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </p>

                  </div>
                )}

                {/* Upload Button */}
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={
                    !selectedImage ||
                    uploadingImage
                  }
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Upload size={18} />

                  {uploadingImage
                    ? "Uploading to Cloudinary..."
                    : "Upload Image"}
                </button>

                {/* Current Image URL */}
                {formData.image && (
                  <div className="mt-5">

                    <p className="mb-3 text-sm font-semibold text-slate-700">
                      Uploaded Image
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="h-32 w-32 rounded-xl border border-slate-200 object-cover"
                      />

                      <div className="min-w-0 flex-1">

                        <p className="mb-1 text-xs font-medium text-slate-500">
                          Cloudinary URL
                        </p>

                        <p className="break-all rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                          {formData.image}
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* =========================
                BADGE
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Badge
              </label>

              <input
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="Sale / New / Popular"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* =========================
                SUBMIT BUTTON
            ========================= */}
            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={
                  saving ||
                  uploadingImage
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus size={20} />

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>

            </div>

          </form>
        </div>

        {/* =========================
            PRODUCTS TABLE
        ========================= */}
        <div className="rounded-2xl bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <h2 className="text-xl font-bold text-slate-900">
              All Products
            </h2>

          </div>

          {/* LOADING */}
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No products found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Brand
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Rating
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t border-slate-100"
                    >

                      {/* PRODUCT */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-4">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-14 w-14 rounded-lg object-cover"
                          />

                          <div>

                            <p className="font-semibold text-slate-900">
                              {product.name}
                            </p>

                            {product.badge && (
                              <span className="text-xs text-blue-600">
                                {product.badge}
                              </span>
                            )}

                          </div>

                        </div>

                      </td>

                      {/* BRAND */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {product.brand || "-"}
                      </td>

                      {/* CATEGORY */}
                      <td className="px-6 py-4 text-sm capitalize text-slate-600">
                        {product.category}
                      </td>

                      {/* PRICE */}
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        ₹{product.price}
                      </td>

                      {/* STOCK */}
                      <td className="px-6 py-4">

                        <span
                          className={
                            product.stock === 0
                              ? "font-semibold text-red-600"
                              : product.stock <= 5
                              ? "font-semibold text-orange-600"
                              : "font-semibold text-green-600"
                          }
                        >
                          {product.stock === 0
                            ? "Out of stock"
                            : product.stock}
                        </span>

                      </td>

                      {/* RATING */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        ⭐ {product.rating}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          {/* EDIT */}
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(product)
                            }
                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}