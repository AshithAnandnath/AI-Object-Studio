import React, { useState, useEffect } from "react";
import Viewer3D from "../components/viewer/Viewer3D";
import { DetectionPanel } from "../components/detection/DetectionPanel";
import { exportOBJ, exportSTL } from "../utils/exportModel";

export const Home = () => {
    const [prompt, setPrompt] = useState("");
    const [model, setModel] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [dark, setDark] = useState(true);

    // Scroll reveal animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.15 }
        );

        document.querySelectorAll(".reveal").forEach(el =>
            observer.observe(el)
        );
    }, []);

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        const { generateModel } = await import("../generator/generateModel");
        const result = await generateModel(prompt);
        setModel(result);
        setLoading(false);
    };

    const handleDetectedObject = async (label: string) => {
        setPrompt(label);
        setLoading(true);
        const { generateModel } = await import("../generator/generateModel");
        const result = await generateModel(label);
        setModel(result);
        setLoading(false);
    };

    return (
        <div className={dark ? "page dark" : "page"}>

            {/* HEADER */}
            <header className="header">
                <div className="logo">AI Object Studio</div>

                <nav>
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                </nav>

                <button className="theme-btn" onClick={() => setDark(!dark)}>
                    {dark ? "Light" : "Dark"}
                </button>
            </header>

            {/* HERO */}
            <section id="home" className="hero glass reveal">
                <h1>Turn Real Objects into 3D Models in Seconds</h1>
                <p>
                    Upload an image or enter an object name to instantly generate a clean,
                    interactive 3D model. Designed for rapid prototyping, education,
                    product visualization, and 3D printing workflows.
                </p>

                <div className="prompt-box">
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Try: mug, bottle, pen..."
                    />
                    <button
                        onClick={handleGenerate}
                        className={loading ? "loading-btn" : ""}
                    >
                        {loading ? "Generating..." : "Generate"}
                    </button>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="features reveal">
                <div className="feature glass">
                    <h3>Automatic Object Detection</h3>
                    <p>
                        Upload an image and let AI identify the primary object instantly.
                        The detected label is used to generate a matching 3D model.
                    </p>
                </div>

                <div className="feature glass">
                    <h3>AI-Generated Structured Geometry</h3>
                    <p>
                        Models are built using optimized geometric primitives to ensure
                        clean structure, symmetry, and performance.
                    </p>
                </div>

                <div className="feature glass">
                    <h3>Interactive 3D Viewer</h3>
                    <p>
                        Rotate, zoom, and inspect models in real time using a smooth WebGL
                        interface powered by modern rendering technology.
                    </p>
                </div>

                <div className="feature glass">
                    <h3>Export for 3D Printing</h3>
                    <p>
                        Download your generated models in OBJ or STL format for CAD
                        software, prototyping, and 3D printing.
                    </p>
                </div>
            </section>

            {/* DETECTION */}
            <section className="glass section reveal">
                <h2>Upload & Detect Object</h2>
                <p>
                    Upload an image and our system will detect the object automatically.
                    The detected label will be used to generate the 3D model.
                </p>

                <DetectionPanel onObjectDetected={handleDetectedObject} />

                {prompt && <div className="detected">Detected: {prompt}</div>}
            </section>

            {/* MODEL */}
            <section className="glass section reveal">
                <h2>Generated 3D Model</h2>
                <p>
                    Your model appears below. Drag to rotate, zoom to inspect, and explore
                    geometry from every angle.
                </p>

                <div className={loading ? "viewer-loading" : ""}>
                    <Viewer3D model={model} />
                </div>

                {model && (
                    <div className="export-buttons">
                        <button onClick={() => exportOBJ(model)}>
                            Download OBJ
                        </button>
                        <button onClick={() => exportSTL(model)}>
                            Download STL
                        </button>
                    </div>
                )}
            </section>

            {/* ABOUT */}
            <section id="about" className="about reveal">
                <div className="about-box glass">
                    <h3>What is AI Object Studio?</h3>
                    <p>
                        AI Object Studio bridges computer vision and procedural 3D modeling
                        to simplify object visualization. Instead of complex CAD tools,
                        structured 3D models are generated instantly in the browser.
                    </p>
                </div>

                <div className="about-box glass">
                    <h3>Who Is It For?</h3>
                    <p>
                        Ideal for students, educators, engineers, designers, and makers
                        who need quick 3D representations for presentations, learning,
                        rapid prototyping, or 3D printing.
                    </p>
                </div>

                <div className="about-box glass">
                    <h3>Why Use It?</h3>
                    <p>
                        By combining AI-based object recognition, optimized geometry
                        construction, and WebGL rendering, the platform provides a complete
                        modeling workflow directly in your browser.
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div>
                    AI Object Studio empowers rapid 3D visualization and prototyping
                    using AI and modern web technologies.
                </div>
                <div>© 2026 AI Object Studio</div>
            </footer>
        </div>
    );
};
