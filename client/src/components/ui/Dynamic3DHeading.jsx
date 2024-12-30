// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const Dynamic3DHeading = () => {
  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();

    // Set the scene background to null for transparency
    scene.background = null;

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Create WebGLRenderer with alpha enabled
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append renderer's canvas to the DOM
    document.body.appendChild(renderer.domElement);

    // Add 3D text to the scene
    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", // Font file URL
      (font) => {
        try {
          const geometry = new TextGeometry("United LMS", {
            font: font,
            size: 10,
            height: 3,
            bevelEnabled: true,
            bevelSize: 0.3,
            bevelThickness: 0.7,
            bevelSegments: 5,
          });

          const material = new THREE.MeshStandardMaterial({
            color: 0x00ffcc,
            emissive: 0x001a66,
            metalness: 0.7,
            roughness: 0.2,
          });
          const textMesh = new THREE.Mesh(geometry, material);
          scene.add(textMesh);

          // Center the text in the middle of the scene
          geometry.center();

          // Position the camera
          camera.position.set(0, 0, 50);

          // Add lighting to the scene
          const ambientLight = new THREE.AmbientLight(0x202020); // Subtle ambient light
          const pointLight = new THREE.PointLight(0xffffff, 1, 100);
          pointLight.position.set(10, 10, 10);
          const spotLight = new THREE.SpotLight(0xffaa00, 1);
          spotLight.position.set(-15, 20, 25);
          spotLight.angle = Math.PI / 6;
          spotLight.castShadow = true;

          scene.add(ambientLight, pointLight, spotLight);

          // Animation loop to rotate the text
          const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the text for 3D effect
            textMesh.rotation.x += 0.01;
            textMesh.rotation.y += 0.01;

            // Render the scene
            renderer.render(scene, camera);
          };

          animate();
        } catch (error) {
          console.error("Error creating text geometry:", error);
        }
      },
      undefined, // Optional onProgress callback
      (error) => {
        console.error("Error loading font:", error);
      }
    );

    // Resize handler for responsiveness
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null; // No JSX needed as the canvas is rendered dynamically by Three.js
};

export default Dynamic3DHeading;
