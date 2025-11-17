# Image Gallery - Frontend

A modern, responsive image gallery application built with React, Vite, and shadcn/ui components with dark theme support.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

## ✨ Features

- 🖼️ **Masonry Grid Layout** - Responsive image gallery with beautiful masonry layout
- ⬆️ **Image Upload** - Drag and drop or click to upload images (JPEG/PNG, max 3MB)
- 📊 **Upload Progress** - Real-time upload progress bar with percentage
- ✅ **Image Selection** - Select multiple images with checkboxes
- 🗑️ **Bulk Delete** - Delete multiple images at once with confirmation dialog
- 🌙 **Dark Theme** - Beautiful dark theme using shadcn/ui components
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development

## 🛠 Tech Stack

- **React 19.2** - UI library
- **Vite 7.2** - Build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Axios 1.13** - HTTP client for API calls
- **React Responsive Masonry** - Masonry grid layout
- **Lucide React** - Icon library
- **Radix UI** - Headless UI components

## 📁 Folder Structure

```
frontend/
├── public/                    # Static assets
│   └── vite.svg              # Vite logo
├── src/
│   ├── assets/               # Images and static files
│   │   └── react.svg         # React logo
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── alert-dialog.jsx    # Alert dialog component
│   │   │   ├── button.jsx          # Button component
│   │   │   ├── card.jsx            # Card component
│   │   │   ├── checkbox.jsx        # Checkbox component
│   │   │   └── dialog.jsx          # Dialog component
│   │   ├── ImageCard.jsx           # Individual image card with selection
│   │   ├── ImageUploadDialog.jsx   # Upload dialog with progress
│   │   └── media.jsx               # Main gallery component
│   ├── lib/
│   │   └── utils.js          # Utility functions (cn helper)
│   ├── App.css               # App-specific styles
│   ├── App.jsx               # Root App component
│   ├── index.css             # Global styles and theme variables
│   └── main.jsx              # Application entry point
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── jsconfig.json             # JavaScript configuration (path aliases)
├── package.json              # Dependencies and scripts
├── README.md                 # This file
└── vite.config.js            # Vite configuration

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on port 3000 (see backend README)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the frontend root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file in the frontend root directory:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` |

**Example `.env` file:**
```env
VITE_API_URL=http://localhost:3000/api
```

## 📜 Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot-reload at `http://localhost:5173`

### Build

```bash
npm run build
```
Builds the app for production to the `dist` folder

### Preview

```bash
npm run preview
```
Preview the production build locally

### Lint

```bash
npm run lint
```
Run ESLint to check for code issues

## 🎨 Component Overview

### Main Components

#### **MediaGallery** (`media.jsx`)
- Main gallery component
- Manages image state and selection
- Handles upload and delete operations
- Responsive masonry grid layout

#### **ImageCard** (`ImageCard.jsx`)
- Individual image card component
- Shows image with title and metadata
- Checkbox for selection
- Hover effects and gradients

#### **ImageUploadDialog** (`ImageUploadDialog.jsx`)
- Modal dialog for image upload
- File picker with drag-and-drop
- Image preview before upload
- Real-time progress bar with axios

### UI Components (shadcn/ui)

Located in `src/components/ui/`:
- `alert-dialog.jsx` - Confirmation dialogs
- `button.jsx` - Styled button variants
- `card.jsx` - Card container component
- `checkbox.jsx` - Custom checkbox
- `dialog.jsx` - Modal dialog component

## 🎯 Key Features Explained

### 1. Image Upload
- Click "Upload Image" button
- Select JPEG/PNG image (max 3MB)
- Preview image before upload
- Watch real-time upload progress
- Auto-refresh gallery on success

### 2. Image Selection
- Click on any image to select/deselect
- Checkbox indicates selection state
- Selected count shown in header
- Clean selection UI without outlines

### 3. Image Deletion
- Select one or more images
- "Delete (X)" button appears in header
- Click delete → Confirmation dialog opens
- Confirm → Images deleted from backend and gallery

### 4. Masonry Layout
- Responsive columns:
  - Mobile (350px): 1 column
  - Tablet (750px): 2 columns
  - Desktop (900px): 3 columns
  - Large (1200px): 4 columns
- Dynamic gutter spacing
- Smooth animations

## 🌙 Dark Theme

The app uses a dark theme by default with:
- Custom color variables in `index.css`
- Shadcn/ui theme tokens
- Proper contrast for accessibility
- Consistent styling across all components

## 🔗 Path Aliases

The project uses path aliases for cleaner imports:

```javascript
// Instead of: import { Button } from "../../components/ui/button"
// Use: import { Button } from "@/components/ui/button"
```

Configured in `jsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📦 Dependencies

### Production Dependencies
- `react` & `react-dom` - Core React libraries
- `axios` - HTTP client
- `react-responsive-masonry` - Masonry grid
- `tailwindcss` - CSS framework
- `lucide-react` - Icons
- `@radix-ui/*` - Headless UI components
- `class-variance-authority` - CVA for variants
- `clsx` & `tailwind-merge` - Class name utilities

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code linting
- `tw-animate-css` - Tailwind animations

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.)