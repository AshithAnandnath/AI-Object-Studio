import { GoogleGenAI } from "@google/genai";
import type { GeneratedModel } from "./types";

/* =========================================================
   TEMPLATE MODELS (prevents AI returning mugs for everything)
   ========================================================= */

const templateModel = (name: string): GeneratedModel | null => {
    const key = name.toLowerCase().trim();


    // 🖊 PEN
    if (key.includes("pen") || key.includes("pencil")) {
        return {
            name: "Pen",
            parts: [
                // body
                {
                    id: "body",
                    type: "cylinder",
                    position: [0, 0, 0],
                    args: [0.05, 0.05, 5, 32],
                    scale: [1, 1, 1],
                    color: "#111",
                    description: "pen body",
                },

                // tip
                {
                    id: "tip",
                    type: "cone",
                    position: [0, -2.6, 0],
                    args: [0.05, 0.4, 32],
                    color: "#999",
                    description: "pen tip",
                },

                // cap ring
                {
                    id: "ring",
                    type: "cylinder",
                    position: [0, 1.6, 0],
                    args: [0.055, 0.055, 0.2, 32],
                    color: "#bbb",
                    description: "cap ring",
                },

                // clip
                {
                    id: "clip",
                    type: "box",
                    position: [0.07, 1.3, 0],
                    scale: [0.02, 1.2, 0.15],
                    color: "#222",
                    description: "clip",
                },
            ],
        };
    }

    // 🧴 BOTTLE
    if (key.includes("bottle")) {
        return {
            name: "Bottle",
            parts: [
                // body
                {
                    id: "body",
                    type: "cylinder",
                    position: [0, 0, 0],
                    args: [0.9, 1, 3.2, 32],
                    color: "#4aa3ff",
                    description: "bottle body",
                },

                // neck
                {
                    id: "neck",
                    type: "cylinder",
                    position: [0, 2, 0],
                    args: [0.45, 0.6, 1, 32],
                    color: "#4aa3ff",
                    description: "neck",
                },

                // cap
                {
                    id: "cap",
                    type: "cylinder",
                    position: [0, 2.9, 0],
                    args: [0.5, 0.5, 0.5, 32],
                    color: "#ddd",
                    description: "cap",
                },

                // base
                {
                    id: "base",
                    type: "torus",
                    position: [0, -1.6, 0],
                    rotation: [Math.PI / 2, 0, 0],
                    args: [0.9, 0.05, 16, 100],
                    color: "#357edd",
                    description: "bottom ring",
                },
            ],
        };
    }


    // 🥤 GLASS / TUMBLER/mug
    // ☕ MUG
    if (key.includes("mug") || key.includes("cup")) {
        return {
            name: "Mug",
            parts: [
                // body
                {
                    id: "body",
                    type: "cylinder",
                    position: [0, 0, 0],
                    args: [1.1, 1.1, 2.2, 32],
                    color: "#e5e5e5",
                    description: "outer body",
                },

                // inner hollow
                {
                    id: "inner",
                    type: "cylinder",
                    position: [0, 0.1, 0],
                    args: [0.9, 0.9, 2, 32],
                    color: "#ffffff",
                    description: "inner hollow",
                },

                // rim
                {
                    id: "rim",
                    type: "torus",
                    position: [0, 1.1, 0],
                    rotation: [Math.PI / 2, 0, 0],
                    args: [1.08, 0.06, 16, 100],
                    color: "#ddd",
                    description: "rim",
                },

                // base thickness
                {
                    id: "base",
                    type: "cylinder",
                    position: [0, -1.1, 0],
                    args: [1.0, 1.0, 0.25, 32],
                    color: "#d9d9d9",
                    description: "base",
                },

                // handle
                {
                    id: "handle",
                    type: "torus",
                    position: [1.25, 0.1, 0],
                    rotation: [0, 0, 0],
                    args: [0.75, 0.18, 16, 100],
                    color: "#e5e5e5",
                    description: "handle",
                },
            ],
        };
    }


    // 💺 CHAIR
    if (key.includes("chair")) {
        return {
            name: "Chair",
            parts: [
                {
                    id: "seat",
                    type: "box",
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [2, 0.3, 2],
                    args: [],
                    color: "#b08968",
                    description: "seat",
                },
                {
                    id: "back",
                    type: "box",
                    position: [0, 1.2, -0.9],
                    rotation: [0, 0, 0],
                    scale: [2, 2, 0.3],
                    args: [],
                    color: "#b08968",
                    description: "backrest",
                },
            ],
        };
    }

    return null;
};

/* =========================================================
   NORMALIZE MODEL SIZE (prevents giant / tiny objects)
   ========================================================= */

const normalizeModelData = (model: GeneratedModel): GeneratedModel => {
    if (!model.parts?.length) return model;

    let maxDim = 0;

    model.parts.forEach(p => {
        const scale = p.scale || [1, 1, 1];
        maxDim = Math.max(maxDim, ...scale);
    });

    if (maxDim === 0) return model;

    const factor = 3 / maxDim;

    const parts = model.parts.map(p => ({
        ...p,
        position: p.position.map(v => v * factor) as [number, number, number],
        scale: (p.scale || [1, 1, 1]).map(v => v * factor) as [number, number, number],
        args: p.args?.map(v => v * factor),
    }));

    return { ...model, parts };
};

/* =========================================================
   CLEAN JSON FROM GEMINI
   ========================================================= */

const cleanAndParseJSON = (text: string): GeneratedModel => {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");

    if (first === -1 || last === -1) {
        throw new Error("No JSON found in AI response");
    }

    return JSON.parse(text.substring(first, last + 1));
};

/* =========================================================
   MAIN GENERATOR
   ========================================================= */

export const generateModel = async (
    description: string
): Promise<GeneratedModel> => {
    try {
        console.log("Generating model for:", description);

        /* ✅ 1. TEMPLATE MODELS FIRST */
        const template = templateModel(description);
        if (template) {
            console.log("⚡ Using template model");
            return normalizeModelData(template);
        }

        /* ✅ 2. USE AI FOR OTHER OBJECTS */
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) throw new Error("Missing API key");

        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
Create a clean 3D model using primitives.

Object: ${description}

Rules:
- Return ONLY JSON
- Use cylinder, box, torus, sphere
- Keep proportions realistic
- Parts must connect
- Center model at origin
- Y axis is UP
`,
            config: { temperature: 0.2 },
        });

        const parsed = cleanAndParseJSON(response.text || "");

        console.log("🤖 AI model generated");

        return normalizeModelData(parsed);
    } catch (error) {
        console.error("⚠️ Generation failed → fallback", error);

        /* ✅ SAFE FALLBACK (never crashes viewer) */
        return {
            name: "fallback",
            parts: [
                {
                    id: "body",
                    type: "cylinder",
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    args: [1, 1, 2, 32],
                    scale: [1, 1, 1],
                    color: "#ff8800",
                    description: "fallback body",
                },
                {
                    id: "handle",
                    type: "torus",
                    position: [1.2, 0.3, 0],
                    rotation: [0, 0, 0],
                    args: [0.8, 0.2, 16, 100],
                    scale: [1, 1, 1],
                    color: "#ff8800",
                    description: "fallback handle",
                },
            ],
        };
    }
};
