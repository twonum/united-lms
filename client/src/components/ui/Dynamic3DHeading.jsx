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
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

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
            bevelSize: 0.2,
            bevelThickness: 0.5,
          });

          const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0x00ff00,
          });
          const textMesh = new THREE.Mesh(geometry, material);
          scene.add(textMesh);

          // Center the text in the middle of the scene
          geometry.center();

          // Position the camera
          camera.position.z = 50;

          // Add lighting to the scene
          const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(5, 5, 5).normalize();
          scene.add(ambientLight);
          scene.add(directionalLight);

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
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Cleanup on unmount
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null; // No JSX needed as the canvas is rendered dynamically by Three.js
};

export default Dynamic3DHeading;
