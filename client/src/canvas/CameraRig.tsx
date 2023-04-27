import { useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import { useFrame } from '@react-three/fiber';

import Three from 'three';

import { easing } from 'maath';

type CameraRigProps = {
    children: React.ReactNode;
};

const CameraRig = ({ children }: CameraRigProps) => {
    const { intro } = useAppSelector((state) => state.paramsSlice);
    const groupRef = useRef<Three.Group>(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const isBreakPoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // set initial position of camera
        let targetPosition: [x: number, y: number, z: number] = [-0.4, 0, 2];

        if (intro) {
            if (isBreakPoint) targetPosition = [0, 0, 2];
            if (isMobile) targetPosition = [0, 0.6, 2.5];
        } else {
            if (isMobile) targetPosition = [0, 0.2, 2.5];
            else targetPosition = [0, 0, 2];
        }

        // set model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);

        // set model rotation smoothly
        easing.dampE(
            groupRef.current?.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        );
    });

    return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
