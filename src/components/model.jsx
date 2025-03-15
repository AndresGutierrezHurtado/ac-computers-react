"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import gsap from "gsap";

gsap.registerPlugin();

const Modelo = () => {
    const modelRef = useRef();
    const { scene } = useGLTF("/scene.glb");

    return <primitive ref={modelRef} object={scene} position={[0, 0, 0]} scale={1} />;
};

const CameraController = ({ progress }) => {
    const { camera } = useThree();

    useEffect(() => {
        const positions = [
            [-6, .8, 8],
            [-9, 1, 0],
            [0, 10, 1],
            [0, 2, 9],
        ];

        if (progress >= 1) {
            gsap.to(camera.position, {
                duration: 0.1,
                x: 0,
                y: 2,
                z: 9,
            });
            return;
        }

        const segmentProgress = 1 / (positions.length - 1);
        const segmentIndex = Math.min(Math.floor(progress / segmentProgress), positions.length - 1);
        const segmentStart = positions[segmentIndex];
        const segmentEnd = positions[segmentIndex + 1];

        const segment = [
            segmentStart[0] +
                ((segmentEnd[0] - segmentStart[0]) * (progress % segmentProgress)) /
                    segmentProgress,
            segmentStart[1] +
                ((segmentEnd[1] - segmentStart[1]) * (progress % segmentProgress)) /
                    segmentProgress,
            segmentStart[2] +
                ((segmentEnd[2] - segmentStart[2]) * (progress % segmentProgress)) /
                    segmentProgress,
        ];

        console.log(segment[2]);
        if (segment) {
            gsap.to(camera.position, {
                duration: 0.1,
                x: segment[0],
                y: segment[1],
                z: segment[2],
            });
        }
    }, [progress, camera]);

    return null;
};

const Modelo3D = ({ progress }) => {
    return (
        <Canvas
            camera={{
                position: [-5, 0, 9],
                fov: 50,
            }}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <ambientLight intensity={10} position={[0, 0, 0]} />
            <ambientLight intensity={20} position={[5, 0, 0]} />
            <ambientLight intensity={20} position={[-5, 0, 0]} />
            <directionalLight position={[5, 5, 5]} intensity={15} />
            <directionalLight position={[0, 5, 0]} intensity={10} />
            <directionalLight position={[5, 0, 0]} intensity={10} />
            <directionalLight position={[0, 0, 5]} intensity={10} />
            <pointLight position={[3, 3, 3]} intensity={50} />
            <pointLight position={[-3, 3, 3]} intensity={50} />
            <pointLight position={[3, 3, -3]} intensity={50} />
            <pointLight position={[-3, 3, -3]} intensity={50} />
            <Modelo />
            <Environment preset="city" environmentIntensity={0.05} />
            <CameraController progress={progress} />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
    );
};

export default Modelo3D;
