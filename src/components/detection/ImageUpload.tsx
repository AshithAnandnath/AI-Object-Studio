import React, { useRef } from "react";
import { Button } from "../common/Button";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
    onUpload: (img: string, filename: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64 = reader.result as string;

            // ✅ PASS BOTH IMAGE + FILENAME
            onUpload(base64, file.name.toLowerCase());
        };

        reader.readAsDataURL(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) handleFile(e.target.files[0]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            style={{
                minHeight: "300px",
                border: "2px dashed #555",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
            }}
        >
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

            <Upload size={40} />
            <p>Upload an Image</p>

            <Button
                variant="secondary"
                icon={ImageIcon}
                onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                }}
            >
                Select File
            </Button>
        </div>
    );
};
