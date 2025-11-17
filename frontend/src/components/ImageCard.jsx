import * as React from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { cn } from "../../lib/utils";

function ImageCard({ image, isSelected, onToggleSelect, className }) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-0 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] break-inside-avoid group border-border",
        className
      )}
      onClick={() => onToggleSelect(image.id)}
    >
      <div className="relative">
        <img
          src={image.filePath}
          alt={image.fileTitle}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 transition-opacity duration-300" />
        
        {!isSelected && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        <div className="absolute top-3 right-3 z-10">
          <Checkbox
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect(image.id);
            }}
            checked={isSelected}
            className="shadow-lg border-white"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-white font-semibold text-sm truncate drop-shadow-lg mb-1">
            {image.fileTitle}
          </h3>
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <span>{(image.fileSize / 1024).toFixed(2)} KB</span>
            <span>•</span>
            <span className="truncate">{image.fileType}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export { ImageCard };