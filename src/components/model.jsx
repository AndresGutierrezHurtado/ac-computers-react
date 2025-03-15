"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import gsap from "gsap";

gsap.registerPlugin();

useGLTF.preload("/scene.glb");

const Modelo = () => {
    const modelRef = useRef();
    const { scene } = useGLTF("/scene.glb");

    useFrame(() => {
        if (modelRef.current) {
            const fan1 = modelRef.current.getObjectByName("FAN1");
            const fan2 = modelRef.current.getObjectByName("FAN2");
            const fan3 = modelRef.current.getObjectByName("FAN3");
            const fan4 = modelRef.current.getObjectByName("FAN4");

            const hfan1 = modelRef.current.getObjectByName("HFAN1");
            const hfan2 = modelRef.current.getObjectByName("HFAN2");

            if (fan1 && fan2 && fan3 && fan4 && hfan1 && hfan2) {
                fan1.rotation.y += 0.05;
                fan2.rotation.y += 0.05;
                fan3.rotation.y += 0.05;
                fan4.rotation.y -= 0.05;
                hfan1.rotation.y += 0.05;
                hfan2.rotation.y += 0.05;
            }
        }
    });

    const { viewport } = useThree();
    const scale = Math.min(viewport.width, viewport.height) / 8.5;

    return <primitive ref={modelRef} object={scene} position={[0, 0, 0]} scale={scale} />;
};

const CameraController = ({ progress }) => {
    const { camera } = useThree();

    useEffect(() => {
        const positions = [
            [-5.5, 0.8, 6.9],
            [-10, 1, 0],
            [0, 10, 1],
            [0, 2, 9],
        ];

        if (progress >= 1) {
            gsap.to(camera.position, {
                duration: 0.1,
                x: 0,
                y: 1,
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
                position: [-5.5, 0.8, 6.9],
                fov: 50,
            }}
            style={{
                width: "100%",
                height: "100%",
                pointerEvents: "none",
            }}
        >
            {/* Lights and Environment */}
            <Environment preset="city" environmentIntensity={0.04} />
            <ambientLight intensity={20} position={[0, 0, 0]} />
            <ambientLight intensity={20} position={[-5, 0, 0]} />
            <directionalLight position={[5, 5, 5]} intensity={15} />
            <directionalLight position={[0, 5, 0]} intensity={10} />
            <pointLight position={[-3, 3, 3]} intensity={50} />
            <pointLight position={[0, 0, 5]} intensity={100} />

            {/* Model */}
            <Modelo />

            <CameraController progress={progress} />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
    );
};

export default Modelo3D;
