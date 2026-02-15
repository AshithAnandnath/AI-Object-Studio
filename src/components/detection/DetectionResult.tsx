import React from "react";
import { Loader } from "../common/Loader";

interface DetectionResultProps {
    imageSrc: string | null;
    isProcessing: boolean;
    label?: string | null;
}

export const DetectionResult: React.FC<DetectionResultProps> = ({
    imageSrc,
    isProcessing,
    label,
}) => {
    if (isProcessing) {
        return (
            <div
                className="flex bg-secondary/10 rounded-lg items-center justify-center h-full p-8"
                style={{ minHeight: "300px" }}
            >
                <Loader text="Analyzing object..." size={48} />
            </div>
        );
    }

    if (!imageSrc) {
        return (
            <div
                className="flex bg-secondary/10 rounded-lg items-center justify-center h-full p-8 border border-dashed border-border"
                style={{ minHeight: "300px" }}
            >
                <p className="text-muted">No image selected</p>
            </div>
        );
    }

    return (
        <div
            className="relative rounded-lg overflow-hidden border border-border"
            style={{
                height: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0b1220"
            }}
        >
            <img
                src={imageSrc}
                alt="Detected Object"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxHeight: "320px",
                    borderRadius: "10px"
                }}
            />


            {/* top badge */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                Input Image
            </div>

            {/* detection label */}
            {label && (
                <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded shadow">
                    Detected: {label}
                </div>
            )}
        </div>
    );
};
