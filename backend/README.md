# Image Upload API - Backend

A simple and efficient RESTful API for managing image uploads built with Express.js and Multer.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Response Format](#response-format)
- [Error Handling](#error-handling)

## ✨ Features

- Upload single images (JPEG/PNG)
- Retrieve all uploaded images
- Delete multiple images at once
- File size validation (max 3MB)
- Automatic file naming with timestamps
- Consistent JSON response format
- File system-based storage

## 🛠 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload middleware
- **File System (fs)** - Data persistence

## 📁 Project Structure

```
backend/
├── controller/
│   └── imageController.js    # Business logic for image operations
├── data/
│   └── image.json            # Image metadata storage
├── middleware/               # Custom middleware (empty)
├── multer/
│   └── multerConfig.js       # Multer storage configuration
├── router/
│   └── imageRouter.js        # API route definitions
├── uploaded-images/          # Directory for uploaded image files
├── index.js                  # Application entry point
├── package.json              # Dependencies and scripts
└── README.md                 # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server with nodemon (auto-restart)
- `npm start` - Start the production server

## 📚 API Documentation

### Base URL

```
http://localhost:3000
```

---

### 1. Upload Image

Upload a single image file to the server.

**Endpoint:** `POST /api/image`

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | File | Yes | Image file (JPEG/PNG, max 3MB) |
| `fileTitle` | String | No | Custom title for the image |

**Example Request (cURL):**

```bash
curl -X POST http://localhost:3000/api/image \
  -F "image=@/path/to/your/image.jpg" \
  -F "fileTitle=My Beautiful Image"
```

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "filePath": "1731844200000-123456789.jpg",
    "fileTitle": "My Beautiful Image",
    "fileType": "image/jpeg",
    "fileSize": 102400,
    "fileCreatedAt": "2025-11-17T10:30:00.000Z",
    "fileUpdatedAt": "2025-11-17T10:30:00.000Z"
  },
  "message": "Image uploaded successfully"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "data": null,
  "message": "No file uploaded"
}
```

---

### 2. Get All Images

Retrieve a list of all uploaded images.

**Endpoint:** `GET /api/image`

**Example Request (cURL):**

```bash
curl http://localhost:3000/api/image
```

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "filePath": "1731844200000-123456789.jpg",
      "fileTitle": "My Beautiful Image",
      "fileType": "image/jpeg",
      "fileSize": 102400,
      "fileCreatedAt": "2025-11-17T10:30:00.000Z",
      "fileUpdatedAt": "2025-11-17T10:30:00.000Z"
    },
    {
      "id": 2,
      "filePath": "1731844300000-987654321.png",
      "fileTitle": "Another Image",
      "fileType": "image/png",
      "fileSize": 256000,
      "fileCreatedAt": "2025-11-17T10:35:00.000Z",
      "fileUpdatedAt": "2025-11-17T10:35:00.000Z"
    }
  ],
  "message": "Images retrieved successfully"
}
```

---

### 3. Delete Images

Delete one or more images by their IDs.

**Endpoint:** `DELETE /api/image`

**Content-Type:** `application/json`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ids` | Array[Number] | Yes | Array of image IDs to delete |

**Example Request (cURL):**

```bash
curl -X DELETE http://localhost:3000/api/image \
  -H "Content-Type: application/json" \
  -d '{"ids": [1, 2]}'
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "deletedCount": 2,
    "deletedImages": [
      {
        "id": 1,
        "filePath": "1731844200000-123456789.jpg",
        "fileTitle": "My Beautiful Image",
        "fileType": "image/jpeg",
        "fileSize": 102400,
        "fileCreatedAt": "2025-11-17T10:30:00.000Z",
        "fileUpdatedAt": "2025-11-17T10:30:00.000Z"
      },
      {
        "id": 2,
        "filePath": "1731844300000-987654321.png",
        "fileTitle": "Another Image",
        "fileType": "image/png",
        "fileSize": 256000,
        "fileCreatedAt": "2025-11-17T10:35:00.000Z",
        "fileUpdatedAt": "2025-11-17T10:35:00.000Z"
      }
    ],
    "notFoundIds": []
  },
  "message": "Images deleted successfully"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "data": null,
  "message": "Please provide an array of image IDs"
}
```

---

## 📋 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { /* response data or null */ },
  "message": "Success message"
}
```

### Error Response

```json
{
  "success": false,
  "data": null,
  "message": "Error message"
}
```

## ⚠️ Error Handling

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request succeeded |
| 201 | Created - Image uploaded successfully |
| 400 | Bad Request - Invalid input or missing required fields |
| 500 | Internal Server Error - Server-side error |

### Common Errors

**File Upload Errors:**

- `"No file uploaded"` - No file provided in the request
- `"Only JPEG and PNG image files are allowed!"` - Unsupported file format
- File size exceeds 3MB limit (handled by Multer)

**Delete Errors:**

- `"Please provide an array of image IDs"` - Missing or invalid `ids` array

## 🔒 File Constraints

- **Supported Formats:** JPEG, JPG, PNG
- **Maximum File Size:** 3 MB
- **Upload Limit:** 1 image per request

## 📝 Image Metadata

Each uploaded image is stored with the following metadata:

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Auto-incremented unique identifier |
| `filePath` | String | Stored filename on the server |
| `fileTitle` | String | User-provided or original filename |
| `fileType` | String | MIME type (e.g., image/jpeg) |
| `fileSize` | Number | File size in bytes |
| `fileCreatedAt` | String | ISO timestamp of upload |
| `fileUpdatedAt` | String | ISO timestamp of last update |

## 🧪 Testing with Postman

### 1. Upload Image

1. Create a new POST request
2. URL: `http://localhost:3000/api/image`
3. Body → form-data
4. Add key `image` (change type to File) and select an image
5. Add key `fileTitle` with value "My Image" (optional)
6. Send

### 2. Get All Images

1. Create a new GET request
2. URL: `http://localhost:3000/api/image`
3. Send

### 3. Delete Images

1. Create a new DELETE request
2. URL: `http://localhost:3000/api/image`
3. Headers → Add `Content-Type: application/json`
4. Body → raw → JSON
5. Add: `{"ids": [1, 2]}`
6. Send