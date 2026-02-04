# API Documentation

## Base URL
`https://sgproject.up.railway.app/api`

---

## 1. User Authentication

### 1.1 Signup User
**Method:** POST  
**URL:** `/resigter` *(Note: Spelling error in endpoint)*

#### Request Body:
```json
{
    "name": "admin",
    "email": "admin@example.com",
    "password": "admin12345"
}
```

#### Success Response (200):
```json
{
    "status": "success",
    "msg": "User created successfully.",
    "user": {
        "id": 4,
        "name": "admin",
        "email": "admin@example.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

#### Error Response (400):
```json
{
    "status": "error",
    "msg": "User with this email already exists."
}
```

---

### 1.2 Login Account User
**Method:** POST  
**URL:** `/login`

#### Request Body:
```json
{
    "email": "admin@example.com",
    "password": "admin12345"
}
```

#### Success Response (200):
```json
{
    "status": "success",
    "msg": "Logged in successfully",
    "user": {
        "name": "admin",
        "email": "admin@example.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

#### Error Response (401):
```json
{
    "status": "error",
    "msg": "Invalid credentials",
    "errors": [
        {
            "msg": "Invalid credentials"
        }
    ]
}
```

---

### 1.3 Update User *(Token Required)*
**Method:** POST  
**URL:** `/updateUser/:id`  
**Headers:** `Authorization: Bearer <token>`

#### Request Body:
```json
{
    "name": "testUpdateName",
    "email": "testUpdate@example.com",
    "password": "testing12345"
}
```

#### Success Response (200):
```json
{
    "status": "success",
    "msg": "User updated successfully",
    "userUpdated": 1
}
```

---

### 1.4 Delete User *(Token Required)*
**Method:** DELETE  
**URL:** `/deleteUser/:id`  
**Headers:** `Authorization: Bearer <token>`

#### Success Response (200):
```json
{
    "status": "error",  // Note: Status says "error" but message indicates success
    "msg": "Deleted user success",
    "deleteUser": 1
}
```

---

### 1.5 Find Single User *(Token Required)*
**Method:** GET  
**URL:** `/singleUser/:id`  
**Headers:** `Authorization: Bearer <token>`

#### Success Response (200):
```json
{
    "status": "success",
    "user": {
        "id": 4,
        "name": "admin",
        "email": "admin@example.com",
        "password": "$2b$10$...",
        "createdAt": "2026-02-01",
        "updatedAt": "2026-02-01"
    }
}
```

---

### 1.6 Get All Users *(Token Required)*
**Method:** GET  
**URL:** `/allUser`  
**Headers:** `Authorization: Bearer <token>`

#### Success Response (200):
```json
{
    "status": "success",
    "users": [
        {
            "id": 4,
            "name": "admin",
            "email": "admin@example.com",
            "createdAt": "2026-02-01",
            "updatedAt": "2026-02-01"
        },
        {
            "id": 5,
            "name": "sgAdmin",
            "email": "sg@example.com",
            "createdAt": "2026-02-01",
            "updatedAt": "2026-02-01"
        }
    ]
}
```

---

## 2. Product Management *(Token Required)*

### 2.1 Create Product
**Method:** POST  
**URL:** `/post/createProduct`  
**Headers:** `Authorization: Bearer <token>`

#### Request Body:
```json
{
    "name": "Happy Dreams Pillow Pack",
    "price": 19.99,
    "description": "Best pillow in the world. Very Comfy to sleep with",
    "mainCategory": "Sleeping Product",
    "subCategory": "Pillow",
    "size": ["xs", "s", "m", "l"],
    "images": [
        {
            "color": "grey",
            "image": "https://cdn.shopify.com/s/files/1/0193/5048/7104/products/4100-AGDM-CHAR-13-ben-soleimani-pillows-01_F_1125x.jpg?v=1674694582"
        },
        {
            "color": "white",
            "image": "https://m.media-amazon.com/images/I/61B-4BFn8DL.jpg"
        },
        {
            "color": "red",
            "image": "https://m.media-amazon.com/images/I/71k-vea-IoL.jpg"
        }
    ]
}
```

#### Success Response (200):
```json
{
    "status": "success",
    "msg": "Product created successfully",
    "product": {
        "id": 1,
        "name": "Happy Dreams Pillow Pack",
        "price": "19.99",
        "description": "Best pillow in the world. Very Comfy to sleep with",
        "mainCategory": "Sleeping Product",
        "subCategory": "Pillow",
        "size": ["xs", "s", "m", "l"],
        "images": [
            {
                "id": 1,
                "color": "grey",
                "image": "https://cdn.shopify.com/s/files/1/0193/5048/7104/products/4100-AGDM-CHAR-13-ben-soleimani-pillows-01_F_1125x.jpg?v=1674694582",
                "productId": 1,
                "updatedAt": "2026-02-01",
                "createdAt": "2026-02-01"
            }
            // ... more images
        ],
        "updatedAt": "2026-02-01",
        "createdAt": "2026-02-01"
    }
}
```

#### Error Response (500):
```json
{
    "status": "error",
    "msg": "Internal server error.",
    "errors": "notNull Violation: Product.price cannot be null"
}
```

---

### 2.2 Update Product Details
**Method:** POST  
**URL:** `/post/updateProduct/:id`  
**Headers:** `Authorization: Bearer <token>`

#### Request Body:
```json
{
    "name": "updateName",
    "price": 69.69,
    "description": "Best pillow in the world. Very Comfy to sleep with",
    "mainCategory": "Sleeping Product",
    "subCategory": "Pillow",
    "size": ["xs", "s", "m", "l"]
}
```

#### Success Response (200):
```json
{
    "status": "success",
    "msg": "Product updated successfully",
    "rowUpdated": 1
}
```

---

### 2.3 Update Product Images
**Method:** POST  
**URL:** `/post/updateImageProduct/:productId`  
**Headers:** `Authorization: Bearer <token>`

#### Request Body:
```json
{
    "images": [
        {
            "color": "testUpdateColor1",
            "image": "https://cdn.shopify.com/s/files/1/0193/5048/7104/products/4100-AGDM-CHAR-13-ben-soleimani-pillows-01_F_1125x.jpg?v=1674694582",
            "productId": 1
        }
        // ... more images
    ]
}
```

#### Success Response (200):
```json
{
    "status": "success",
    "msg": "Product images updated successfully",
    "data": {
        "productId": "1",
        "images": [
            {
                "id": 16,
                "color": "testUpdateColor1",
                "image": "https://cdn.shopify.com/s/files/1/0193/5048/7104/products/4100-AGDM-CHAR-13-ben-soleimani-pillows-01_F_1125x.jpg?v=1674694582",
                "productId": 1,
                "updatedAt": "2026-02-03",
                "createdAt": "2026-02-03"
            }
            // ... more images
        ]
    }
}
```

---

### 2.4 Delete Product with Images
**Method:** DELETE  
**URL:** `/post/deleteProductWithImage/:productId`  
**Headers:** `Authorization: Bearer <token>`

#### Success Response (200):
```json
{
    "status": "success",
    "msg": "Deleted Product success",
    "deletedProduct": 1,
    "deleteImage": 3
}
```

---

## 3. Product Viewing *(No Token Required)*

### 3.1 Get All Products
**Method:** GET  
**URL:** `/post/findAllProducts`

#### Success Response (200):
```json
[
    {
        "id": 1,
        "name": "Happy Dreams Pillow Pack",
        "price": "19.99",
        "description": "Best pillow in the world. Very Comfy to sleep with",
        "mainCategory": "Sleeping Product",
        "subCategory": "Pillow",
        "size": ["xs", "s", "m", "l"],
        "createdAt": "2026-02-01",
        "updatedAt": "2026-02-01",
        "images": [
            {
                "id": 1,
                "color": "grey",
                "image": "https://cdn.shopify.com/s/files/1/0193/5048/7104/products/4100-AGDM-CHAR-13-ben-soleimani-pillows-01_F_1125x.jpg?v=1674694582",
                "productId": 1,
                "createdAt": "2026-02-01",
                "updatedAt": "2026-02-01"
            }
            // ... more images
        ]
    }
]
```

---

### 3.2 Find Product by ID
**Method:** GET  
**URL:** `/post/findProductById/:id`

#### Success Response (200):
```json
{
    "id": 1,
    "name": "Happy Dreams Pillow Pack",
    "price": "19.99",
    "description": "Best pillow in the world. Very Comfy to sleep with",
    "mainCategory": "Sleeping Product",
    "subCategory": "Pillow",
    "size": ["xs", "s", "m", "l"],
    "createdAt": "2026-02-01",
    "updatedAt": "2026-02-01",
    "images": [
        {
            "id": 1,
            "color": "grey",
            "image": "https://cdn.shopify.com/s/files/1/0193/5048/7104/products/4100-AGDM-CHAR-13-ben-soleimani-pillows-01_F_1125x.jpg?v=1674694582",
            "productId": 1,
            "createdAt": "2026-02-01",
            "updatedAt": "2026-02-01"
        }
        // ... more images
    ]
}
```

---

### 3.3 Filter Products by Main Category
**Method:** GET  
**URL:** `/post/filterByMainCategory/:mainCategory`

#### Success Response (200):
```json
[
    {
        "id": 1,
        "name": "updateTest",
        "price": "19.99",
        "description": "Best pillow in the world. Very Comfy to sleep with",
        "mainCategory": "Sleeping Product",
        "subCategory": "Pillow",
        "size": ["xs", "s", "m", "l"],
        "createdAt": "2026-02-01",
        "updatedAt": "2026-02-02",
        "images": [
            // ... images array
        ]
    }
]
```

---

### 3.4 Filter Products by Sub Category
**Method:** GET  
**URL:** `/post/filterBySubCategory/:subCategory`

#### Success Response (200):
```json
[
    {
        "id": 1,
        "name": "updateTest",
        "price": "19.99",
        "description": "Best pillow in the world. Very Comfy to sleep with",
        "mainCategory": "Sleeping Product",
        "subCategory": "Pillow",
        "size": ["xs", "s", "m", "l"],
        "createdAt": "2026-02-01",
        "updatedAt": "2026-02-02",
        "images": [
            // ... images array
        ]
    }
]
```

---

### 3.5 Search Products by Name
**Method:** GET  
**URL:** `/post/searchForProduct/:name`

#### Success Response (200):
```json
[
    {
        "id": 1,
        "name": "updateName",
        "price": "69.69",
        "description": "Best pillow in the world. Very Comfy to sleep with",
        "mainCategory": "Sleeping Product",
        "subCategory": "Pillow",
        "size": ["xs", "s", "m", "l"],
        "createdAt": "2026-02-01",
        "updatedAt": "2026-02-03",
        "images": [
            // ... images array
        ]
    }
]
```

---

## Notes & Observations

1. **Authentication:** All routes under sections 1.3-1.6 and section 2 require a Bearer token in the Authorization header
2. **Typo:** The signup endpoint is `/resigter` instead of `/register`
3. **Inconsistent Response:** The delete user endpoint returns `"status": "error"` but with a success message
4. **Date Format:** All dates use `YYYY-MM-DD` format
5. **Image Management:** Products can have multiple images with associated colors
6. **Product Structure:** Products have mainCategory, subCategory, and size array fields
7. **Price Format:** Price is returned as a string in responses but sent as number in requests
8. **Search Endpoint:** The search endpoint uses path parameter for search query rather than query parameter