// src/utils/exportModel.ts

export const exportOBJ = (model: any) => {
    if (!model?.parts?.length) {
        alert("No model to export");
        return;
    }

    let obj = "";
    let vertexOffset = 1;

    model.parts.forEach((part: any) => {
        const x = part.position?.[0] || 0;
        const y = part.position?.[1] || 0;
        const z = part.position?.[2] || 0;

        const size = part.scale || [1, 1, 1];

        // create simple cube approximation per part
        const vertices = [
            [x - size[0], y - size[1], z - size[2]],
            [x + size[0], y - size[1], z - size[2]],
            [x + size[0], y + size[1], z - size[2]],
            [x - size[0], y + size[1], z - size[2]],
            [x - size[0], y - size[1], z + size[2]],
            [x + size[0], y - size[1], z + size[2]],
            [x + size[0], y + size[1], z + size[2]],
            [x - size[0], y + size[1], z + size[2]],
        ];

        vertices.forEach(v => {
            obj += `v ${v[0]} ${v[1]} ${v[2]}\n`;
        });

        obj += `
f ${vertexOffset} ${vertexOffset + 1} ${vertexOffset + 2} ${vertexOffset + 3}
f ${vertexOffset + 4} ${vertexOffset + 5} ${vertexOffset + 6} ${vertexOffset + 7}
f ${vertexOffset} ${vertexOffset + 1} ${vertexOffset + 5} ${vertexOffset + 4}
f ${vertexOffset + 2} ${vertexOffset + 3} ${vertexOffset + 7} ${vertexOffset + 6}
f ${vertexOffset + 1} ${vertexOffset + 2} ${vertexOffset + 6} ${vertexOffset + 5}
f ${vertexOffset} ${vertexOffset + 3} ${vertexOffset + 7} ${vertexOffset + 4}
`;

        vertexOffset += 8;
    });

    downloadFile(obj, "model.obj");
};


export const exportSTL = (model: any) => {
    if (!model?.parts?.length) {
        alert("No model to export");
        return;
    }

    let stl = "solid model\n";

    model.parts.forEach((part: any) => {
        const x = part.position?.[0] || 0;
        const y = part.position?.[1] || 0;
        const z = part.position?.[2] || 0;

        const size = part.scale || [1, 1, 1];

        const vertices = [
            [x - size[0], y - size[1], z - size[2]],
            [x + size[0], y - size[1], z - size[2]],
            [x + size[0], y + size[1], z - size[2]],
            [x - size[0], y + size[1], z - size[2]],
            [x - size[0], y - size[1], z + size[2]],
            [x + size[0], y - size[1], z + size[2]],
            [x + size[0], y + size[1], z + size[2]],
            [x - size[0], y + size[1], z + size[2]],
        ];

        const faces = [
            [0, 1, 2], [0, 2, 3],
            [4, 5, 6], [4, 6, 7],
            [0, 1, 5], [0, 5, 4],
            [2, 3, 7], [2, 7, 6],
            [1, 2, 6], [1, 6, 5],
            [0, 3, 7], [0, 7, 4],
        ];

        faces.forEach(face => {
            const v1 = vertices[face[0]];
            const v2 = vertices[face[1]];
            const v3 = vertices[face[2]];

            stl += `
facet normal 0 0 0
 outer loop
  vertex ${v1[0]} ${v1[1]} ${v1[2]}
  vertex ${v2[0]} ${v2[1]} ${v2[2]}
  vertex ${v3[0]} ${v3[1]} ${v3[2]}
 endloop
endfacet
`;
        });
    });

    stl += "endsolid model";

    downloadFile(stl, "model.stl");
};


const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};
