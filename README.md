# 🛒 Maison - Full Stack E-Commerce Website

A modern full-stack e-commerce web application built with React, Node.js, Express.js and MongoDB.

The application provides a complete shopping experience including authentication, product browsing, cart management, checkout, order tracking and an admin panel for product and order management.

---

## 🌐 Live Demo

### Frontend

https://ecommerce-frontend-9ryvmxj0n-kul8.vercel.app

### Backend API

https://ecommerce-backend-if10.onrender.com

---

## ✨ Features

### 👤 User Features

- User Registration
- User Login
- JWT Authentication
- User Logout
- Browse Products
- Search Products
- Product Categories
- Product Sorting
- Product Details
- Add to Cart
- Update Cart Quantity
- Remove Products from Cart
- Cart Persistence after Refresh
- Wishlist
- Checkout
- Shipping Address
- Multiple Payment Methods
- Place Orders
- View My Orders
- Order Status Tracking

---

## 👑 Admin Features

- Protected Admin Dashboard
- Admin Authentication
- Product Management
- Add New Products
- Edit Products
- Delete Products
- Product Stock Management
- Product Image Upload
- Cloudinary Image Storage
- View All Orders
- Update Order Status

### Order Status

- Pending
- Processing
- Shipped
- Delivered
- Cancelled

---

## ☁️ Image Upload

Product images are uploaded using Cloudinary.

```text
Admin
  ↓
Select Product Image
  ↓
Frontend
  ↓
Backend API
  ↓
Multer
  ↓
Cloudinary
  ↓
Image URL
  ↓
MongoDB
