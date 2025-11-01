import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Post({ position = [0,0,0] }){
  const ref = useRef()
  useFrame((state)=>{
    const t = state.clock.elapsedTime
    if(ref.current){
      ref.current.rotation.z = Math.sin(t*0.6)*0.02
    }
  })
  return (
    <group position={position} ref={ref}>
      <mesh position={[0,0.5,0]}>
        <cylinderGeometry args={[0.06,0.06,1.0,16]} />
        <meshStandardMaterial color="#d4d4d4" metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh position={[0.05,1.0,0]}>
        <boxGeometry args={[0.22,0.12,0.02]} />
        <meshStandardMaterial color="#16a34a" emissive="#0a5" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export default function BorderThreeScene(){
  return (
    <Canvas camera={{ position: [0.6, 1.2, 2.1], fov: 40 }} frameloop="demand">
      <ambientLight intensity={0.6} />
      <directionalLight position={[2,2,2]} intensity={0.8} />
      <group position={[0,-0.6,0]}>
        {[ -1.2, -0.6, 0, 0.6, 1.2].map((z, i)=> (
          <Post key={i} position={[0,0,z]} />
        ))}
        <mesh rotation={[ -Math.PI/2, 0, 0 ]}>
          <planeGeometry args={[2.4, 3]}/>
          <meshStandardMaterial color="#0b1220" roughness={1} />
        </mesh>
      </group>
    </Canvas>
  )
}

