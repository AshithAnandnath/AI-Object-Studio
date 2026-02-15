import type { DetectedObject } from "../generator/types";

/**
 * Detect object using filename (demo-safe)
 */
export const detectObject = async (
    filename: string
): Promise<DetectedObject> => {

    const name = filename.toLowerCase();

    console.log("📁 filename received:", name);

    let label = "object";

    if (name.includes("mug")) label = "mug";
    else if (name.includes("bottle")) label = "bottle";
    else if (name.includes("pen")) label = "pen";
    else if (name.includes("glass")) label = "glass";
    else if (name.includes("laptop")) label = "laptop";
    else if (name.includes("phone")) label = "phone";
    else if (name.includes("book")) label = "book";
    else if (name.includes("chair")) label = "chair";
    else if (name.includes("box")) label = "box";
    else if (name.includes("ball")) label = "ball";

    console.log("✅ detected label:", label);

    return {
        id: crypto.randomUUID(),
        label,
        confidence: 0.99,
        mask: null,
        boundingBox: null,
    };
};
