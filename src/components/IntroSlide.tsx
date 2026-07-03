/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, memo } from "react";
import * as THREE from "three";
import { Play, ArrowDown, Compass, ShieldAlert } from "lucide-react";
import { gsap } from "gsap";

interface IntroSlideProps {
  language: "hi" | "en";
}

export const IntroSlide = memo(function IntroSlide({ language }: IntroSlideProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bloodCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);

  // Smooth LERPed position for flashlight beam
  const flashlightOverlayRef = useRef<HTMLDivElement | null>(null);
  const flashlightPosRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, rawX: -1000, rawY: -1000 });

  // References for dynamic proximity calculations
  const hand1Ref = useRef<HTMLDivElement | null>(null);
  const hand2Ref = useRef<HTMLDivElement | null>(null);
  const knifeRef = useRef<HTMLDivElement | null>(null);

  // Typewriter effect synced to language toggle
  useEffect(() => {
    const titleText = language === "hi" ? "राख: चोपड़ा केस" : "RAAKH: THE CHOPRA CASE";
    const subtitleText = language === "hi" 
      ? "26 अगस्त 1978: एक अनसुलझा रहस्य जिसने पूरे देश को झकझोर दिया"
      : "August 26, 1978: The cold-case abduction that forever scarred a nation's soul";
      
    setTypedTitle("");
    setTypedSubtitle("");
    
    let titleIndex = 0;
    let subtitleIndex = 0;
    let subtitleInterval: any = null;
    
    const titleInterval = setInterval(() => {
      if (titleIndex < titleText.length) {
        setTypedTitle(titleText.substring(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleInterval);
        
        subtitleInterval = setInterval(() => {
          if (subtitleIndex < subtitleText.length) {
            setTypedSubtitle(subtitleText.substring(0, subtitleIndex + 1));
            subtitleIndex++;
          } else {
            clearInterval(subtitleInterval);
          }
        }, 30);
      }
    }, 50);

    return () => {
      clearInterval(titleInterval);
      if (subtitleInterval) {
        clearInterval(subtitleInterval);
      }
    };
  }, [language]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 1. Canvas Blood Splatter & Dripping Simulation (Eerie visual glass effect)
  useEffect(() => {
    if (!bloodCanvasRef.current) return;
    const canvas = bloodCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let drips: Array<{
      x: number;
      y: number;
      speed: number;
      size: number;
      length: number;
      currentLength: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize 16 running blood drips from top of the screen
    for (let i = 0; i < 16; i++) {
      drips.push({
        x: Math.random() * window.innerWidth,
        y: 0,
        speed: 0.15 + Math.random() * 0.45,
        size: 1.2 + Math.random() * 2.5,
        length: 60 + Math.random() * 220,
        currentLength: 0,
      });
    }

    // Static splatters on screen glass
    const splatters: Array<{ x: number; y: number; r: number; color: string }> = [];
    const generateSplatters = () => {
      const count = 10;
      for (let i = 0; i < count; i++) {
        splatters.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: 2.5 + Math.random() * 6.5,
          color: Math.random() > 0.6 ? "#4a0000" : "#6c0000",
        });
      }
    };
    generateSplatters();

    // Painting function
    const paint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // A. Draw running drips
      ctx.fillStyle = "#4a0000";
      ctx.strokeStyle = "#660000";

      drips.forEach((d) => {
        // Draw drip trail line
        ctx.beginPath();
        ctx.lineWidth = d.size;
        ctx.lineCap = "round";
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.currentLength);
        ctx.stroke();

        // Draw bulbous drip drop
        ctx.beginPath();
        ctx.arc(d.x, d.y + d.currentLength, d.size * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Animate drip downwards
        if (d.currentLength < d.length) {
          d.currentLength += d.speed;
        } else {
          // Occasionally reset to top with new attributes
          if (Math.random() < 0.003) {
            d.currentLength = 0;
            d.x = Math.random() * canvas.width;
            d.length = 60 + Math.random() * 220;
            d.speed = 0.15 + Math.random() * 0.45;
          }
        }
      });

      // B. Draw splatters with spikes
      splatters.forEach((s) => {
        ctx.fillStyle = s.color;
        ctx.strokeStyle = s.color;
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Draw spikes shooting from center
        const spikeCount = 6 + Math.floor(Math.random() * 4);
        for (let j = 0; j < spikeCount; j++) {
          const angle = (j * Math.PI * 2) / spikeCount + Math.random() * 0.3;
          const length = s.r * (1.3 + Math.random() * 0.7);
          const sx = s.x + Math.sin(angle) * length;
          const sy = s.y + Math.cos(angle) * length;

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(sx, sy);
          ctx.lineWidth = s.r * 0.15;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(paint);
    };

    paint();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 2. Three.js 3D Fiat 1100 Scene Setup with rain & dynamic swaying spotlights
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

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

    const canvas = canvasRef.current;
    const container = containerRef.current;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationId: number;
    let resizeObserver: ResizeObserver;
    let handleMouseMove: (event: MouseEvent) => void;

    try {
      // 1. Scene setup
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.09);

      // 2. Camera setup
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 3.2, 8.5);
      camera.lookAt(0, 0.6, 0);

      // 3. Renderer setup with shadow maps
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lights
    // Ambient light with red undertone
    const ambientLight = new THREE.AmbientLight(0x221111, 1.8);
    scene.add(ambientLight);

    // Directional moon light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Cinematic Overhead Spotlight (Crime scene red!)
    const spotLight = new THREE.SpotLight(0x8b0000, 15, 20, Math.PI / 4, 0.5, 1);
    spotLight.position.set(0, 8, -0.5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Spotlight search target for erratic sways
    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(0, 0, 0);
    scene.add(spotTarget);
    spotLight.target = spotTarget;

    // 5. 3D Car Group Model: 1978 Fiat 1100
    const carGroup = new THREE.Group();

    // Material presets
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b0000, // authoritative Crime Scene Red
      metalness: 0.9,
      roughness: 0.12,
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x111118,
      metalness: 0.95,
      roughness: 0.02,
      transparent: true,
      opacity: 0.85,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 1.0,
      roughness: 0.05,
    });

    const blackMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      metalness: 0.2,
      roughness: 0.75,
    });

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.9,
    });

    // Parts construction:
    // A. Main lower chassis
    const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.5, 4.0), bodyMaterial);
    lowerBody.position.y = 0.45;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // B. Retro Cabin (upper body)
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.7, 2.1), bodyMaterial);
    cabin.position.set(0, 1.05, -0.2);
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    carGroup.add(cabin);

    // C. Hood (front engine area)
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.38, 1.15), bodyMaterial);
    hood.position.set(0, 0.65, 1.35);
    hood.castShadow = true;
    hood.receiveShadow = true;
    carGroup.add(hood);

    // D. Classic rounded roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.05, 2.0), bodyMaterial);
    roof.position.set(0, 1.4, -0.2);
    carGroup.add(roof);

    // E. Wheels (cylinders)
    const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 32);
    wheelGeo.rotateZ(Math.PI / 2);

    const wheelCapGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.29, 16);
    wheelCapGeo.rotateZ(Math.PI / 2);

    const wheelPositions = [
      [-0.96, 0.22, 1.15],  // FL
      [0.96, 0.22, 1.15],   // FR
      [-0.96, 0.22, -1.15], // RL
      [0.96, 0.22, -1.15],  // RR
    ];

    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeo, tireMaterial);
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;

      const cap = new THREE.Mesh(wheelCapGeo, chromeMaterial);
      wheel.add(cap);

      carGroup.add(wheel);
    });

    // F. Windows (glass panes)
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 0.05), glassMaterial);
    windshield.position.set(0, 1.1, 0.85);
    windshield.rotation.x = -Math.PI / 6;
    carGroup.add(windshield);

    const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 0.05), glassMaterial);
    rearWindow.position.set(0, 1.1, -1.25);
    rearWindow.rotation.x = Math.PI / 6;
    carGroup.add(rearWindow);

    // Side windows
    const sideWinL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 1.9), glassMaterial);
    sideWinL.position.set(-0.86, 1.05, -0.2);
    carGroup.add(sideWinL);

    const sideWinR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 1.9), glassMaterial);
    sideWinR.position.set(0.86, 1.05, -0.2);
    carGroup.add(sideWinR);

    // G. Bumpers (chrome rods)
    const bumperFront = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.1, 0.12), chromeMaterial);
    bumperFront.position.set(0, 0.3, 2.05);
    carGroup.add(bumperFront);

    // H. Radiator grille & headlights
    const grille = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.02), blackMaterial);
    grille.position.set(0, 0.6, 1.94);
    carGroup.add(grille);

    const headL = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), chromeMaterial);
    headL.position.set(-0.65, 0.6, 1.9);
    carGroup.add(headL);

    const headLensL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    headLensL.position.set(-0.65, 0.6, 1.94);
    carGroup.add(headLensL);

    const headR = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), chromeMaterial);
    headR.position.set(0.65, 0.6, 1.9);
    carGroup.add(headR);

    const headLensR = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    headLensR.position.set(0.65, 0.6, 1.94);
    carGroup.add(headLensR);

    // I. License plate (Delhi registration: DHG 1729)
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.16, 0.02), blackMaterial);
    plate.position.set(0, 0.3, 2.11);
    carGroup.add(plate);

    // J. Interactive Headlights Light Beams
    const leftBeam = new THREE.SpotLight(0xfff5ee, 10, 15, Math.PI / 10, 0.4, 0.8);
    leftBeam.position.set(-0.65, 0.6, 1.95);
    leftBeam.target.position.set(-0.65, 0.1, 9.0);
    carGroup.add(leftBeam);
    carGroup.add(leftBeam.target);

    const rightBeam = new THREE.SpotLight(0xfff5ee, 10, 15, Math.PI / 10, 0.4, 0.8);
    rightBeam.position.set(0.65, 0.6, 1.95);
    rightBeam.target.position.set(0.65, 0.1, 9.0);
    carGroup.add(rightBeam);
    carGroup.add(rightBeam.target);

    // Position car and add to scene
    carGroup.position.set(0, 0.05, 0);
    scene.add(carGroup);

    // 6. Ground grid helper for forensic aesthetic
    const gridHelper = new THREE.GridHelper(24, 24, 0x8b0000, 0x1f1515);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // 7. Ground shadow floor plane
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.65 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Upgraded addition: 3D Blood puddle on ground
    const poolGeo = new THREE.RingGeometry(0.1, 1.9, 32);
    const poolMat = new THREE.MeshBasicMaterial({
      color: 0x4a0000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const groundPool = new THREE.Mesh(poolGeo, poolMat);
    groundPool.rotation.x = -Math.PI / 2;
    groundPool.position.set(-0.4, 0.02, 0.35); // placed realistically near driver/passenger cabin side
    scene.add(groundPool);

    // Upgraded addition: 3D Rain particles system
    const rainGeometry = new THREE.BufferGeometry();
    const rainCount = 450;
    const rainPositions = new Float32Array(rainCount * 3);
    const rainSpeeds: number[] = [];
    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 16;     // x
      rainPositions[i * 3 + 1] = Math.random() * 10;          // y
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;  // z
      rainSpeeds.push(0.08 + Math.random() * 0.14);
    }
    rainGeometry.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
    const rainMaterial = new THREE.PointsMaterial({
      color: 0x5c75ab,
      size: 0.07,
      transparent: true,
      opacity: 0.45,
    });
    const rainParticles = new THREE.Points(rainGeometry, rainMaterial);
    scene.add(rainParticles);

    // Upgraded addition: Yellow forensic tent markers on the 3D ground
    const markerGroup = new THREE.Group();
    const tentGeo = new THREE.ConeGeometry(0.12, 0.24, 4); // low-poly tent marker
    const tentMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.5 });
    
    const markersPos = [
      [-1.5, 0.12, -0.6], // Marker A
      [1.3, 0.12, 0.9],   // Marker B
      [-0.4, 0.12, 2.3],  // Marker C
    ];

    markersPos.forEach((m) => {
      const tent = new THREE.Mesh(tentGeo, tentMat);
      tent.position.set(m[0], m[1], m[2]);
      tent.castShadow = true;
      markerGroup.add(tent);

      // Forensic floating dot marker above tent
      const dotGeo = new THREE.SphereGeometry(0.035, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xeab308 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(m[0], m[1] + 0.28, m[2]);
      markerGroup.add(dot);
    });
    scene.add(markerGroup);

    // 8. Animation & interactive cursor search loop
    let targetRotationY = 0;
    
    // Cache container and evidence bounding boxes to prevent Layout Thrashing during mousemove
    let containerRect = container.getBoundingClientRect();
    let hand1Bounds: DOMRect | null = null;
    let hand2Bounds: DOMRect | null = null;
    let knifeBounds: DOMRect | null = null;

    const updateCachedBounds = () => {
      containerRect = container.getBoundingClientRect();
      const h1 = document.getElementById("evidence-hand1");
      const h2 = document.getElementById("evidence-hand2");
      const k = document.getElementById("evidence-knife");
      if (h1) hand1Bounds = h1.getBoundingClientRect();
      if (h2) hand2Bounds = h2.getBoundingClientRect();
      if (k) knifeBounds = k.getBoundingClientRect();
    };

    // Calculate once on load and update whenever container bounds or size changes
    updateCachedBounds();

    // Unified mouse tracking flashlight & 3D tilt handler (0 overhead, deferred execution!)
    handleMouseMove = (event: MouseEvent) => {
      flashlightPosRef.current.rawX = event.clientX;
      flashlightPosRef.current.rawY = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const timeSec = Date.now() * 0.001;
      const pos = flashlightPosRef.current;

      // 1. Compute and update mouse tracking/flashlight/proximity inside RAF to prevent jank
      if (pos.rawX !== -1000 && pos.rawY !== -1000) {
        const rawX = pos.rawX;
        const rawY = pos.rawY;

        const normalizedX = (rawX / window.innerWidth) * 2 - 1;
        targetRotationY = normalizedX * 0.35;

        if (containerRect) {
          const fx = rawX - containerRect.left;
          const fy = rawY - containerRect.top;

          const reticle = document.getElementById("forensic-reticle");
          if (reticle) {
            // GPU-accelerated 3D transforms avoid document-wide reflows!
            reticle.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%, -50%)`;
            const xText = document.getElementById("reticle-coord-x");
            const yText = document.getElementById("reticle-coord-y");
            if (xText) xText.textContent = `X: ${Math.floor(fx)}`;
            if (yText) yText.textContent = `Y: ${Math.floor(fy)}`;
          }

          pos.targetX = fx;
          pos.targetY = fy;

          // Compute distances using pre-cached bounding rect positions (0 layout thrashing!)
          const hand1 = document.getElementById("evidence-hand1");
          const hand2 = document.getElementById("evidence-hand2");
          const knife = document.getElementById("evidence-knife");

          if (hand1 && hand1Bounds) {
            const cx = hand1Bounds.left + hand1Bounds.width / 2;
            const cy = hand1Bounds.top + hand1Bounds.height / 2;
            const dist = Math.hypot(rawX - cx, rawY - cy);
            const op = Math.max(0.12, Math.min(1.0, 1.45 - dist / 220));
            hand1.style.opacity = op.toString();
            const filterVal = dist < 210 ? "drop-shadow(0 0 16px rgba(239,68,68,0.9)) scale(1.05)" : "none";
            if (hand1.style.filter !== filterVal) hand1.style.filter = filterVal;
          }

          if (hand2 && hand2Bounds) {
            const cx = hand2Bounds.left + hand2Bounds.width / 2;
            const cy = hand2Bounds.top + hand2Bounds.height / 2;
            const dist = Math.hypot(rawX - cx, rawY - cy);
            const op = Math.max(0.12, Math.min(1.0, 1.45 - dist / 220));
            hand2.style.opacity = op.toString();
            const filterVal = dist < 210 ? "drop-shadow(0 0 16px rgba(239,68,68,0.9)) scale(1.05)" : "none";
            if (hand2.style.filter !== filterVal) hand2.style.filter = filterVal;
          }

          if (knife && knifeBounds) {
            const cx = knifeBounds.left + knifeBounds.width / 2;
            const cy = knifeBounds.top + knifeBounds.height / 2;
            const dist = Math.hypot(rawX - cx, rawY - cy);
            const op = Math.max(0.08, Math.min(1.0, 1.35 - dist / 220));
            knife.style.opacity = op.toString();
            const filterVal = dist < 210 ? "drop-shadow(0 0 22px rgba(239,68,68,0.8)) scale(1.06)" : "none";
            if (knife.style.filter !== filterVal) knife.style.filter = filterVal;
          }
        }
      }

      // Update 2D LERPed Flashlight Pos inside RAF (extremely high-speed, perfect frame sync!)
      if (pos.targetX !== undefined && pos.targetY !== undefined) {
        if (pos.x === -1000) {
          pos.x = pos.targetX;
          pos.y = pos.targetY;
        } else {
          pos.x += (pos.targetX - pos.x) * 0.15;
          pos.y += (pos.targetY - pos.y) * 0.15;
        }
        if (flashlightOverlayRef.current) {
          flashlightOverlayRef.current.style.background = `radial-gradient(circle 240px at ${pos.x}px ${pos.y}px, rgba(239, 68, 68, 0.04) 0%, rgba(0, 0, 0, 0.45) 55%, rgba(0, 0, 0, 0.99) 100%)`;
        }
      }

      // Slowly rotate 3D Fiat 1100 + track cursor tilt
      carGroup.rotation.y += 0.0035;
      carGroup.rotation.y = THREE.MathUtils.lerp(carGroup.rotation.y, carGroup.rotation.y + targetRotationY, 0.05);

      // Gentle floating suspense movement
      carGroup.position.y = 0.05 + Math.sin(timeSec * 1.5) * 0.04;

      // Erratic overhead spotlight search sweeps (representing active military/police search)
      spotTarget.position.x = Math.sin(timeSec * 1.1) * 2.5;
      spotTarget.position.z = Math.cos(timeSec * 0.7) * 2.5;

      // Headlight search beams gentle shaking
      leftBeam.target.position.x = -0.65 + Math.sin(timeSec * 1.6) * 1.8;
      rightBeam.target.position.x = 0.65 + Math.sin(timeSec * 1.6) * 1.8;
      leftBeam.target.position.y = Math.cos(timeSec * 2.1) * 0.8;
      rightBeam.target.position.y = Math.cos(timeSec * 2.1) * 0.8;

      // Animate 3D Rain particles falling downwards
      const positions = rainGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= rainSpeeds[i];
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 10; // reset to top
        }
      }
      rainGeometry.attributes.position.needsUpdate = true;

      // Pulse floating forensic dots above yellow markers
      markerGroup.children.forEach((obj, idx) => {
        if (obj instanceof THREE.Mesh) {
          if (idx % 2 === 1) { // floating dots are odd indices
            obj.position.y = 0.28 + Math.sin(timeSec * 3 + idx) * 0.04;
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize observer
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        updateCachedBounds(); // update bounds on size change to preserve proximity matching precision
      }
    });
    resizeObserver.observe(container);

    // Store references on window for cinematic GSAP entrance trigger
    (window as any)._fiatIntroScene = { scene, camera, renderer, carGroup, leftBeam, rightBeam };

    } catch (err) {
      console.warn("WebGL not supported or failed to initialize, falling back to 2D scene:", err);
      setWebglSupported(false);
      return;
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      
      // Clean up geometries & materials
      if (scene) {
        scene.traverse((object: any) => {
          if (!object.isMesh && !object.isPoints) return;
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        });
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  // Cinematic "Begin Case File" click handler with high-speed zoom and wipeout transitions
  const handleEnterClick = () => {
    const activeScene = (window as any)._fiatIntroScene;
    
    // Stop ambient rotations and trigger high speed cinematic zoom-in
    gsap.to(".flashlight-overlay", { opacity: 0, duration: 0.8 });
    gsap.to("#evidence-hand1, #evidence-hand2, #evidence-knife", { opacity: 0, scale: 0.8, duration: 0.8 });

    if (activeScene) {
      const { camera, carGroup } = activeScene;
      
      gsap.to(carGroup.rotation, { y: Math.PI * 2, duration: 1.5, ease: "power2.inOut" });
      gsap.to(camera.position, {
        x: 0,
        y: 0.6,
        z: 2.2,
        duration: 1.6,
        ease: "power3.in",
        onComplete: () => {
          // Scroll cleanly past the hero slide
          const nextSec = containerRef.current?.nextElementSibling;
          if (nextSec) {
            nextSec.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }
        }
      });
    } else {
      // Fallback
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-black flex flex-col justify-between items-center px-6 md:px-12 py-12 relative overflow-hidden text-center z-10 animate-crime-vignette"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        .flashlight-overlay {
          transition: background 0.04s ease;
        }
        .bloody-heartbeat {
          animation: heartbeat 1.5s infinite ease-in-out;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 3px rgba(220,38,38,0.4)); }
          50% { transform: scale(1.025); filter: drop-shadow(0 0 10px rgba(220,38,38,0.85)); }
        }
        @keyframes crt-flicker {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.22; }
          75% { opacity: 0.12; }
          85% { opacity: 0.26; }
        }
        .animate-crt-flicker {
          animation: crt-flicker 0.12s infinite;
        }
        @keyframes crime-vignette {
          0%, 100% { box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.95); }
          50% { box-shadow: inset 0 0 110px rgba(185, 28, 28, 0.22); }
        }
        .animate-crime-vignette {
          animation: crime-vignette 5s infinite ease-in-out;
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-1.5deg) translateY(0); }
          50% { transform: rotate(1.5deg) translateY(1px); }
        }
        .animate-sway {
          animation: sway 7s ease-in-out infinite;
          transform-origin: top center;
          will-change: transform;
        }
        @keyframes sway-delayed {
          0%, 100% { transform: rotate(1.2deg) translateY(0); }
          50% { transform: rotate(-1.2deg) translateY(1.5px); }
        }
        .animate-sway-delayed {
          animation: sway-delayed 9s ease-in-out infinite;
          transform-origin: top center;
          will-change: transform;
        }
        @keyframes paper-flutter {
          0%, 100% { transform: scale(1) rotate(var(--rot)) translateY(0); }
          50% { transform: scale(1) rotate(calc(var(--rot) + 0.3deg)) translateY(-1px); }
        }
        .animate-paper-flutter {
          animation: paper-flutter 5.5s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes fall {
          0% { transform: translateY(-50px); }
          100% { transform: translateY(110vh); }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>

      <div className="grain"></div>

      {/* Vintage Cinematic CRT Scanline and Flicker Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] opacity-25 animate-crt-flicker" />
      
      {/* Dynamic Forensic Scanning Reticle (follows mouse cursor smoothly) */}
      <div 
        id="forensic-reticle"
        className="hidden md:block absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 transition-all duration-75 mix-blend-screen"
        style={{ left: "-200px", top: "-200px" }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-11 h-11 border border-red-500/40 rounded-full animate-spin" style={{ animationDuration: "6s" }} />
          <div className="absolute w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]" />
          <div className="absolute left-7 top-1 text-[7px] font-mono text-red-400 bg-black/90 px-1.5 py-0.5 border border-red-900/60 rounded shadow-[0_4px_12px_rgba(0,0,0,0.8)] whitespace-nowrap tracking-wider">
            <span id="reticle-coord-x" className="block text-[6px] text-zinc-500">X: 000</span>
            <span id="reticle-coord-y" className="block text-[6px] text-zinc-500">Y: 000</span>
            <span className="block text-red-500 font-extrabold animate-pulse">LOCKED: 1978_DELHI</span>
          </div>
        </div>
      </div>
      
      {/* 1. Absolute fullscreen Three.js canvas container */}
      <div className="absolute inset-0 z-0 pointer-events-auto bg-[#040406]">
        {webglSupported ? (
          <canvas ref={canvasRef} className="w-full h-full object-cover block" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Ambient Dark Forest silhouette backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/40 to-black opacity-80" />
            
            {/* Forest tree outlines or dark ambient glows */}
            <div className="absolute top-[20%] left-[-10%] w-[120%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent blur-3xl pointer-events-none" />
            
            {/* Styled 2D Silhouette of the Crime Scene Car (Fiat 1100) */}
            <div className="relative w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[420px] md:max-w-[500px] h-[160px] xs:h-[200px] sm:h-[240px] flex flex-col items-center justify-center transition-all duration-700 animate-pulse" style={{ animationDuration: "8s" }}>
              {/* Crime Scene Yellow Tape overlay styled inside fallback */}
              <div className="absolute bottom-[10%] w-[140%] h-[15px] bg-[#eab308]/90 border-y border-black text-black font-mono text-[7px] font-black uppercase tracking-[0.2em] flex items-center justify-center rotate-[-4deg] z-10 shadow-lg select-none">
                {language === "hi" ? "पुलिस लाइन - प्रवेश निषेध - पुलिस लाइन" : "POLICE LINE DO NOT CROSS - CRIME SCENE"}
              </div>

              {/* Glowing Red Tail lights & Yellow Headlights */}
              <div className="absolute bottom-[28%] left-[22%] w-3 h-3 bg-red-600 rounded-full blur-[4px] animate-pulse shadow-[0_0_12px_#dc2626]" />
              <div className="absolute bottom-[28%] right-[22%] w-3 h-3 bg-yellow-400 rounded-full blur-[3px] animate-pulse shadow-[0_0_10px_#facc15]" />

              {/* Glowing Ground Mist */}
              <div className="absolute bottom-0 w-[120%] h-[35px] bg-gradient-to-t from-red-950/20 to-transparent blur-md rounded-full animate-pulse" style={{ animationDuration: "4s" }} />

              {/* Silhouette SVG of Vintage Fiat 1100 */}
              <svg className="w-full h-full text-[#08080c] drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]" viewBox="0 0 500 240" fill="currentColor">
                {/* Vintage Car Shape */}
                <path d="M70,180 L80,140 C85,120 110,85 160,80 L280,80 C330,85 365,115 385,140 L430,150 L440,180 C445,190 435,200 415,200 L85,200 C75,200 68,190 70,180 Z" />
                {/* Roof/Cabin structure */}
                <path d="M145,85 L180,45 C195,30 220,25 285,25 C340,25 355,30 365,45 L395,85 Z" fill="#040406" />
                {/* Windshield & Windows (Dark translucent) */}
                <polygon points="182,48 240,48 240,80 158,80" fill="#111116" opacity="0.85" />
                <polygon points="252,48 358,48 376,80 252,80" fill="#111116" opacity="0.85" />
                {/* Headlights detail */}
                <circle cx="432" cy="165" r="9" fill="#fef3c7" className="animate-pulse" />
                {/* Tail lights detail */}
                <circle cx="68" cy="162" r="6" fill="#ef4444" />
                {/* Wheels */}
                <circle cx="135" cy="195" r="24" fill="#020203" />
                <circle cx="135" cy="195" r="11" fill="#1c1917" />
                <circle cx="365" cy="195" r="24" fill="#020203" />
                <circle cx="365" cy="195" r="11" fill="#1c1917" />
                {/* Wheel cap shining silver */}
                <circle cx="135" cy="195" r="5" fill="#a8a29e" />
                <circle cx="365" cy="195" r="5" fill="#a8a29e" />
                {/* Front Bumper Chrome */}
                <rect x="420" y="178" width="28" height="6" rx="3" fill="#78716c" />
                {/* Rear Bumper Chrome */}
                <rect x="52" y="176" width="22" height="6" rx="3" fill="#78716c" />
              </svg>

              {/* Vertical police investigation spotlight from top center sweeping slowly */}
              <div className="absolute top-[-100px] left-[50%] -translate-x-1/2 w-[350px] h-[340px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent blur-xl pointer-events-none origin-top animate-sway-delayed" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            </div>

            {/* Falling 2D Rain drops for rich atmosphere */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="rain-container absolute inset-0">
                {/* Pure CSS Rain strokes */}
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-gradient-to-b from-transparent to-zinc-400 w-[1px] h-[45px] opacity-40 animate-fall"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-${Math.random() * 20}%`,
                      animationDuration: `${0.8 + Math.random() * 0.6}s`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationIterationCount: 'infinite',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cinematic Forensic Board Backdrop Layer (Scattered documents, thin red strings, pins, stamps, and sways) */}
      <div className="absolute inset-0 z-[0.5] pointer-events-none overflow-hidden select-none">
        {/* SVG Murder Web (Thin red strings connecting documents and pins) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.22] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
          {/* We will draw thin red string connections with drop-shadows */}
          <line x1="20%" y1="25%" x2="55%" y2="20%" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="20%" y1="25%" x2="25%" y2="75%" stroke="#dc2626" strokeWidth="1.2" />
          <line x1="55%" y1="20%" x2="85%" y2="40%" stroke="#dc2626" strokeWidth="1" />
          <line x1="85%" y1="40%" x2="80%" y2="80%" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="4 2" />
          <line x1="25%" y1="75%" x2="80%" y2="80%" stroke="#dc2626" strokeWidth="1" />
          <line x1="30%" y1="24%" x2="20%" y2="25%" stroke="#991b1b" strokeWidth="1.5" />
          <line x1="68%" y1="26%" x2="85%" y2="40%" stroke="#991b1b" strokeWidth="1.5" />
        </svg>

        {/* 1. Autopsy Report Sheet (Left mid-upper area) */}
        <div 
          className="hidden xs:block absolute left-[2%] sm:left-[6%] md:left-[8%] top-[10%] sm:top-[14%] w-[130px] sm:w-[170px] md:w-[250px] p-2 md:p-4 bg-[#050507]/95 border border-white/5 shadow-[0_15px_45px_rgba(0,0,0,0.95)] opacity-[0.06] md:opacity-[0.10] hover:opacity-50 transition-all duration-500 animate-paper-flutter"
          style={{ '--rot': '-4deg' } as any}
        >
          {/* Tape on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 md:w-14 h-2.5 md:h-4 bg-yellow-950/25 border border-yellow-800/20 backdrop-blur-[1px] rotate-2" />
          <div className="font-mono text-[5px] md:text-[7px] text-zinc-500 leading-tight space-y-1 md:space-y-2">
            <div className="flex justify-between border-b border-white/10 pb-1.5 mb-1.5 font-bold">
              <span className="text-red-500/80 text-[4.5px] md:text-[6.5px]">RECORD: AP-104_78</span>
              <span>27 AUG 1978</span>
            </div>
            <div className="text-[6.5px] md:text-[9px] font-bold text-zinc-300 tracking-wider">POST-MORTEM INQUEST SUMMARY</div>
            <div>
              <span className="text-zinc-400">VICTIM:</span> Sanjay Chopra, Age 16<br />
              <span className="text-zinc-400">EXAMINATION:</span> Dr. T. D. Dogra, Delhi<br />
              <span className="text-zinc-400">CAUSE OF DEATH:</span> Acute hemorrhage due to multiple incised wounds from sharp weapon.
            </div>
            <div className="pt-1.5 md:pt-2 border-t border-white/5 text-[4.5px] md:text-[6px]">
              * STOMACH CONTENTS INDICATION TIMING MATCHES ESTIMATED HOUR.
            </div>
          </div>
          {/* Circular Stamp */}
          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 w-7 md:w-12 h-7 md:h-12 rounded-full border border-red-700/35 flex items-center justify-center -rotate-12 text-[4px] md:text-[5px] font-mono text-red-600/40 font-black">
            CB-DELHI
          </div>
        </div>

        {/* 2. Witness Statement Sheet (Right mid-upper area) */}
        <div 
          className="hidden sm:block absolute right-[3%] md:right-[10%] top-[20%] md:top-[24%] w-[140px] md:w-[230px] p-2 md:p-4 bg-[#050507]/95 border border-white/5 shadow-[0_15px_45px_rgba(0,0,0,0.95)] opacity-[0.06] md:opacity-[0.08] hover:opacity-40 transition-all duration-500 animate-paper-flutter"
          style={{ '--rot': '3deg' } as any}
        >
          {/* Metal Staple effect */}
          <div className="absolute -top-1 left-4 w-3.5 h-1 bg-zinc-700 border-b border-black rotate-6" />
          <div className="font-mono text-[5.5px] md:text-[7px] text-zinc-500 leading-tight space-y-1 md:space-y-2">
            <div className="border-b border-white/10 pb-1 mb-1.5 text-[6.5px] md:text-[8px] font-bold text-zinc-400">
              POLICE RECONSTRUCTION DIARY
            </div>
            <div>
              <span className="text-zinc-400">WITNESS #3:</span> Bhagwan Dass, taxi-driver.<br />
              <span className="text-zinc-400">DEPOSITION:</span> Observed mustard-coloured Fiat 1100 (Registration <span className="text-red-400 font-bold">DHZ 9422</span>) near Gole Dakkhana area at approx 18:35 hrs on Aug 26.
            </div>
            <div className="italic text-zinc-600 text-[5px] md:text-[6.5px]">
              "Screams detected from vehicle rear compartment. Suspects refused inspection, fled towards Ridge Road forest."
            </div>
          </div>
          {/* Pin marker */}
          <div className="absolute -top-1 right-8 w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-red-600 shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
        </div>

        {/* 3. Crime Scene Sketch (Lower-left area) */}
        <div 
          className="hidden sm:block absolute left-[3%] md:left-[12%] bottom-[8%] md:bottom-[12%] w-[130px] md:w-[220px] p-2 md:p-4 bg-[#050507]/95 border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.95)] opacity-[0.06] md:opacity-[0.10] hover:opacity-50 transition-all duration-500 animate-paper-flutter"
          style={{ '--rot': '-2deg' } as any}
        >
          <div className="font-mono text-[5.5px] md:text-[7px] text-zinc-400 mb-2 font-bold tracking-wider flex justify-between items-center">
            <span>MAP REF: DELHI-RIDGE-RECON</span>
            <span className="text-red-500/70 text-[4.5px] md:text-[6px]">CONFIDENTIAL</span>
          </div>
          <svg viewBox="0 0 100 80" className="w-full h-auto text-zinc-600 stroke-current fill-none mb-1.5 opacity-65">
            {/* Draw a schematic path of Ridge forest road */}
            <path d="M10,65 Q35,50 50,40 T90,15" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M10,67 Q35,52 50,42 T90,17" strokeWidth="0.5" strokeDasharray="2 1" />
            {/* Circle stain location */}
            <circle cx="53" cy="41" r="5" stroke="#ef4444" strokeWidth="0.8" />
            <line x1="53" y1="31" x2="53" y2="51" stroke="#ef4444" strokeWidth="0.5" />
            <line x1="43" y1="41" x2="63" y2="41" stroke="#ef4444" strokeWidth="0.5" />
            {/* Text labels on map */}
            <text x="5" y="75" fill="#888" fontSize="4" fontFamily="monospace">Gole Dakkhana Rd</text>
            <text x="48" y="27" fill="#ef4444" fontSize="4.5" fontFamily="monospace" fontWeight="bold">BODY RECOVERY SITE</text>
            <text x="65" y="10" fill="#888" fontSize="4" fontFamily="monospace">To Dhaula Kuan</text>
            {/* Footprint sketches */}
            <path d="M25,58 C25,55 28,55 28,58 C28,60 26,62 25,62" stroke="#555" strokeWidth="0.5" />
            <path d="M31,54 C31,51 34,51 34,54 C34,56 32,58 31,58" stroke="#555" strokeWidth="0.5" />
          </svg>
          <div className="font-mono text-[5px] md:text-[6px] text-zinc-500 border-t border-white/5 pt-1.5 text-center">
            FIGURE 2: TOPOGRAPHIC TRACK RECONSTRUCTION
          </div>
        </div>

        {/* 4. Suspect Dossier Page (Lower-right area) */}
        <div 
          className="hidden xs:block absolute right-[2%] md:right-[12%] bottom-[10%] md:bottom-[13%] w-[130px] md:w-[220px] p-2 md:p-4 bg-[#050507]/95 border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.95)] opacity-[0.05] md:opacity-[0.08] hover:opacity-45 transition-all duration-500 animate-paper-flutter"
          style={{ '--rot': '5deg' } as any}
        >
          {/* Staple details */}
          <div className="absolute -top-2 left-1/3 w-8 h-3.5 bg-zinc-950/40 border border-zinc-800/30 rotate-1" />
          <div className="font-mono text-[5.5px] md:text-[7px] text-zinc-500 leading-tight space-y-1.5 md:space-y-2">
            <div className="flex justify-between border-b border-white/10 pb-1 mb-1.5">
              <span className="font-bold text-red-500/80">DOSSIER // CONFIDENTIAL</span>
              <span>MHA_DELHI</span>
            </div>
            <div>
              <span className="text-zinc-400 font-bold">PRIMARY SUSPECTS:</span><br />
              1. <span className="text-zinc-300">"Billa"</span> (Jasbir Singh)<br />
              2. <span className="text-zinc-300">"Ranga"</span> (Kuljeet Singh)<br />
              <span className="text-zinc-400">RECORD:</span> Deserters from Navy. Armed robbery, theft.
            </div>
            <div className="text-[4.5px] md:text-[6px] text-zinc-600 bg-red-950/20 p-1 border border-red-900/10 rounded">
              WARRANT SIGNED. TARGET ARMED & DANGEROUS.
            </div>
          </div>
        </div>

        {/* 5. Hanging Fingerprint Evidence Card (Top-left, hanging from red string) */}
        <div className="hidden md:flex absolute left-[30%] top-0 h-[190px] w-[95px] flex-col items-center animate-sway">
          {/* Thread */}
          <div className="w-[1px] h-[95px] bg-red-800/40" />
          {/* Pin */}
          <div className="absolute top-[90px] w-1.5 h-1.5 rounded-full bg-zinc-400 shadow" />
          {/* Card */}
          <div className="w-full bg-[#050507]/95 border border-white/10 p-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.8)] flex flex-col items-center">
            {/* Stamp on card */}
            <div className="absolute top-1 right-1 text-[4.5px] border border-red-700/30 text-red-600/40 font-mono px-0.5 rounded rotate-12 scale-90">
              MATCHED
            </div>
            {/* SVG Fingerprint */}
            <svg viewBox="0 0 100 120" className="w-12 h-14 text-zinc-400 fill-none stroke-current opacity-80 mt-1">
              <path d="M50,110 C50,90 40,75 50,55" strokeWidth="0.8" />
              <path d="M42,108 C42,88 32,73 45,50 C48,47 52,47 55,50 C68,65 58,80 58,108" strokeWidth="0.8" />
              <path d="M34,105 C34,80 24,65 40,42 C45,35 55,35 60,42 C76,60 66,75 66,105" strokeWidth="0.8" />
              <path d="M26,100 C26,72 16,57 35,34 C42,26 58,26 65,34 C84,55 74,70 74,100" strokeWidth="0.8" />
              <path d="M18,95 C18,64 8,49 30,26 C40,16 60,16 70,26 C92,50 82,65 82,95" strokeWidth="0.8" />
            </svg>
            <div className="font-mono text-[5.5px] text-zinc-500 mt-2 text-center leading-none">
              <span className="text-zinc-400 font-bold block mb-0.5">EXHIBIT C</span>
              LATENT PRINT: REAR REVEAL
            </div>
          </div>
        </div>

        {/* 6. Hanging Forensic Photo Exhibit Tag (Top-right, hanging from red string) */}
        <div className="hidden lg:flex absolute right-[33%] top-0 h-[210px] w-[100px] flex-col items-center animate-sway-delayed">
          {/* Thread */}
          <div className="w-[1px] h-[105px] bg-red-800/40" />
          {/* Pin */}
          <div className="absolute top-[100px] w-1.5 h-1.5 rounded-full bg-zinc-400 shadow" />
          {/* Card */}
          <div className="w-full bg-[#050507]/95 border border-white/10 p-2 shadow-[0_8px_20px_rgba(0,0,0,0.8)] flex flex-col items-center">
            {/* Exhibit label */}
            <div className="w-full border-b border-white/10 pb-1 mb-1 text-[5px] font-mono text-zinc-500 text-center font-bold">
              DELHI CRIME BRANCH // LAB_D9
            </div>
            {/* Schematic representation of a tire thread print */}
            <div className="w-full h-14 bg-zinc-950 flex flex-col justify-between p-1 opacity-75">
              <div className="flex justify-around items-center h-full gap-[2px]">
                <div className="w-[3px] h-full bg-zinc-800 flex flex-col justify-between py-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-[2px] bg-red-700/80 -rotate-12" />
                  ))}
                </div>
                <div className="w-[3px] h-full bg-zinc-800 flex flex-col justify-between py-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-[2px] bg-red-700/80 -rotate-12" />
                  ))}
                </div>
                <div className="flex-1 text-[4px] font-mono text-zinc-600 self-center text-center leading-tight">
                  TIRE TRACK<br />CAST RED #08
                </div>
              </div>
            </div>
            <div className="font-mono text-[5.5px] text-zinc-500 mt-2 text-center leading-none">
              <span className="text-zinc-400 font-bold block mb-0.5">EXHIBIT E</span>
              TIRE RECONSTRUCTION
            </div>
          </div>
        </div>

        {/* 7. Subtle Scattered Seals / Stamp Marks (Directly on the back board) */}
        {/* Top classified stamp */}
        <div className="absolute top-[8%] left-[45%] -translate-x-1/2 border-[1.5px] border-red-700/20 text-red-700/25 px-4 py-1 rounded font-mono text-[10px] tracking-[0.3em] font-black uppercase -rotate-12">
          CLASSIFIED
        </div>
        {/* Middle confidence stamp */}
        <div className="absolute top-[48%] right-[22%] border-2 border-red-800/15 text-red-800/15 px-3 py-1 font-mono text-[9px] tracking-[0.25em] font-bold uppercase rotate-[20deg]">
          STRICTLY CONFIDENTIAL
        </div>
        {/* Sealed stamp */}
        <div className="absolute bottom-[28%] left-[28%] w-16 h-16 rounded-full border-2 border-dashed border-red-900/15 flex flex-col items-center justify-center font-mono text-[6px] text-red-900/15 font-bold uppercase rotate-45">
          <span>CASE SEALED</span>
          <span className="text-[4px] mt-0.5">MHA 1978</span>
        </div>

        {/* 8. Forensics dried blood transfer stains & droplets scatter */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30 select-none">
          {/* Subtle brownish/dark-red dried droplets */}
          <div className="absolute left-[38%] top-[28%] w-1.5 h-1.5 rounded-full bg-[#3d0202] opacity-75 blur-[0.2px]" />
          <div className="absolute left-[39.5%] top-[29%] w-1 h-1 rounded-full bg-[#300101] opacity-80" />
          <div className="absolute left-[37.8%] top-[30.5%] w-0.5 h-0.5 rounded-full bg-[#420202] opacity-60" />

          <div className="absolute right-[42%] bottom-[35%] w-2 h-2 rounded-full bg-[#3a0101] opacity-[0.85] blur-[0.3px]" />
          <div className="absolute right-[41%] bottom-[33%] w-1 h-1.5 rounded-full bg-[#3d0202] opacity-70 -rotate-12" />
          <div className="absolute right-[43.5%] bottom-[36%] w-1 h-1 rounded-full bg-[#2a0101] opacity-60" />

          {/* Forensic circle marking around dry blood stain */}
          <div className="absolute left-[38%] top-[28%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-dashed border-red-800/25 flex items-center justify-center">
            <span className="font-mono text-[4.5px] text-red-800/40">STA_A1</span>
          </div>
          <div className="absolute right-[42%] bottom-[35%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-dashed border-red-800/25 flex items-center justify-center">
            <span className="font-mono text-[4.5px] text-red-800/40">STA_B3</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive flashlight beam shading layer (Restricting vision to cursor proximity) */}
      <div 
        ref={flashlightOverlayRef}
        className="absolute inset-0 pointer-events-none z-1 flashlight-overlay"
        style={{
          background: `radial-gradient(circle 240px at -1000px -1000px, rgba(239, 68, 68, 0.04) 0%, rgba(0, 0, 0, 0.45) 55%, rgba(0, 0, 0, 0.99) 100%)`
        }}
      />

      {/* 3. Interactive Blood Splatter / Run Canvas overlay */}
      <canvas 
        ref={bloodCanvasRef} 
        className="absolute inset-0 pointer-events-none z-2" 
      />

      {/* 4. Top-Left Criss-cross Police Restricted Warning Tape */}
      <div 
        className="absolute top-10 sm:top-16 -left-24 sm:-left-20 w-[300px] sm:w-[420px] h-7 sm:h-10 bg-[#eab308] border-t-[3px] border-b-[3px] border-black text-black font-mono text-[7px] sm:text-[9px] font-black uppercase flex items-center justify-center -rotate-12 select-none z-20 shadow-[0_4px_22px_rgba(0,0,0,0.75)]"
      >
        <div className="animate-marquee-slow">
          🚨 CRIME SCENE KEEP OUT // प्रतिबंध क्षेत्र // DANGER - DO NOT CROSS // MHA INQUEST 1978 // 🚨 CRIME SCENE KEEP OUT // प्रतिबंध क्षेत्र // DANGER - DO NOT CROSS // MHA INQUEST 1978
        </div>
      </div>

      {/* 5. Bottom-Right Criss-cross Police Restricted Warning Tape */}
      <div 
        className="absolute bottom-16 sm:bottom-24 -right-24 w-[320px] sm:w-[460px] h-7 sm:h-10 bg-[#eab308] border-t-[3px] border-b-[3px] border-black text-black font-mono text-[7px] sm:text-[9px] font-black uppercase flex items-center justify-center rotate-12 select-none z-20 shadow-[0_4px_22px_rgba(0,0,0,0.75)]"
      >
        <div className="animate-marquee-slow">
          🚨 ACTIVE INVESTIGATION // पुलिस जांच // PHYSICAL MATCH EVIDENCE TRACK // SECURED COLD CASE // 🚨 ACTIVE INVESTIGATION // पुलिस जांच // PHYSICAL MATCH EVIDENCE TRACK // SECURED COLD CASE
        </div>
      </div>

      {/* 6. Dynamic Proximity Evidence reveals (bloody handprints & weapons) */}
      <div 
        id="evidence-hand1"
        ref={hand1Ref}
        style={{ opacity: 0.12 }}
        className="absolute left-[3%] sm:left-[8%] top-[30%] pointer-events-none z-10 flex flex-col items-center transition-all duration-300 scale-75 sm:scale-100"
      >
        <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-14 sm:h-14 text-red-700 fill-current">
          {/* Palm */}
          <path d="M35,45 Q40,40 50,42 Q60,40 65,45 Q70,55 60,75 Q50,85 40,75 Q30,55 35,45" />
          {/* Thumb */}
          <path d="M35,55 Q20,55 22,48 Q24,42 33,50" />
          {/* Index finger */}
          <path d="M38,42 Q32,20 37,18 Q42,16 42,40" />
          {/* Middle finger */}
          <path d="M46,41 Q45,12 50,11 Q55,10 52,40" />
          {/* Ring finger */}
          <path d="M54,41 Q57,15 62,16 Q67,17 58,42" />
          {/* Little finger */}
          <path d="M62,45 Q72,25 76,27 Q80,29 65,48" />
          {/* Drips from hand */}
          <path d="M45,78 Q45,95 46,95 Q47,95 47,78 Z" fill="#ef4444" />
          <path d="M55,75 Q54,88 55,88 Q56,88 56,75 Z" fill="#990000" />
        </svg>
        <span className="font-mono text-[6px] sm:text-[7px] text-red-500/80 mt-1 font-bold tracking-widest select-none">
          EXHIBIT D: LATENT TRACE
        </span>
      </div>

      <div 
        id="evidence-hand2"
        ref={hand2Ref}
        style={{ opacity: 0.12 }}
        className="absolute right-[4%] sm:right-[10%] bottom-[25%] pointer-events-none z-10 flex flex-col items-center transition-all duration-300 scale-75 sm:scale-100"
      >
        <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-14 sm:h-14 text-red-700 fill-current">
          {/* Palm */}
          <path d="M35,45 Q40,40 50,42 Q60,40 65,45 Q70,55 60,75 Q50,85 40,75 Q30,55 35,45" />
          {/* Thumb */}
          <path d="M35,55 Q20,55 22,48 Q24,42 33,50" />
          {/* Index finger */}
          <path d="M38,42 Q32,20 37,18 Q42,16 42,40" />
          {/* Middle finger */}
          <path d="M46,41 Q45,12 50,11 Q55,10 52,40" />
          {/* Ring finger */}
          <path d="M54,41 Q57,15 62,16 Q67,17 58,42" />
          {/* Little finger */}
          <path d="M62,45 Q72,25 76,27 Q80,29 65,48" />
          {/* Drips from hand */}
          <path d="M45,78 Q45,95 46,95 Q47,95 47,78 Z" fill="#ef4444" />
          <path d="M55,75 Q54,88 55,88 Q56,88 56,75 Z" fill="#990000" />
        </svg>
        <span className="font-mono text-[6px] sm:text-[7px] text-red-500/80 mt-1 font-bold tracking-widest select-none">
          EXHIBIT F: IMPACT VELOCITY
        </span>
      </div>

      <div 
        id="evidence-knife"
        ref={knifeRef}
        style={{ opacity: 0.08 }}
        className="absolute right-[6%] sm:right-[14%] top-[18%] pointer-events-none z-10 flex flex-col items-center transition-all duration-300 scale-75 sm:scale-100"
      >
        <svg viewBox="0 0 120 60" className="w-16 h-8 sm:w-24 sm:h-12 text-zinc-400 fill-current select-none pointer-events-none">
          {/* Metallic blade */}
          <path d="M20,25 L85,22 C95,21 110,26 115,30 C100,34 85,34 85,34 L20,31 Z" fill="url(#metalGrad)" />
          {/* Blood stains on blade edge */}
          <path d="M75,26 L85,22 C95,21 110,26 115,30 C100,34 90,34 85,34 Z" fill="#800000" opacity="0.9" />
          {/* Drips from tip */}
          <path d="M113,30 C114,35 111,40 111,40 C112,35 113,31 113,30" fill="#ef4444" />
          {/* Handguard */}
          <rect x="16" y="16" width="4" height="24" rx="1" fill="#cca43b" />
          {/* Handle (hilt) */}
          <rect x="2" y="21" width="14" height="14" rx="2" fill="#2d2d30" />
          {/* Handle grip ridges */}
          <line x1="5" y1="21" x2="5" y2="35" stroke="#151515" strokeWidth="1.5" />
          <line x1="9" y1="21" x2="9" y2="35" stroke="#151515" strokeWidth="1.5" />
          <line x1="13" y1="21" x2="13" y2="35" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f5b66" />
              <stop offset="50%" stopColor="#a7adba" />
              <stop offset="100%" stopColor="#343d46" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-mono text-[6px] sm:text-[7px] text-red-500/80 mt-1.5 font-bold tracking-widest select-none">
          EXHIBIT G: WEAPON
        </span>
      </div>

      {/* Forensic marks and crosshairs */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-4 h-4 border-t border-l border-red-800/60 pointer-events-none z-10" />
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-4 h-4 border-t border-r border-red-800/60 pointer-events-none z-10" />
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-4 h-4 border-b border-l border-red-800/60 pointer-events-none z-10" />
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-4 h-4 border-b border-r border-red-800/60 pointer-events-none z-10" />

      {/* Delhi Coordinates overlay */}
      <div className="absolute top-10 left-10 hidden md:block font-mono text-[8px] text-red-500/65 tracking-widest text-left pointer-events-none z-10 select-none">
        <div>COORDS // NEW DELHI</div>
        <div>LAT: 28° 35' 31.2" N</div>
        <div>LON: 77° 09' 51.5" E</div>
      </div>
      <div className="absolute top-10 right-10 hidden md:block font-mono text-[8px] text-red-500/65 tracking-widest text-right pointer-events-none z-10 select-none">
        <div>REF // CASE_MHA_1978</div>
        <div>RECORD_ID_78B</div>
        <div>STATUS: UNRESTRICTED</div>
      </div>

      {/* Overlay Blueprint grid pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.15] pointer-events-none z-0" />

      {/* Scrollytelling Case subtitle */}
      <div className="flex items-center space-x-2 font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.35em] text-red-500/90 uppercase z-10 mt-6 sm:mt-8 font-semibold animate-pulse select-none">
        <Compass className="w-3.5 h-3.5 text-red-600 animate-spin" style={{ animationDuration: "25s" }} />
        <span>{language === "hi" ? "एक फोरेंसिक स्क्रॉलीटेलिंग केस स्टडी" : "A FORENSIC SCROLLYTELLING INVESTIGATION"}</span>
      </div>

      {/* Title & Typewriter Text */}
      <div className="max-w-4xl z-10 flex flex-col items-center my-auto px-2 sm:px-4 select-none pointer-events-none">
        {/* Case Badge with Crimson styling */}
        <div className="bloody-heartbeat inline-flex items-center space-x-2 px-2.5 py-1 bg-red-950/40 border border-red-800/40 rounded-full mb-4 sm:mb-6">
          <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
          <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] text-red-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold">
            {language === "hi" ? "गोपनीय केस नंबर: 1978_DELHI_08" : "CONFIDENTIAL CASE NO: 1978_DELHI_08"}
          </span>
        </div>

        {/* Typewriter Title */}
        <h1 className="editorial-title text-red-500 font-extrabold mb-4 sm:mb-6 leading-[1.05] sm:leading-tight min-h-[1.5em] text-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-[2.2rem] xs:text-[2.8rem] sm:text-[3.8rem] md:text-7xl lg:text-8xl break-words w-full">
          {typedTitle}
          {showCursor && typedTitle !== (language === "hi" ? "राख: चोपड़ा केस" : "RAAKH: THE CHOPRA CASE") && (
            <span className="inline-block ml-1 w-[4px] sm:w-[8px] h-[0.8em] bg-red-600 align-middle animate-pulse"></span>
          )}
        </h1>

        {/* Centered and aligned custom forensic gauge line after the title */}
        <div className="flex items-center justify-center space-x-3 w-full max-w-xs sm:max-w-sm mb-4 sm:mb-6 mx-auto">
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-red-600 to-red-900" />
          <span className="text-red-500 font-mono text-[7px] sm:text-[8px] tracking-[0.15em] sm:tracking-[0.25em] font-black uppercase shrink-0">
            {language === "hi" ? "मामला दस्तावेज विभाग: ०८" : "CASE FILE DEPT_08"}
          </span>
          <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-red-600 to-red-900" />
        </div>

        {/* Progressive Typewritten Subtitle with 95% opacity for readability */}
        <p className="font-mono text-[10px] sm:text-xs md:text-sm text-zinc-100 font-medium tracking-wide max-w-2xl leading-relaxed min-h-[3em] text-shadow-[0_2px_8px_rgba(0,0,0,0.9)] opacity-95">
          {typedSubtitle}
        </p>
      </div>

      {/* "Press to Enter" CTA and scroll buttons */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 z-10 mt-auto pointer-events-auto">
        <button
          onClick={handleEnterClick}
          className="inline-flex items-center space-x-3 bg-red-900 hover:bg-red-800 active:scale-95 text-white font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] px-5 py-3 sm:px-8 sm:py-4 rounded-sm shadow-[0_0_20px_rgba(139,0,0,0.4)] transition-all hover:shadow-[0_0_35px_rgba(139,0,0,0.75)] border border-red-700 font-black cursor-pointer"
        >
          <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          <span>{language === "hi" ? "प्रवेश करें" : "Begin Case File"}</span>
        </button>

        {/* Down Indicator */}
        <div 
          onClick={handleEnterClick}
          className="w-8 h-8 sm:w-10 sm:h-10 border border-red-950/60 rounded-full flex items-center justify-center group cursor-pointer hover:border-red-700 hover:scale-105 transition-all duration-300"
        >
          <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500/80 group-hover:text-red-500 transition-colors" />
        </div>
        <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-red-500/70 select-none hidden xs:inline-block">
          {language === "hi" ? "मामले को जानने के लिए आगे बढ़ें" : "Scroll or click down to examine the case"}
        </span>
      </div>
    </div>
  );
});
