import * as THREE from "three";
import cabezaImg from "../assets/skin/cabeza.png";

export function createAvatarMesh(currentSkin, clothesDB) {
  const group = new THREE.Group();
  const textureLoader = new THREE.TextureLoader();

  const getImgSrc = (id, db) => {
    if (!id && typeof db !== "string") return null;
    if (typeof db === "string") return db;
    if (db) {
      const item = db.find((x) => x.id === id);
      if (item && item.image) return item.image;
    }
    return null;
  };

  const addPart = (w, h, d, x, y, z, color, imgSrc) => {
    const geom = new THREE.BoxGeometry(w, h, d);
    const baseMat = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geom, baseMat);
    mesh.position.set(x, y, z);
    group.add(mesh);

    if (imgSrc) {
      const texGeom = new THREE.BoxGeometry(w + 0.01, h + 0.01, d + 0.01);
      const tex = textureLoader.load(imgSrc);
      tex.magFilter = THREE.NearestFilter;
      const texMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
      const transMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
      const texMaterials = [transMat, transMat, transMat, transMat, texMat, transMat];
      const texMesh = new THREE.Mesh(texGeom, texMaterials);
      texMesh.position.set(x, y, z);
      group.add(texMesh);
    }
  };

  const addDecal = (w, h, d, x, y, z, imgSrc, repeatX, repeatY, offsetX, offsetY, depthOffset = 0.01) => {
    if (!imgSrc) return;
    const texGeom = new THREE.BoxGeometry(w + depthOffset, h + depthOffset, d + depthOffset);
    const tex = textureLoader.load(imgSrc);
    tex.magFilter = THREE.NearestFilter;
    tex.repeat.set(repeatX, repeatY);
    tex.offset.set(offsetX, offsetY);
    
    const texMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
    const transMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const texMaterials = [transMat, transMat, transMat, transMat, texMat, transMat];
    const texMesh = new THREE.Mesh(texGeom, texMaterials);
    texMesh.position.set(x, y, z);
    group.add(texMesh);
  };

  const skinColor = currentSkin.skinColor || "#FFD6A5";
  const hairColor = currentSkin.hairColor || "#5E3A1B";
  const topSrc = getImgSrc(currentSkin.topId, clothesDB.TOPS);
  const bottomSrc = getImgSrc(currentSkin.bottomId, clothesDB.BOTTOMS);
  const shoesSrc = getImgSrc(currentSkin.shoesId, clothesDB.SHOES);

  // Base Skin
  addPart(1, 1, 1, 0, 1.25, 0, skinColor, cabezaImg); 
  addPart(1.05, 0.25, 1.05, 0, 1.65, 0, hairColor); 
  addPart(1, 1.5, 0.5, 0, 0, 0, skinColor); // torso
  addPart(0.5, 1.5, 0.5, -0.75, 0, 0, skinColor); // left arm
  addPart(0.5, 1.5, 0.5, 0.75, 0, 0, skinColor); // right arm
  addPart(0.5, 1.5, 0.5, -0.25, -1.5, 0, skinColor); // left leg
  addPart(0.5, 1.5, 0.5, 0.25, -1.5, 0, skinColor); // right leg

  // Clothes Decals
  // Shirt (Torso + Arms)
  addDecal(1, 1.5, 0.5, 0, 0, 0, topSrc, 0.215, 0.339, 0.3925, 0.351); 
  addDecal(0.5, 1.5, 0.5, -0.75, 0, 0, topSrc, 0.1075, 0.339, 0.285, 0.351); 
  addDecal(0.5, 1.5, 0.5, 0.75, 0, 0, topSrc, 0.1075, 0.339, 0.6075, 0.351); 

  // Pants (Legs)
  addDecal(0.5, 1.5, 0.5, -0.25, -1.5, 0, bottomSrc, 0.139, 0.323, 0.378, 0.301, 0.015);
  addDecal(0.5, 1.5, 0.5, 0.25, -1.5, 0, bottomSrc, 0.139, 0.323, 0.517, 0.301, 0.015);

  // Shoes (Legs)
  addDecal(0.5, 1.5, 0.5, -0.25, -1.5, 0, shoesSrc, 0.147, 0.313, 0.390, 0.313, 0.02);
  addDecal(0.5, 1.5, 0.5, 0.25, -1.5, 0, shoesSrc, 0.147, 0.313, 0.537, 0.313, 0.02);

  return group;
}
