import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "image.json");

export const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "No file uploaded"
            });
        }

        let images = [];
        if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath, "utf-8");
            images = JSON.parse(data);
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        
        const newImage = {
            id: images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1,
            filePath: `${baseUrl}/uploaded-images/${req.file.filename}`,
            fileName: req.file.filename,
            fileTitle: req.body.fileTitle || req.file.originalname,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
            fileCreatedAt: new Date().toISOString(),
            fileUpdatedAt: new Date().toISOString()
        };

        images.push(newImage);

        fs.writeFileSync(dataFilePath, JSON.stringify(images, null, 4));

        res.status(201).json({
            success: true,
            data: newImage,
            message: "Image uploaded successfully"
        });

    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to upload image"
        });
    }
};

export const getAllImages = (req, res) => {
    try {
        let images = [];
        if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath, "utf-8");
            images = JSON.parse(data);
        }

        // Add base URL if filePath doesn't already contain it (for backward compatibility)
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imagesWithFullPath = images.map(img => {
            if (!img.filePath.startsWith('http')) {
                return {
                    ...img,
                    filePath: `${baseUrl}/uploaded-images/${img.fileName || img.filePath}`
                };
            }
            return img;
        });

        res.status(200).json({
            success: true,
            data: imagesWithFullPath,
            message: "Images retrieved successfully"
        });

    } catch (error) {
        console.error("Error retrieving images:", error);
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to retrieve images"
        });
    }
};

export const deleteImages = (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Please provide an array of image IDs"
            });
        }

        let images = [];
        if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath, "utf-8");
            images = JSON.parse(data);
        }

        const deletedImages = [];
        const notFoundIds = [];

        ids.forEach(id => {
            const imageIndex = images.findIndex(img => img.id === id);
            if (imageIndex !== -1) {
                const image = images[imageIndex];
                // Extract filename from filePath (could be just filename or full URL)
                const fileName = image.fileName || image.filePath.split('/').pop();
                const imagePath = path.join(process.cwd(), "uploaded-images", fileName);
                
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
                
                deletedImages.push(image);
                images.splice(imageIndex, 1);
            } else {
                notFoundIds.push(id);
            }
        });

        fs.writeFileSync(dataFilePath, JSON.stringify(images, null, 4));

        res.status(200).json({
            success: true,
            data: {
                deletedCount: deletedImages.length,
                deletedImages: deletedImages,
                notFoundIds: notFoundIds.length > 0 ? notFoundIds : []
            },
            message: "Images deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting images:", error);
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to delete images"
        });
    }
};

