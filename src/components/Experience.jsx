import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Water } from "three/examples/jsm/objects/Water";
import { Center, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Ring } from "./Ring";
import { Shell } from "./Shell";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Stone } from "./Stone";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const ref = useRef();
  const ringRef = useRef();
  const shellRef = useRef();
  const sceneRef = useRef();
  const { gl, scene, camera } = useThree();
  const waterNormals = useTexture("/water7.jpg");
  const tl = useRef();

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  // Set up tone mapping
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = 0.5;

  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(0, 0, 0),
      sunColor: "#fff",
      waterColor: "pink",
      distortionScale: 5,
      fog: true,
      alpha: 0.95,
    }),
    [waterNormals]
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta * 0.15;
    }
    // Keep camera looking at origin
    camera.lookAt(0, 0, 0);
  });

  React.useEffect(() => {
    // Create GSAP timeline
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: ".page1",
        start: "0%",
        end: "400%",
        scrub: 3,
        pin: true,
      },
    });

    // Add animations to timeline for scene rotation
    tl.current
      .to(
        scene.rotation,
        {
          y: (Math.PI * 2.65) / 2,
          duration: 1,
          ease: "none",
        },
        "a"
      )
      .to(
        camera.position,
        {
          z: 10,
          y: 6,
          duration: 1,
          ease: "none",
        },
        "a"
      )
      .to(
        scene.rotation,
        {
          y: (Math.PI * 2.67)*.75,
          duration: 1,
          ease: "none",
        },
        "b"
      )
      .to(
        camera.position,
        {
          z: 15,
          y: 0,
          duration: 1,
          ease: "none",
        },
        "b"
      );

    // Water setup
    const waterGeometry = new THREE.PlaneGeometry(1000, 1000);

    const water = new Water(waterGeometry, {
      ...config,
    });

    water.rotation.x = -Math.PI / 2;
    water.position.y = -1;

    water.material.transparent = true;
    water.material.opacity = 0.9;

    ref.current = water;
    scene.add(water);

    scene.fog = new THREE.Fog("#e4d0fc", 1, 100);

    return () => {
      scene.remove(water);
      water.geometry.dispose();
      water.material.dispose();
      tl.current.kill();
    };
  }, [scene, config, camera.position]);

  return (
    <>
      <Stars saturation={0} speed={0} count={50000} fade={false} size={30} />

      <group position={[0, -1.07, 7]}>
      <mesh position={[0, 0, -3]}>
          <boxGeometry args={[2, 0.2, 0.5]} />
          <meshPhysicalMaterial emissive={"pink"} emissiveIntensity={1} color="pink" roughness={0} clearcoat={1} clearcoatRoughness={0} metalness={.3} />
        </mesh>
        <mesh>
          <boxGeometry args={[2, 0.2, 0.5]} />
          <meshPhysicalMaterial emissive={"pink"} emissiveIntensity={1} color="pink" roughness={0} clearcoat={1} clearcoatRoughness={0} metalness={0.3} />
        </mesh>
        <mesh  position={[0, 0, 3]}>
          <boxGeometry args={[2, 0.2, 0.5]} />
          <meshPhysicalMaterial emissive={"pink"} emissiveIntensity={1} color="pink" roughness={0} clearcoat={1} clearcoatRoughness={0} metalness={0.3} />
        </mesh>
        <mesh  position={[0, 0, 6]}>
          <boxGeometry args={[2, 0.2, 0.5]} />
          <meshPhysicalMaterial emissive={"pink"} emissiveIntensity={1} color="pink" roughness={0} clearcoat={1} clearcoatRoughness={0} metalness={0.3} />
        </mesh>
      </group>


    
            

      <group position={[0, 1, 0]} scale={0.3} ref={ringRef}>
        <Ring />
      </group>

      <group position={[2, -1.4, -2]} rotation={[0, 0, -0.5]}>
        <Stone scale={0.02} />
      </group>

      <group position={[2, -1.4, -2]} rotation={[0, 0, 0.2]}>
        <Stone scale={0.02} />
      </group>

      <group rotation={[-0.6, 0, 0]} ref={shellRef}>
        <group position={[0, 0, -0.8]} rotation={[0, -Math.PI, 0]}>
          <Center>
            <mesh scale={55}>
              <Shell />
            </mesh>
          </Center>
        </group>
      </group>
    </>
  );
};

export default Experience;
