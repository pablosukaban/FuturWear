import { easing } from 'maath';
import { useAppSelector } from '../store/hooks';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

const Shirt = () => {
    const { logoDecal, fullDecal } = useAppSelector(
        (state) => state.paramsSlice
    );
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(logoDecal);
    const fullTexture = useTexture(fullDecal);

    return (
        <group>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            ></mesh>
        </group>
    );
};

export default Shirt;
