import { Canvas } from "@react-three/fiber";
import React from "react";
import Experience from "./Experience";
import {
  Environment,
  OrbitControls,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  BrightnessContrast,
} from "@react-three/postprocessing";


const Scene = () => {


  return (
    <Canvas flat camera={{ position: [0, 1, 20], fov: 25, antialias: true }}>
      <color attach="background" args={["#e4d0fc"]} />
      <fog attach="fog" args={["white", 20, 50]} />
      {/* <directionalLight position={[1, 6, 7]} intensity={5} /> */}
      <Experience />
      {/* <OrbitControls /> */}
      <Environment preset="studio" environmentIntensity={0.3} />
      <EffectComposer>
        <Bloom intensity={1} luminanceThreshold={.75} />
        {/* <BrightnessContrast brightness={0} contrast={0.2} /> */}
        {/* <Fluid fluidColor="#000" force={1} radius={1} swirl={10} pressure={1} showBackground={false} blend={1} /> */}
      </EffectComposer>
    </Canvas>
  );
};

export default Scene;
