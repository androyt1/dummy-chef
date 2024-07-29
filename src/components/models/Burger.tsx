import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

type GLTFResult = GLTF & {
    nodes: {
        Object_4: THREE.Mesh;
    };
    materials: {
        Sandwich: THREE.MeshStandardMaterial;
    };
};

const Burger = (props: JSX.IntrinsicElements["group"]) => {
    const { nodes, materials } = useGLTF("/models/burger.glb") as GLTFResult;
    const groupRef = useRef<THREE.Group>(null);
    const [isRotating, setIsRotating] = useState(false);

    useFrame((state, delta) => {
        if (groupRef.current && isRotating) {
            // Rotate only around the Y-axis (vertical axis)
            groupRef.current.rotation.y += delta;
        }
    });

    return (
        <group
            ref={groupRef}
            {...props}
            dispose={null}
            scale={8}
            onPointerDown={() => setIsRotating(true)}
            onPointerUp={() => setIsRotating(false)}
            onPointerLeave={() => setIsRotating(false)}>
            <mesh
                geometry={nodes.Object_4.geometry}
                material={materials.Sandwich}
                position={[-0.051, 0, -0.072]}
                castShadow
                receiveShadow
            />
        </group>
    );
};

useGLTF.preload("/models/burger.glb");
export default Burger;
