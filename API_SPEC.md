# SabziMitra API Specification & Endpoints Contract

Base URL: `http://localhost:5000/api`

---

## 1. Authentication Module (`/auth`)

### `POST /auth/send-otp`
Sends a 6-digit verification OTP to the user's mobile number.
- **Request Body**:
  ```json
  { "phone": "+919876543210" }
  ```
- **Response `200 OK`**:
  ```json
  { "success": true, "message": "OTP sent successfully", "demoOtp": "123456" }
  ```

### `POST /auth/verify-otp`
Verifies OTP and returns JWT token + user profile.
- **Request Body**:
  ```json
  { "phone": "+919876543210", "otp": "123456", "role": "CUSTOMER" }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "usr_01",
      "phone": "+919876543210",
      "name": "Aarav Sharma",
      "role": "CUSTOMER"
    }
  }
  ```

---

## 2. Product Catalog Module (`/products`)

### `GET /products`
Retrieve fresh produce catalog with optional filters.
- **Query Params**: `category`, `search`, `inStock`
- **Response `200 OK`**:
  ```json
  [
    {
      "id": "prod_tomato",
      "nameEn": "Hybrid Fresh Tomato",
      "nameHi": "ताज़ा हाइब्रिड टमाटर",
      "category": "essentials",
      "pricePerKg": 38,
      "mandiRatePerKg": 32,
      "stockKg": 140,
      "freshness": "Harvested 3h ago",
      "organic": false,
      "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500"
    }
  ]
  ```

### `PUT /products/:id/price`
Vendor/Admin updates daily mandi price or stock.
- **Request Body**:
  ```json
  { "pricePerKg": 40, "stockKg": 120 }
  ```

---

## 3. Cart & Coupon Module (`/coupons`)

### `POST /coupons/apply`
Validates coupon against cart total.
- **Request Body**:
  ```json
  { "code": "FRESH50", "cartTotal": 299 }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "discount": 50,
    "message": "₹50 instant discount applied!"
  }
  ```

---

## 4. Order Management Module (`/orders`)

### `POST /orders/create`
Places a customer order.
- **Request Body**:
  ```json
  {
    "items": [
      { "productId": "prod_tomato", "quantityGrams": 1000, "price": 38 },
      { "productId": "prod_palak", "quantityGrams": 500, "price": 20 }
    ],
    "deliveryMode": "EXPRESS_DELIVERY",
    "deliveryAddress": {
      "flat": "Flat 402, Green Meadows",
      "landmark": "Near Mandi Gate",
      "city": "Jaipur",
      "pincode": "302020"
    },
    "paymentMode": "PHONEPE_UPI",
    "couponCode": "FRESH50",
    "totalAmount": 58
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "order": {
      "id": "ORD-89210",
      "status": "PLACED",
      "deliveryOtp": "4928",
      "estimatedDeliveryMins": 22,
      "createdAt": "2026-08-19T11:45:00Z"
    }
  }
  ```

### `PATCH /orders/:id/status`
Updates order status across lifecycle.
- **Request Body**:
  ```json
  { "status": "ACCEPTED" | "PACKED" | "PICKED_UP" | "OUT_FOR_DELIVERY" | "DELIVERED" }
  ```

---

## 5. Vendor & KYC Module (`/vendors`)

### `POST /vendors/kyc`
Submits vendor verification documents.
- **Request Body**:
  ```json
  {
    "shopName": "Sharma Sabzi Bhandar",
    "ownerName": "Ramesh Sharma",
    "mandiLicense": "MND-2026-8819",
    "aadhaarNumber": "XXXX-XXXX-9182",
    "bankAccount": "SBIN0001234",
    "address": "Shop #14, APMC Mandi, Jaipur"
  }
  ```

---

## 6. Delivery Partner Module (`/delivery`)

### `GET /delivery/active-trips`
Fetches pending deliveries available for assignment.
### `POST /delivery/verify-otp`
Verifies customer delivery OTP to mark order fulfilled.
- **Request Body**:
  ```json
  { "orderId": "ORD-89210", "otp": "4928" }
  ```

---

## 7. Super Admin Module (`/admin`)

### `GET /admin/stats`
Platform KPI overview (Total Revenue, Orders, Vendor count, Active Riders).
### `POST /admin/vendors/:id/verify`
Approves or Rejects vendor KYC.
- **Request Body**:
  ```json
  { "status": "APPROVED", "notes": "Documents verified against Mandi registrar" }
  ```
### `POST /admin/settings/commission`
Updates platform take rate percentage.
- **Request Body**:
  ```json
  { "commissionRatePercent": 8.5 }
  ```
