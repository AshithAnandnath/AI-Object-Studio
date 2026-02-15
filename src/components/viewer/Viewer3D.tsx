import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface Viewer3DProps {
    model?: any;
}

const Viewer3D: React.FC<Viewer3DProps> = ({ model }) => {
    const [visibleCount, setVisibleCount] = useState(0);

    // smooth assembly animation
    useEffect(() => {
        if (!model?.parts?.length) {
            setVisibleCount(0);
            return;
        }

        setVisibleCount(0);

        const interval = setInterval(() => {
            setVisibleCount((prev) => {
                if (prev >= model.parts.length) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 250);

        return () => clearInterval(interval);
    }, [model]);

    // render primitives safely
    const renderPart = (part: any, i: number) => {
        const pos = [
            part.position?.[0] || 0,
            (part.position?.[1] || 0) + 0.6, // lift model above plane
            part.position?.[2] || 0
        ];

        const rot = part.rotation || [0, 0, 0];
        const scale = part.scale || [1, 1, 1];
        const color = part.color || "#e5e5e5";

        switch (part.type) {
            case "cylinder":
                return (
                    <mesh key={i} position={pos} rotation={rot} scale={scale}>
                        <cylinderGeometry args={part.args || [1, 1, 2, 32]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );

            case "cone":
                return (
                    <mesh key={i} position={pos} rotation={rot} scale={scale}>
                        <coneGeometry args={part.args || [1, 2, 32]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );

            case "torus":
                return (
                    <mesh key={i} position={pos} rotation={rot} scale={scale}>
                        <torusGeometry args={part.args || [1, 0.3, 16, 100]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );

            case "sphere":
                return (
                    <mesh key={i} position={pos} rotation={rot} scale={scale}>
                        <sphereGeometry args={part.args || [1, 32, 32]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );

            case "box":
                return (
                    <mesh key={i} position={pos} rotation={rot} scale={scale}>
                        <boxGeometry args={part.args || [1, 1, 1]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );

            default:
                return null;
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: "420px",
                borderRadius: 20,
                overflow: "hidden",
                background: "linear-gradient(180deg,#f8fafc,#e2e8f0)",
            }}
        >
            <Canvas camera={{ position: [4, 3, 4], fov: 45 }}>

                {/* 🌤 soft studio lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />

                {/* 🟦 soft floor plane */}
                {/* Ground plane */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#e5e7eb" />
                </mesh>


                {/* model */}
                <Suspense fallback={null}>
                    {model?.parts?.length
                        ? model.parts.slice(0, visibleCount).map(renderPart)
                        : null}
                </Suspense>

                <OrbitControls enableDamping />
            </Canvas>
        </div>
    );
};

export default Viewer3D;
