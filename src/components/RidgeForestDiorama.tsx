/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Move, ZoomIn, Info, Eye, RotateCcw } from "lucide-react";

interface RidgeForestDioramaProps {
  language: "hi" | "en";
}

export function RidgeForestDiorama({ language }: RidgeForestDioramaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Interaction States
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotation = useRef({ y: 0.6, x: 0.4 });
  const zoom = useRef(9.5);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const markers = [
    {
      id: "fiat",
      nameEn: "Abandoned Fiat 1100 (DLK 3433)",
      nameHi: "लावारिस फिएट 1100 (DLK 3433)",
      descEn: "Discovered under tree branches with bloodstains, trace victim hair, and custom-modified escape-proof doors.",
      descHi: "पेड़ों की टहनियों के नीचे खून के धब्बों, पीड़ितों के बालों और बिना हैंडल वाले दरवाजों के साथ मिली।",
      pos: new THREE.Vector3(-1.2, 0.4, 0.8),
    },
    {
      id: "spot",
      nameEn: "Culvert Forensic Site",
      nameHi: "पुलिया फोरेंसिक स्थल",
      descEn: "Where the Chopra siblings fought bravely. Primary recovery site for legal and physical matching trace.",
      descHi: "जहां चोपड़ा भाई-बहनों ने बहादुरी से लड़ाई लड़ी। फोरेंसिक मिलान के निशान की बरामदगी स्थल।",
      pos: new THREE.Vector3(1.4, 0.1, -1.2),
    },
    {
      id: "road",
      nameEn: "Winding Ridge Path",
      nameHi: "टेढ़ा-मेढ़ा रिज रास्ता",
      descEn: "An unlit, dense forestry route popular among couples and military transits, chosen by criminals for total isolation.",
      descHi: "एक बिना लाइट वाला, घना जंगली रास्ता जिसका उपयोग अपराधियों ने अलगाव के लिए किया था।",
      pos: new THREE.Vector3(0, 0.1, 2.5),
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Pre-flight check for WebGL support to avoid browser errors
    const checkWebGL = () => {
      try {
        const testCanvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebglSupported(false);
      return;
    }

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    try {
      // 1. Initialize Scene
      scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color("#000000");
      scene.fog = new THREE.FogExp2("#000000", 0.08);

      // 2. Camera Setup
      camera = new THREE.PerspectiveCamera(
        45,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        100
      );
      cameraRef.current = camera;

      // 3. Renderer Setup
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: false,
      });
      rendererRef.current = renderer;
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lights Setup
    const ambientLight = new THREE.AmbientLight("#0f1322", 1.8);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight("#5c75ab", 3.0);
    moonLight.position.set(5, 8, -5);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 1024;
    moonLight.shadow.mapSize.height = 1024;
    moonLight.shadow.bias = -0.001;
    scene.add(moonLight);

    // Eerie Search Red Spotlight
    const redSpot = new THREE.SpotLight("#ef4444", 15.0, 15, 0.35, 0.5, 1);
    redSpot.position.set(2, 6, 2);
    redSpot.target.position.set(1.4, 0, -1.2);
    redSpot.castShadow = true;
    scene.add(redSpot);
    scene.add(redSpot.target);

    // Flashlight searching beam
    const flashLight = new THREE.SpotLight("#ffffff", 8.0, 12, 0.25, 0.4, 1);
    flashLight.position.set(-2, 5, -2);
    flashLight.target.position.set(-1.2, 0, 0.8);
    scene.add(flashLight);
    scene.add(flashLight.target);

    // 5. Diorama Base/Ground Mesh (Low-poly Dirt Island)
    const baseGeometry = new THREE.CylinderGeometry(5.2, 5.5, 0.8, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: "#181d18",
      roughness: 0.95,
      metalness: 0.1,
      flatShading: true,
    });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -0.4;
    baseMesh.receiveShadow = true;
    scene.add(baseMesh);

    // Side Soil Ring
    const soilGeometry = new THREE.CylinderGeometry(5.5, 5.7, 0.3, 16);
    const soilMaterial = new THREE.MeshStandardMaterial({
      color: "#1c1410",
      roughness: 0.9,
      flatShading: true,
    });
    const soilMesh = new THREE.Mesh(soilGeometry, soilMaterial);
    soilMesh.position.y = -0.85;
    scene.add(soilMesh);

    // 6. Roads / Path Grid
    const pathGeometry = new THREE.BoxGeometry(1.4, 0.05, 9.8);
    const pathMaterial = new THREE.MeshStandardMaterial({
      color: "#201d1c",
      roughness: 0.99,
      flatShading: true,
    });
    const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);
    pathMesh.position.set(0, 0.01, 0.5);
    pathMesh.rotation.y = -0.4;
    pathMesh.receiveShadow = true;
    scene.add(pathMesh);

    // Culvert stone blocks (low-poly)
    const stoneGeo = new THREE.BoxGeometry(0.5, 0.3, 1.2);
    const stoneMat = new THREE.MeshStandardMaterial({ color: "#2d2d30", flatShading: true });
    const culvertL = new THREE.Mesh(stoneGeo, stoneMat);
    culvertL.position.set(1.5, 0.15, -1.4);
    culvertL.rotation.y = -0.4;
    culvertL.castShadow = true;
    scene.add(culvertL);

    // 7. Low-poly Trees
    const treeCount = 28;
    const treeGroup = new THREE.Group();

    for (let i = 0; i < treeCount; i++) {
      const tree = new THREE.Group();

      // Trunk
      const trunkH = 0.8 + Math.random() * 0.8;
      const trunkGeo = new THREE.CylinderGeometry(0.08, 0.14, trunkH, 5);
      const trunkMat = new THREE.MeshStandardMaterial({ color: "#2c1c14", flatShading: true });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = trunkH / 2;
      trunk.castShadow = true;
      tree.add(trunk);

      // Pine foliage (layered cones)
      const layers = 2 + Math.floor(Math.random() * 3);
      const leafColor = new THREE.Color().setHSL(0.3 + Math.random() * 0.08, 0.45, 0.15 + Math.random() * 0.08);
      const leafMat = new THREE.MeshStandardMaterial({
        color: leafColor,
        roughness: 0.9,
        flatShading: true,
      });

      for (let l = 0; l < layers; l++) {
        const radius = 0.6 - l * 0.12;
        const height = 1.0 - l * 0.15;
        const leafGeo = new THREE.ConeGeometry(radius, height, 5);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.y = trunkH + l * 0.45;
        leaf.castShadow = true;
        leaf.receiveShadow = true;
        tree.add(leaf);
      }

      // Random position on island, keeping off the road center
      let tx = (Math.random() - 0.5) * 8.5;
      let tz = (Math.random() - 0.5) * 8.5;
      
      // Keep away from road path
      const pathDist = Math.abs(tx * Math.sin(0.4) + tz * Math.cos(0.4));
      if (pathDist < 1.0) {
        tx += tx > 0 ? 1.0 : -1.0;
        tz += tz > 0 ? 1.0 : -1.0;
      }

      tree.position.set(tx, 0, tz);
      tree.scale.setScalar(0.85 + Math.random() * 0.4);
      treeGroup.add(tree);
    }
    scene.add(treeGroup);

    // 8. Low-Poly Fiat 1100 (DLK 3433)
    const fiatCar = new THREE.Group();

    // Chassis Box
    const bodyGeo = new THREE.BoxGeometry(1.1, 0.32, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: "#545a5f", roughness: 0.5, flatShading: true });
    const carBody = new THREE.Mesh(bodyGeo, bodyMat);
    carBody.position.y = 0.22;
    carBody.castShadow = true;
    fiatCar.add(carBody);

    // Cabin Box
    const cabinGeo = new THREE.BoxGeometry(0.55, 0.28, 0.44);
    const cabinMat = new THREE.MeshStandardMaterial({ color: "#1c2226", roughness: 0.3, flatShading: true });
    const carCabin = new THREE.Mesh(cabinGeo, cabinMat);
    carCabin.position.set(-0.1, 0.45, 0);
    carCabin.castShadow = true;
    fiatCar.add(carCabin);

    // Vintage front grill bump
    const grillGeo = new THREE.BoxGeometry(0.12, 0.2, 0.4);
    const grillMat = new THREE.MeshStandardMaterial({ color: "#2d2d30" });
    const carGrill = new THREE.Mesh(grillGeo, grillMat);
    carGrill.position.set(0.58, 0.2, 0);
    fiatCar.add(carGrill);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.14, 8);
    const wheelMat = new THREE.MeshStandardMaterial({ color: "#090a0d", roughness: 0.9 });
    
    const w1 = new THREE.Mesh(wheelGeo, wheelMat);
    w1.rotation.x = Math.PI / 2;
    w1.position.set(0.35, 0.12, 0.26);
    w1.castShadow = true;
    fiatCar.add(w1);

    const w2 = w1.clone();
    w2.position.set(0.35, 0.12, -0.26);
    fiatCar.add(w2);

    const w3 = w1.clone();
    w3.position.set(-0.35, 0.12, 0.26);
    fiatCar.add(w3);

    const w4 = w1.clone();
    w4.position.set(-0.35, 0.12, -0.26);
    fiatCar.add(w4);

    // Glowing headlights
    const lightGeo = new THREE.SphereGeometry(0.06, 6, 6);
    const lightMat = new THREE.MeshBasicMaterial({ color: "#fef3c7" });
    const hl1 = new THREE.Mesh(lightGeo, lightMat);
    hl1.position.set(GrillXOffset(0.62), 0.24, 0.15);
    fiatCar.add(hl1);

    const hl2 = hl1.clone();
    hl2.position.set(GrillXOffset(0.62), 0.24, -0.15);
    fiatCar.add(hl2);

    function GrillXOffset(val: number) { return val; }

    // Position Car abandoned off-road
    fiatCar.position.set(-1.2, 0.05, 0.8);
    fiatCar.rotation.y = 0.55;
    scene.add(fiatCar);

    // 9. Interactive Visual Beacons (Pulsing holographic markers)
    const beaconGroup = new THREE.Group();
    markers.forEach((m) => {
      const g = new THREE.Group();
      g.name = `marker-${m.id}`;

      // Floating outer ring
      const ringGeo = new THREE.RingGeometry(0.24, 0.3, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: m.id === "spot" ? "#ef4444" : "#eab308",
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.05;
      g.add(ring);

      // High glowing inner sphere
      const sphereGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: m.id === "spot" ? "#ef4444" : "#eab308",
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.y = 0.5;
      g.add(sphere);

      // Forensic search vertical transparent laser line
      const lineGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.5, 8, 1, true);
      const lineMat = new THREE.MeshBasicMaterial({
        color: m.id === "spot" ? "#ef4444" : "#eab308",
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.position.y = 1.25;
      g.add(line);

      g.position.copy(m.pos);
      beaconGroup.add(g);
    });
    scene.add(beaconGroup);

    // 10. Frame/Tick Loop
    let autoRotateTime = 0;

    const tick = () => {
      autoRotateTime += 0.003;

      // Smooth camera orbit
      const currentRadius = zoom.current;
      const targetAngleY = rotation.current.y + (isDragging.current ? 0 : autoRotateTime * 0.08);
      const targetAngleX = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, rotation.current.x));

      camera.position.x = Math.sin(targetAngleY) * Math.cos(targetAngleX) * currentRadius;
      camera.position.z = Math.cos(targetAngleY) * Math.cos(targetAngleX) * currentRadius;
      camera.position.y = Math.sin(targetAngleX) * currentRadius;
      
      camera.lookAt(0, 0.4, 0);

      // Pulse the markers/beacons
      const time = Date.now() * 0.004;
      beaconGroup.children.forEach((b: THREE.Object3D) => {
        const ring = b.children[0] as THREE.Mesh;
        const sphere = b.children[1] as THREE.Mesh;
        
        if (ring) {
          const scale = 1 + Math.sin(time) * 0.25;
          ring.scale.set(scale, scale, 1);
          if (ring.material) {
            (ring.material as THREE.Material).opacity = 0.8 - (scale - 1) * 2;
          }
        }
        if (sphere) {
          sphere.position.y = 0.5 + Math.sin(time * 1.5) * 0.08;
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // 11. Handle Resizing with ResizeObserver
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    } catch (err) {
      console.warn("WebGL not supported or failed to initialize, falling back to 2D scene:", err);
      setWebglSupported(false);
      return;
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      
      // Clean up geometries & materials to prevent GPU memory leaks
      if (scene) {
        scene.traverse((object: any) => {
          if (!object.isMesh && !object.isPoints) return;
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }

      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  // Drag and rotation logic handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    rotation.current.y -= deltaX * 0.007;
    rotation.current.x = Math.max(0.15, Math.min(Math.PI / 2.2, rotation.current.x - deltaY * 0.007));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    zoom.current = Math.max(5.0, Math.min(15.0, zoom.current + e.deltaY * 0.005));
  };

  const resetCamera = () => {
    rotation.current = { y: 0.6, x: 0.4 };
    zoom.current = 9.5;
  };

  const activeMarkerData = markers.find((m) => m.id === activeMarker);

  return (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden bg-black border border-white/10 rounded-sm">
      {/* ThreeJS Canvas Mounting Target */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {webglSupported ? (
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />
        ) : (
          <div className="absolute inset-0 bg-[#06070a] flex items-center justify-center overflow-hidden font-mono select-none">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            {/* Concentric Sonar Circles */}
            <div className="absolute w-[90%] max-w-[360px] h-[90%] max-h-[360px] border border-red-950/20 rounded-full flex items-center justify-center">
              <div className="w-[70%] h-[70%] border border-red-950/35 rounded-full flex items-center justify-center">
                <div className="w-[40%] h-[40%] border border-red-950/50 rounded-full flex items-center justify-center">
                  <div className="w-[10%] h-[10%] bg-red-600/10 border border-red-600/40 rounded-full animate-ping" />
                </div>
              </div>
            </div>

            {/* Scanning Radar Line Sweeping */}
            <div className="absolute w-[45%] max-w-[180px] h-0.5 bg-gradient-to-r from-red-600/50 to-transparent origin-left left-1/2 top-1/2 rotate-0 animate-spin" style={{ animationDuration: "5s" }} />

            {/* Custom Interactive Hotspots styled as forensic match locations */}
            <div className="absolute inset-0 pointer-events-auto">
              {/* Fiat 1100 Node */}
              <button
                onClick={() => setActiveMarker(activeMarker === "fiat" ? null : "fiat")}
                className="absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <div className={`absolute w-8 h-8 rounded-full border border-red-500/30 animate-ping ${activeMarker === "fiat" ? "opacity-100" : "opacity-0"}`} />
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${activeMarker === "fiat" ? "bg-red-500 border-white scale-125" : "bg-zinc-950 border-red-500 group-hover:bg-red-950"}`} />
                  <span className="absolute left-5 text-[8.5px] font-black tracking-wider text-red-500 whitespace-nowrap bg-black/85 px-1.5 py-0.5 border border-red-950/60 rounded-sm shadow-md">
                    {language === "hi" ? "लावारिस फिएट" : "ABANDONED FIAT"}
                  </span>
                </div>
              </button>

              {/* Culvert Forensic Node */}
              <button
                onClick={() => setActiveMarker(activeMarker === "spot" ? null : "spot")}
                className="absolute top-[55%] left-[65%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <div className={`absolute w-8 h-8 rounded-full border border-red-500/30 animate-ping ${activeMarker === "spot" ? "opacity-100" : "opacity-0"}`} />
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${activeMarker === "spot" ? "bg-red-500 border-white scale-125" : "bg-zinc-950 border-red-500 group-hover:bg-red-950"}`} />
                  <span className="absolute left-5 text-[8.5px] font-black tracking-wider text-red-500 whitespace-nowrap bg-black/85 px-1.5 py-0.5 border border-red-950/60 rounded-sm shadow-md">
                    {language === "hi" ? "पुलिया स्थल" : "CULVERT FORENSIC SITE"}
                  </span>
                </div>
              </button>

              {/* Winding Path Node */}
              <button
                onClick={() => setActiveMarker(activeMarker === "road" ? null : "road")}
                className="absolute top-[68%] left-[45%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <div className={`absolute w-8 h-8 rounded-full border border-red-500/30 animate-ping ${activeMarker === "road" ? "opacity-100" : "opacity-0"}`} />
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${activeMarker === "road" ? "bg-red-500 border-white scale-125" : "bg-zinc-950 border-red-500 group-hover:bg-red-950"}`} />
                  <span className="absolute left-5 text-[8.5px] font-black tracking-wider text-red-500 whitespace-nowrap bg-black/85 px-1.5 py-0.5 border border-red-950/60 rounded-sm shadow-md">
                    {language === "hi" ? "टेढ़ा-मेढ़ा रिज रास्ता" : "WINDING RIDGE PATH"}
                  </span>
                </div>
              </button>
            </div>
            
            {/* Compass rose decorative overlay */}
            <div className="absolute bottom-12 right-4 text-[7px] text-zinc-500 font-mono text-right pointer-events-none select-none">
              <div>TRUE NORTH // 356°</div>
              <div>SWEEP RESOLUTION // OPTIMAL</div>
            </div>
          </div>
        )}

        {/* HUD Overlay HUD instructions */}
        <div className="absolute top-4 left-4 p-2 bg-black/70 border border-white/10 rounded backdrop-blur text-left font-mono text-[8px] text-zinc-400 space-y-1 z-10 pointer-events-none">
          <div className="flex items-center space-x-1.5 text-zinc-200">
            <Eye className="w-3.5 h-3.5 text-red-500" />
            <span className="font-bold tracking-wider">RIDGE FOREST 3D SURVEYOR</span>
          </div>
          <div>ROTATION_SPEED: LERPed</div>
          <div>ALTITUDE: {(15 - zoom.current).toFixed(1)}m</div>
          <div className="flex items-center space-x-1 text-[7px] text-zinc-500">
            <Move className="w-2.5 h-2.5" />
            <span>DRAG SCENE TO ROTATE // PINCH TO ZOOM</span>
          </div>
        </div>

        {/* Floating Reset camera controller */}
        <button
          onClick={resetCamera}
          className="absolute top-4 right-4 p-2 bg-black/95 border border-white/10 hover:border-zinc-400 rounded-sm text-zinc-400 hover:text-white transition-all backdrop-blur z-20 flex items-center space-x-1.5 text-[8.5px] font-mono uppercase cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Camera</span>
        </button>

        {/* Interactive Holographic Spot Nodes (absolute positioned buttons synced on top) */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 z-20">
          {markers.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMarker(activeMarker === m.id ? null : m.id)}
              className={`px-3 py-1.5 rounded-sm border font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer backdrop-blur-md ${
                activeMarker === m.id
                  ? "bg-red-500 border-red-400 text-black font-extrabold shadow-[0_0_12px_rgba(239,68,68,0.35)]"
                  : "bg-black/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
              }`}
            >
              {language === "hi" ? m.nameHi.split(" ")[0] : m.nameEn.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Slide-out Marker Legend and Details Panel */}
      {activeMarkerData && (
        <div className="bg-black/95 border-t border-white/10 p-4 animate-fadeIn text-left z-20 relative backdrop-blur-md">
          <div className="flex justify-between items-start mb-1.5">
            <div className="flex items-center space-x-1.5 text-red-400 font-mono text-[8.5px] font-bold tracking-widest">
              <Info className="w-3.5 h-3.5 text-red-500" />
              <span>FORENSIC SITE SCANNER // MATCH</span>
            </div>
            <button
              onClick={() => setActiveMarker(null)}
              className="text-zinc-500 hover:text-white font-mono text-[9px] uppercase hover:underline cursor-pointer"
            >
              [Close]
            </button>
          </div>
          <h4 className="font-serif text-sm font-black text-white">
            {language === "hi" ? activeMarkerData.nameHi : activeMarkerData.nameEn}
          </h4>
          <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light mt-1 opacity-95">
            {language === "hi" ? activeMarkerData.descHi : activeMarkerData.descEn}
          </p>
        </div>
      )}
    </div>
  );
}
