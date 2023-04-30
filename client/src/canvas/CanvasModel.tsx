import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import CameraRig from './CameraRig';
import Shirt from './Shirt';
import Backdrop from './Backdrop';

const CanvasModel = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            style={{
                backgroundColor: 'rgba(77, 150, 89, 0.3)',
            }}
            className={`h-full w-full max-w-full transition-all ease-in`}
        >
            <ambientLight intensity={0.5} />
            <Environment preset='city' />

            <CameraRig>
                <Backdrop />
                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
        </Canvas>
    );
};

export default CanvasModel;
