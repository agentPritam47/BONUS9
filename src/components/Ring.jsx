import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

export function Ring(props) {
  const { nodes, materials } = useGLTF('/diamond_engagement_ring.glb')
  const ringRef = useRef();
  const silver = useRef();
  useFrame((state, delta) => {
    ringRef.current.rotation.y += delta * 0.5
  })
  useEffect(() => {
    if (silver.current) {
      silver.current.color.multiplyScalar=0;
    }
  }, []);
  
  return (
    <group ref={ringRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Crystal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.Metal}
        >
            <meshPhysicalMaterial ref={silver} color="silver" roughness={0} metalness={1} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/diamond_engagement_ring.glb')
