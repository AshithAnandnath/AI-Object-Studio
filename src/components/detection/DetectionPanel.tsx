import React, { useState } from "react";
import { CameraCapture } from "./CameraCapture";
import { ImageUpload } from "./ImageUpload";
import { DetectionResult } from "./DetectionResult";
import { Button } from "../common/Button";
import { Camera, Image as ImageIcon } from "lucide-react";

interface DetectedObject {
    label: string;
    confidence?: number;
    mask?: any;
}

interface DetectionPanelProps {
    onObjectDetected: (detected: DetectedObject) => void;
}

export const DetectionPanel: React.FC<DetectionPanelProps> = ({
    onObjectDetected,
}) => {
    const [mode] = useState<'upload'>('upload');
    const [image, setImage] = useState<string | null>(null);
    const [label, setLabel] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCapture = (img: string) => {
        setImage(img);
        processImage(img);
    };

    const handleUpload = (img: string, filename: string) => {
        setImage(img);
        processImage(img, filename);
    };


    const processImage = async (img: string, filename?: string) => {
        try {
            setIsProcessing(true);

            const { detectObject } = await import("../../cv/objectDetection");

            const detection = await detectObject(filename || "");

            setLabel(detection.label);

            onObjectDetected(detection.label);


        } catch (err) {
            console.error("Detection failed:", err);
        } finally {
            setIsProcessing(false);
        }
    };


    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
            }}
        >
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-4">
                <div
                    className="flex rounded-lg bg-secondary p-1 w-fit mb-4"
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        backgroundColor: "var(--secondary)",
                        padding: "0.25rem",
                        borderRadius: "var(--radius)",
                    }}
                >
                    <Button
                        variant={mode === "upload" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setMode("upload")}
                        icon={ImageIcon}
                        className={mode === "upload" ? "bg-background shadow-sm" : ""}
                    >
                        Upload
                    </Button>


                </div>

                <div className="w-full">
                    <ImageUpload onUpload={handleUpload} />

                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-4">
                <h3 className="font-medium mb-4 text-lg hidden md:block">
                    Preview & Detection
                </h3>

                <DetectionResult
                    imageSrc={image}
                    isProcessing={isProcessing}
                    label={label}
                />
            </div>
        </div>
    );
};
