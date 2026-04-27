"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { TextRotate } from './text-rotate';

gsap.registerPlugin(ScrollTrigger);

export const MaritimeHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;
  
  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    locations: [],
  });

  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;
      if (!canvasRef.current) return;
      
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x0a0a0a, 0.001);

      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.6,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      createStarField();
      createSeaMist();
      createIslands();
      createAtmosphere();
      
      const animate = () => {
        refs.animationId = requestAnimationFrame(animate);
        const time = Date.now() * 0.0005;

        refs.stars.forEach((starField) => {
          if ((starField.material as THREE.ShaderMaterial).uniforms) {
            (starField.material as THREE.ShaderMaterial).uniforms.time.value = time;
          }
        });

        if (refs.camera && refs.targetCameraX !== undefined && refs.targetCameraY !== undefined && refs.targetCameraZ !== undefined) {
          const smoothingFactor = 0.05;
          smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
          smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
          smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;
          
          refs.camera.position.x = smoothCameraPos.current.x + Math.sin(time * 0.2) * 5;
          refs.camera.position.y = smoothCameraPos.current.y + Math.cos(time * 0.3) * 2;
          refs.camera.position.z = smoothCameraPos.current.z;
          refs.camera.lookAt(0, 10, -600);
        }

        refs.mountains.forEach((mtn, i) => {
           mtn.position.y = -20 + Math.sin(time + i) * 2;
        });

        if (refs.composer) refs.composer.render();
      };
      
      animate();
      setIsReady(true);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      const starCount = 3000;
      
      for (let i = 0; i < 2; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 500 + Math.random() * 1000;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);
          sizes[j] = Math.random() * 1.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: { time: { value: 0 }, depth: { value: i } },
          vertexShader: `
            attribute float size;
            varying float vOpacity;
            uniform float time;
            void main() {
              vec3 pos = position;
              float angle = time * 0.02;
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xz = rot * pos.xz;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (200.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
              vOpacity = 0.4 + 0.6 * sin(time + position.x);
            }
          `,
          fragmentShader: `
            varying float vOpacity;
            void main() {
              if (length(gl_PointCoord - 0.5) > 0.5) discard;
              gl_FragColor = vec4(1.0, 0.8, 0.6, vOpacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createSeaMist = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      const geometry = new THREE.PlaneGeometry(5000, 2000);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0a0a0a) },
          color2: { value: new THREE.Color(0xc4622d) },
          opacity: { value: 0.15 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float time;
          varying vec2 vUv;
          void main() {
            float noise = sin(vUv.x * 5.0 + time) * cos(vUv.y * 5.0 - time);
            vec3 color = mix(color1, color2, noise * 0.2 + 0.1);
            gl_FragColor = vec4(color, 0.1 * (1.0 - vUv.y));
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const mist = new THREE.Mesh(geometry, material);
      mist.position.z = -800;
      mist.rotation.x = -Math.PI / 2.5;
      refs.scene.add(mist);
    };

    const createIslands = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const layers = [
        { z: -100, h: 40, color: 0x0a0a0a },
        { z: -300, h: 60, color: 0x1a1a1a },
        { z: -600, h: 100, color: 0x2a2a2a }
      ];

      layers.forEach((layer) => {
        const shape = new THREE.Shape();
        shape.moveTo(-1000, -200);
        for(let i = -1000; i <= 1000; i += 50) {
          shape.lineTo(i, Math.sin(i * 0.01) * layer.h + Math.random() * 10 - 20);
        }
        shape.lineTo(1000, -200);
        shape.lineTo(-1000, -200);

        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: layer.color, side: THREE.DoubleSide });
        const island = new THREE.Mesh(geometry, material);
        island.position.z = layer.z;
        refs.scene?.add(island);
        refs.mountains.push(island);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      const geometry = new THREE.SphereGeometry(800, 32, 32);
      const material = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
            gl_FragColor = vec4(0.77, 0.38, 0.18, intensity * 0.3);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    initThree();

    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      const { current: refs } = threeRefs;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
      setCurrentSection(Math.floor(progress * totalSections));

      const { current: refs } = threeRefs;
      const camZ = 300 - progress * 1000;
      refs.targetCameraX = 0;
      refs.targetCameraY = 30 + progress * 40;
      refs.targetCameraZ = camZ;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#0a0a0a]">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-screen z-0 pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center pointer-events-none">
        <div className="text-center px-6">
          <div className="mb-4 inline-block px-4 py-1 border border-[#c4622d]/30 rounded-full text-[10px] uppercase tracking-[0.4em] text-[#c4622d] bg-[#c4622d]/5">
            Navigating Excellence
          </div>
          <h1 className="text-7xl md:text-[10rem] font-[var(--font-bebas)] text-white uppercase leading-none tracking-tighter drop-shadow-2xl">
            <TextRotate
              texts={["HORIZON", "VOYAGE", "SUCCESS"]}
              mainClassName="justify-center"
              rotationInterval={4000}
            />
          </h1>
          <p className="mt-8 text-xl md:text-2xl font-[var(--font-barlow)] italic text-[#c4622d] max-w-2xl mx-auto opacity-80">
            Cruze Marine Service: Your Gateway to a Professional Maritime Career
          </p>
        </div>
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#c4622d] to-transparent animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#c4622d]">Scroll</span>
      </div>
    </div>
  );
};
