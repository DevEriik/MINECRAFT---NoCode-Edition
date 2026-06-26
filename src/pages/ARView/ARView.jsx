import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { createAvatarMesh } from '../../utils/buildAvatar.js';
import { TOPS, BOTTOMS, SHOES } from "../../components/SkinCustomizer/SkinCustomizer.jsx"; 

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
    shoesId: searchParams.get("shoesId") || "",
  };

  const [logs, setLogs] = useState([]);
  
  const addLog = (msg) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    console.log(`[ARView] ${msg}`);
  };

  useEffect(() => {
    teardownActive();
    let disposed = false;
    addLog('Efecto iniciado. Desmontado=false');

    function waitFrames(n) {
      return new Promise(resolve => {
        const tick = (remaining) => remaining <= 0
          ? resolve()
          : requestAnimationFrame(() => tick(remaining - 1));
        tick(n);
      });
    }

    async function startAR() {
      addLog('Esperando frames...');
      await waitFrames(2);
      
      if (disposed) {
        addLog('Abortado: componente desmontado');
        return;
      }

      const container = containerRef.current;
      if (!container) {
        addLog('Error: no hay contenedor');
        return;
      }

      addLog('Ajustando dimensiones del contenedor...');
      const rect = container.getBoundingClientRect();
      void container.offsetWidth; // Force reflow

      addLog('Instanciando MindARThree...');
      const mindar = new MindARThree({
        container,
        imageTargetSrc: '/avatars/target.mind', 
        uiLoading: 'no',
        uiScanning: 'yes',
        uiError: 'yes',
      });
      activeMindarInstance = mindar;

      const { renderer, scene, camera } = mindar;

      addLog('Creando malla del avatar...');
      const meshGroup = createAvatarMesh(currentSkin, { TOPS, BOTTOMS, SHOES });
      
      meshGroup.scale.set(0.4, 0.4, 0.4); 
      meshGroup.rotation.x = Math.PI / 2; 
      meshGroup.position.z = 0;

      const anchor = mindar.addAnchor(0);
      anchor.group.add(meshGroup);

      addLog('Llamando a mindar.start()... (ESTO PUEDE TARDAR)');
      await mindar.start();
      addLog('mindar.start() completado!');

      if (disposed) {
        addLog('Desmontado después de start');
        teardownActive();
        return;
      }

      setStatus('ready');
      addLog('Estado actualizado a ready');
      
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

      const handleResize = () => {
        if (!container || disposed) return;
        const r = container.getBoundingClientRect();
        addLog('Resized container');
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    let resizeCleanup;
    startAR().then((cleanup) => {
      resizeCleanup = cleanup;
    }).catch((err) => {
      addLog(`Error atrapado: ${err.message}`);
      setStatus('error');
      setErrorMsg(err.message);
    });

    return () => {
      addLog('Limpiando (desmontaje)');
      disposed = true;
      if (resizeCleanup) resizeCleanup();
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

      <style>
        {`
          .ar-fullscreen-container video,
          .ar-fullscreen-container canvas {
            width: 100vw !important;
            height: 100vh !important;
            object-fit: cover !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            margin: 0 !important;
            transform: none !important;
          }
        `}
      </style>

      <div ref={containerRef} className="ar-fullscreen-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />

      {status === 'loading' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', color: 'white', fontWeight: 'bold', fontSize: '20px', pointerEvents: 'none' }}>
          Iniciando cámara AR...
        </div>
      )}

      {status === 'error' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', color: '#fff', padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '20px' }}>No se pudo iniciar AR</p>
          <p style={{ color: '#9ca3af', marginTop: '1rem', wordBreak: 'break-all' }}>{errorMsg}</p>
          <p style={{ color: '#9ca3af', marginTop: '1rem', fontSize: '14px' }}>Asegúrate de tener permisos de cámara y acceder por HTTPS.</p>
        </div>
      )}
    </div>
  );
};

export default ARView;