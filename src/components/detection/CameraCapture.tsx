import React, { useRef, useState } from 'react';
import { Button } from '../common/Button';
import { Camera, RefreshCw } from 'lucide-react';

interface CameraCaptureProps {
    onCapture: (imageSrc: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            streamRef.current = stream;
            setIsStreaming(true);
        } catch (err) {
            console.error('Camera access denied:', err);
            alert('Camera access is required.');
        }
    };

    const stopCamera = () => {
        streamRef.current?.getTracks().forEach(track => track.stop());
        setIsStreaming(false);
    };

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL('image/png');

        onCapture(imageData);
        stopCamera();
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full h-full justify-center bg-black/5 rounded-lg border border-dashed border-border p-4 relative overflow-hidden"
            style={{ minHeight: '300px' }}>

            {!isStreaming ? (
                <div className="text-center">
                    <Camera size={48} className="mx-auto mb-4 text-muted" />
                    <Button onClick={startCamera}>Start Camera</Button>
                </div>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover bg-black"
                        style={{ maxHeight: '400px' }}
                    />

                    <canvas ref={canvasRef} style={{ display: 'none' }} />

                    <div className="absolute bottom-4 flex gap-4">
                        <Button onClick={captureImage}>Capture</Button>
                        <Button onClick={stopCamera} variant="secondary" icon={RefreshCw} />
                    </div>
                </>
            )}
        </div>
    );
};
