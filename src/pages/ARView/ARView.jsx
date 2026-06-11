import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { createAvatarMesh } from '../../utils/buildAvatar.js';
import { TOPS, BOTTOMS } from "../../components/SkinCustomizer/SkinCustomizer.jsx"; 

let activeMindarInstance = null;

function teardownActive() {
  if (activeMindarInstance) {
    try {
      activeMindarInstance.renderer.setAnimationLoop(null);
      activeMindarInstance.stop();
    } catch {}
    activeMindarInstance = null;
  }
}

const ARView = () => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchParams] = useSearchParams();

  const currentSkin = {
    skinColor: searchParams.get("skinColor") || "#FFD6A5",
    hairColor: searchParams.get("hairColor") || "#5E3A1B",
    topId: searchParams.get("topId") || "",
    bottomId: searchParams.get("bottomId") || "",
  };

  useEffect(() => {
    teardownActive();
    let disposed = false;

    async function startAR() {
      const container = containerRef.current;
      if (!container || disposed) return;

      const rect = container.getBoundingClientRect();
      container.style.width = `${rect.width}px`;
      container.style.height = `${rect.height}px`;

      const mindar = new MindARThree({
        container,
        imageTargetSrc: '/target.mind', 
        uiLoading: 'no',
        uiScanning: 'yes',
        uiError: 'yes',
      });
      activeMindarInstance = mindar;

      const { renderer, scene, camera } = mindar;

      const meshGroup = createAvatarMesh(currentSkin, { TOPS, BOTTOMS });
      
      meshGroup.scale.set(0.4, 0.4, 0.4); 
      meshGroup.rotation.x = -Math.PI / 2; 
      meshGroup.position.z = 0;

      const anchor = mindar.addAnchor(0);
      anchor.group.add(meshGroup);

      await mindar.start();

      if (disposed) {
        teardownActive();
        return;
      }

      setStatus('ready');
      
      renderer.setAnimationLoop(() => {
        if (meshGroup) {
          meshGroup.rotation.z += 0.02; 
        }
        renderer.render(scene, camera);
      });
    }

    startAR().catch((err) => {
      setStatus('error');
      setErrorMsg(err.message);
    });

    return () => {
      disposed = true;
      teardownActive();
    };
  }, []); 

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: '#000' }}>
      <button
        onClick={() => window.location.href = "/"} 
        style={{
            position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 50,
            backgroundColor: 'white', color: 'black', fontWeight: '900',
            padding: '0.5rem 1rem', textTransform: 'uppercase',
            border: '4px solid black', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
        }}
      >
        ← Volver
      </button>

      <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />

      {status === 'loading' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
          Iniciando cámara AR...
        </div>
      )}
    </div>
  );
};

export default ARView;