import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImageCard } from "./ImageCard";
import { ImageUploadDialog } from "./ImageUploadDialog";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Button } from "./ui/button";
import { Upload, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";


const API_URL = import.meta.env.VITE_API_URL;

const MediaGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/image`);
      
      if (response.data.success) {
        setImages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const toggleImageSelection = (id) => {
    setSelectedImages((prev) => {
      if (prev.includes(id)) {
        return prev.filter((imageId) => imageId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleUploadSuccess = () => {
    fetchImages();
  };

  const handleDeleteClick = () => {
    if (selectedImages.length === 0) return;
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      const response = await axios.delete(`${API_URL}/image`, {
        data: { ids: selectedImages },
      });

      if (response.data.success) {
        setSelectedImages([]);
        await fetchImages();
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting images:", error);
      alert("Error deleting images: " + (error.response?.data?.message || error.message));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Image Gallery</h1>
          <p className="text-sm text-muted-foreground">
            {images.length} {images.length === 1 ? "image" : "images"}
            {selectedImages.length > 0 && (
              <span className="ml-2">
                • {selectedImages.length} selected
              </span>
            )}
          </p>
        </div>
        
        <div className="flex gap-3">
          {selectedImages.length > 0 && (
            <Button 
              onClick={handleDeleteClick} 
              variant="destructive"
              size="lg"
              disabled={deleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {deleting ? "Deleting..." : `Delete (${selectedImages.length})`}
            </Button>
          )}
          <Button onClick={() => setUploadDialogOpen(true)} size="lg">
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>
      </div>

      <ImageUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadSuccess={handleUploadSuccess}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Images</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedImages.length} {selectedImages.length === 1 ? "image" : "images"}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} className="text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <Upload className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No images yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Get started by uploading your first image to the gallery
          </p>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Your First Image
          </Button>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
          gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "20px", 1200: "24px" }}
        >
          <Masonry>
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                isSelected={selectedImages.includes(image.id)}
                onToggleSelect={toggleImageSelection}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};

export default MediaGallery;
