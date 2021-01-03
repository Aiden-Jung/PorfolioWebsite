import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import {
  Object3D,
  DoubleSide,
  ShaderMaterial,
  UniformsUtils,
  ShaderLib,
} from 'three';
import useMousePoint from '../../hooks/useMousePoint';
import useTexture from '../../hooks/useTexture';
// eslint-disable-next-line import/no-webpack-loader-syntax
import fragment from '!!raw-loader!glslify-loader!../../assets/shaders/cloud.frag';
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertex from '!!raw-loader!glslify-loader!../../assets/shaders/cloud.vert';
import cloud1 from '../../assets/clouds/1.jpg';
import cloud2 from '../../assets/clouds/2.jpg';
import { animated, useTransition } from 'react-spring/three';
import { useGLTF } from '@react-three/drei';
import {
  spring,
  summer,
  fall,
  winter,
  special,
} from '../../assets/model/index';

const Falling = ({ song }) => {
  const particles = useRef();

  const model = [
    useGLTF(special),
    useGLTF(spring),
    useGLTF(summer),
    useGLTF(fall),
    useGLTF(winter),
  ];

  const { viewport, clock } = useThree();
  const dummy = useMemo(() => new Object3D(), []);
  const objects = useMemo(
    () =>
      new Array(300).fill().map(() => ({
        position: [
          viewport.width / 2 - Math.random() * viewport.width,
          Math.random() * 20 - 10,
          viewport.height / 2 - Math.random() * viewport.height,
        ],
        factor: Math.random(),
        rotation: [
          Math.sin(Math.random()) * Math.PI,
          Math.sin(Math.random()) * Math.PI,
          Math.cos(Math.random()) * Math.PI,
        ],
      })),
    []
  );

  useFrame(() => {
    objects.forEach((data, i) => {
      const t = clock.getElapsedTime();
      data.position[1] -= 0.01 + data.factor / 30;
      if (data.position[1] < -10)
        data.position = [
          viewport.width / 2 - Math.random() * viewport.width,
          10,
          viewport.height / 2 - Math.random() * viewport.height,
        ];
      const { position, rotation, factor } = data;
      dummy.position.set(position[0], position[1], position[2]);
      dummy.rotation.set(
        rotation[0] + t * factor,
        rotation[1] + t * factor,
        rotation[2] + t * factor
      );
      dummy.scale.set(
        0.1 * (1 + factor),
        0.1 * (1 + factor),
        0.1 * (1 + factor)
      );
      dummy.updateMatrix();
      particles.current.setMatrixAt(i, dummy.matrix);
    });
    particles.current.instanceMatrix.needsUpdate = true;
  });

  const transition = useTransition(song, (item) => item, {
    from: { o: 0 },
    enter: { o: 1 },
    leave: { o: 2 },
    config: { duration: 1000 },
  });

  return transition.map(({ item, props, key }) => {
    return (
      <animated.instancedMesh
        ref={particles}
        args={[
          model[item].scene.children[2].geometry,
          model[item].scene.children[2].material,
          objects.length,
        ]}
        key={key}
        material-opacity={props.o.interpolate(
          [0, 0.5, 1, 1.5, 2],
          [0, 0, 1, 0, 0]
        )}
      />
    );
  });
};

const Cloud = ({ size, position, factor, speed }) => {
  const mesh = useRef();
  const [width, height] = size;

  const src1 = cloud1;
  const t1 = useTexture(src1);

  const src2 = cloud2;
  const t2 = useTexture(src2);

  const myUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTxtShape: { value: t1 },
      uTxtCloudNoise: { value: t2 },
      uFac1: { value: 17.8 },
      uFac2: { value: 2.7 },
      uTimeFactor1: { value: 0.002 },
      uTimeFactor2: { value: 0.0015 },
      uDisplStrenght1: { value: 0.04 },
      uDisplStrenght2: { value: 0.08 },
    }),
    [t1, t2]
  );

  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      uniforms: {
        ...UniformsUtils.clone(ShaderLib.normal.uniforms),
        ...myUniforms,
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      opacity: 0.05,
      transparent: true,
      side: DoubleSide,
      depthWrite: false,
    });

    return mat;
  });

  useEffect(() => {
    if (material) {
      material.uniforms.uTxtShape.value = t1;
    }
  }, [t1, material]);

  useEffect(() => {
    if (material) {
      material.uniforms.uTxtCloudNoise.value = t2;
    }
  }, [t2, material]);

  let speedV = speed;
  let factorV = factor;

  useFrame(() => {
    if (material) {
      material.uniforms.uTime.value += factorV;
      if (mesh.current.position.x < -35) {
        mesh.current.position.x = 35;
        mesh.current.position.z = Math.random() * 30 - 15;
        mesh.current.scale.set(Math.random() * 1 + 1, Math.random() * 1 + 1, 1);
        speedV = Math.random() * 0.05 + 0.01;
        factorV = Math.random() * 0.5 + 0.5;
      }
      mesh.current.position.x -= speedV;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={[width, height, 1]}>
      <planeBufferGeometry args={[20.0, 20.0, 5, 5]} attach="geometry" />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Rig = ({ mouse }) => {
  useFrame(({ camera }) => {
    camera.position.x = Math.sin((mouse[0] / 6) * Math.PI) * 5;
    camera.position.z = Math.sin((mouse[1] / 6) * Math.PI) * 5;
    camera.position.y = -Math.sqrt(
      25 -
        (camera.position.x * camera.position.x +
          camera.position.z * camera.position.z)
    );
    camera.rotation.y = (mouse[0] / 6) * Math.PI;
    camera.rotation.x = (0.5 + -mouse[1] / 6) * Math.PI;
  });
  return null;
};

const Particle = ({ song }) => {
  const mouse = useMousePoint();

  const color = ['#11114e', '#f6b2bd', '#72d472', '#f76c6b', '#778899'];

  const clouds = useMemo(() => {
    const random = new Array(5).fill().map(() => ({
      size: [Math.random() * 1 + 1, Math.random() * 1 + 1],
      position: [Math.random() * 70 - 35, 10, Math.random() * 30 - 15],
      factor: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.05 + 0.01,
    }));
    return random.map((v, i) => {
      return (
        <Cloud
          key={i.toString()}
          size={v.size}
          position={v.position}
          factor={v.factor}
          speed={v.speed}
        />
      );
    });
  }, []);

  return (
    <Canvas camera={{ fov: 75 }}>
      <fog attach="fog" args={[color[song], 9.5, 10]} />
      {clouds}
      <ambientLight intensity={0.8} />
      <Suspense fallback={null}>
        <Falling song={song} />
      </Suspense>
      <Rig mouse={mouse} />
    </Canvas>
  );
};

export default Particle;
