import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./Rupee_symbol/scene.gltf");

  return (
    <mesh>
      <pointLight position={[0, 10, -5]} intensity={1000} color="blue" />
      <pointLight position={[0, -10, 5]} intensity={1000} color="blue" />
      <pointLight position={[0, 10, 5]} intensity={1000} color="blue" />
      <pointLight position={[0, 10, 5]} intensity={1000} color="blue" />

      <primitive
        object={computer.scene}
        scale={isMobile ? 50 : 30}
        position={isMobile ? [0, -2, -0.5] : [0, -3, -0.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const Threemodel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: isMobile ? [25, 0, 25] : [20, 3, 5], fov: 20 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={1} />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default Threemodel;
