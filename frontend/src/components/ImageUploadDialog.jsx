import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Upload, ImageIcon } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function ImageUploadDialog({ open, onOpenChange, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      alert("Only JPEG and PNG images are allowed");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("File size must be less than 3MB");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("fileTitle", selectedFile.name);

    try {
      setUploading(true);
      setUploadProgress(0);

      const response = await axios.post(`${API_URL}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      if (response.data.success) {
        setTimeout(() => {
          handleClose();
          onUploadSuccess?.();
        }, 500);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(
        "Error uploading image: " +
          (error.response?.data?.message || error.message)
      );
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Upload Image</DialogTitle>
          <DialogDescription>
            Select an image to upload (JPEG/PNG, max 3MB)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {!selectedFile && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
            >
              <div className="bg-primary/10 rounded-full p-4 inline-flex mb-3">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                Click to select an image
              </p>
              <p className="text-xs text-muted-foreground">JPEG, PNG (max 3MB)</p>
            </div>
          )}
          {preview && !uploading && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 text-white border-white"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                >
                  Change Image
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpload}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Now
                </Button>
              </div>
            </div>
          )}
          {uploading && (
            <div className="space-y-3 py-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Uploading... {uploadProgress}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please wait while we upload your image
                </p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        {!uploading && !preview && (
          <div className="flex gap-2 justify-end mt-2">
            <Button variant="outline" className="text-white border-white" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { ImageUploadDialog };

