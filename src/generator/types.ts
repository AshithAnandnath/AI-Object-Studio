// allowed primitive shapes
export type ShapeType =
    | "box"
    | "sphere"
    | "cylinder"
    | "cone"
    | "torus"
    | "icosahedron";

// individual model part
export interface ModelPart {
    id: string;
    type: ShapeType;

    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
    args?: number[];

    color?: string;
    description?: string;
}

// full generated model
export interface GeneratedModel {
    name: string;
    parts: ModelPart[];
}
