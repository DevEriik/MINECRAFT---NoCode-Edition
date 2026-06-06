import * as THREE from "three";

export function createAvatarMesh(currentSkin, clothesDB) {
  const group = new THREE.Group();
  const textureLoader = new THREE.TextureLoader();

  const loadTex = (id, db) => {
    if (!id) return null;
    const item = db.find((x) => x.id === id);
    if (!item || !item.image) return null;
    const tex = textureLoader.load(item.image);
    tex.magFilter = THREE.NearestFilter;
    return tex;
  };

  const topTex = loadTex(currentSkin.topId, clothesDB.TOPS);
  const bottomTex = loadTex(currentSkin.bottomId, clothesDB.BOTTOMS);

  const skinColor = currentSkin.skinColor || "#FFD6A5";
  const hairColor = currentSkin.hairColor || "#5E3A1B";

  const addPart = (w, h, d, x, y, z, color, frontTex) => {
    const geom = new THREE.BoxGeometry(w, h, d);
    let materials;

    if (frontTex) {
      const baseMat = new THREE.MeshBasicMaterial({ color: color });
      const texMat = new THREE.MeshBasicMaterial({
        map: frontTex,
        transparent: true,
      });
      materials = [baseMat, baseMat, baseMat, baseMat, texMat, baseMat];
    } else {
      materials = new THREE.MeshBasicMaterial({ color: color });
    }

    const mesh = new THREE.Mesh(geom, materials);
    mesh.position.set(x, y, z);
    group.add(mesh);
  };

  addPart(1, 1, 1, 0, 1.25, 0, skinColor); 
  addPart(1.05, 0.25, 1.05, 0, 1.65, 0, hairColor); 
  addPart(1, 1.5, 0.5, 0, 0, 0, skinColor, topTex); 
  addPart(0.5, 1.5, 0.5, -0.75, 0, 0, skinColor); 
  addPart(0.5, 1.5, 0.5, 0.75, 0, 0, skinColor); 
  addPart(0.5, 1.5, 0.5, -0.25, -1.5, 0, skinColor, bottomTex);
  addPart(0.5, 1.5, 0.5, 0.25, -1.5, 0, skinColor, bottomTex); 
  return group;
}
