"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const CodeSymbolAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new (THREE as any).Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new (THREE as any).WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Adjust renderer and camera on window resize
    const handleResize = () => {
      if (canvasRef.current) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Load font and create geometries for 0 and 1
    const loader = new FontLoader(); 
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textMaterial = new (THREE as any).MeshBasicMaterial({ color: 0xffffff });

        const zeroGeometry = new TextGeometry("0", {
          font,
          size: 0.5,
          height: 0.05,
        });
        const oneGeometry = new TextGeometry("1", {
          font,
          size: 0.5,
          height: 0.05,
        });

        const zeroMesh = new (THREE as any).Mesh(zeroGeometry, textMaterial);
        const oneMesh = new (THREE as any).Mesh(oneGeometry, textMaterial);

        // Position the 0's and 1's
        zeroMesh.position.set(-1.5, 0, 0);
        oneMesh.position.set(1.5, 0, 0);

        scene.add(zeroMesh);
        scene.add(oneMesh);
      }
    );

    // Create a torus (donut shape)
    const geometry = new THREE.TorusGeometry(1.5, 0.25, 16, 100);
    const material = new (THREE as any).MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const torus = new (THREE as any).Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 7;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the torus
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CodeSymbolAnimation;
