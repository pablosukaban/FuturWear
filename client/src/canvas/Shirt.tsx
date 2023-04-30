import { easing } from 'maath';
import { useAppSelector } from '../store/hooks';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        T_Shirt_male: THREE.Mesh;
    };
    materials: {
        lambert1: THREE.MeshStandardMaterial;
    };
};

const Shirt = () => {
    const paramsState = useAppSelector((state) => state.paramsSlice);
    const { nodes, materials } = useGLTF('/shirt_baked.glb') as GLTFResult;

    const stringedLogoDecal = String(paramsState.logoDecal);
    const stringedFullDecal = String(paramsState.fullDecal);
    const stringedColor = String(paramsState.color);

    const logoTexture = useTexture(stringedLogoDecal);
    const fullTexture = useTexture(stringedFullDecal);

    const stateString = JSON.stringify(paramsState);

    useFrame((_state, delta) =>
        easing.dampC(materials.lambert1.color, stringedColor, 0.25, delta)
    );

    return (
        <group key={stateString}>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >
                {paramsState.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}
                {paramsState.isLogoTexture && (
                    <Decal
                        position={[0, 0.04, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.15}
                        map={logoTexture}
                        map-anisotrophy={16}
                        depthTest={false}
                        // depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    );
};

export default Shirt;

useGLTF.preload('/shirt_baked.glb');
