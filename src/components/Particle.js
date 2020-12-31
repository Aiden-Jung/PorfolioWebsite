import React, { useRef, useMemo, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree, extend} from 'react-three-fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import styled from 'styled-components';
import {ShaderMaterial, UniformsUtils, ShaderLib} from 'three'

import useTexture from '../hooks/useTexture'
// eslint-disable-next-line import/no-webpack-loader-syntax
import fragment from '!!raw-loader!glslify-loader!../assets/shaders/cloud.frag'
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertex from '!!raw-loader!glslify-loader!../assets/shaders/cloud.vert'
import cloud1 from '../assets/clouds/1.jpg'
import cloud2 from '../assets/clouds/2.jpg'
import { animated, useTransition } from 'react-spring/three'
import { useGLTF } from '@react-three/drei'
import {spring, summer, fall, winter, special} from '../assets/model/index'


const Controls = () => {

    extend({ OrbitControls })

    const orbitRef = useRef()
    const { camera, gl } = useThree()

    useFrame(() => {
        orbitRef.current.update()
    })

    return (
        <orbitControls
            args={[camera, gl.domElement]}
            ref={orbitRef}
        />
    )
}

const Falling = ({song}) => {
    
    const leaf = useRef();

    const model = [useGLTF(special),
    useGLTF(spring),
    useGLTF(summer),
    useGLTF(fall),
    useGLTF(winter),
    ]


    const { viewport, clock } = useThree()
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const leaves = useMemo(
        () =>
      new Array(300).fill().map(() => ({
        position: [viewport.width / 2 - Math.random() * viewport.width, (Math.random()*20)-10, viewport.width / 2 - Math.random() * viewport.width],
        factor: Math.random(),
        rotation: [Math.sin(Math.random()) * Math.PI, Math.sin(Math.random()) * Math.PI, Math.cos(Math.random()) * Math.PI]
      }
      ))
    )

    useFrame(() => {
        leaves.forEach((data, i) => {
            const t = clock.getElapsedTime()
            data.position[1] -= 0.01 + (data.factor / 30)
            if (data.position[1] < -10)
              data.position = [viewport.width / 2 - Math.random() * viewport.width, 10, viewport.width / 2 - Math.random() * viewport.width]
            const { position, rotation, factor } = data
            dummy.position.set(position[0], position[1], position[2])
            dummy.rotation.set(rotation[0] + t * factor, rotation[1] + t * factor, rotation[2] + t * factor)
            dummy.scale.set(0.1*(1 + factor), 0.1*(1 + factor), 0.1*(1 + factor))
            dummy.updateMatrix()
            leaf.current.setMatrixAt(i, dummy.matrix)
          })
          leaf.current.instanceMatrix.needsUpdate = true
    })
    
    const transition = useTransition(song, item => item, {
      from:{'material-opacity': 0},
      enter:{'material-opacity': 1},
      leave: {'material-opacity': 0},
      trail: 10,
      config: {duration: 1000}
    })

    return transition.map(({item, props, key}) => {
      const model2 = model[item];
      return <animated.instancedMesh
            ref={leaf}
            args= {[model2.scene.children[2].geometry, model2.scene.children[2].material, leaves.length]}
            key={key}
            {...props}
            />
    })
}


const Cloud = ({size, position}) => {
  const mesh = useRef()
  const [width, height] = size

  const src1 = cloud1
  const t1 = useTexture(src1)

  const src2 = cloud2
  const t2 = useTexture(src2)

  const myUniforms = useMemo(() => ({
    uTime: {value: 0},
    uTxtShape: {value: t1},
    uTxtCloudNoise: {value: t2},
    uFac1: {value: 17.8},
    uFac2: {value: 2.7},
    uTimeFactor1: {value: 0.002},
    uTimeFactor2: {value: 0.0015},
    uDisplStrenght1: {value: 0.04},
    uDisplStrenght2: {value: 0.08},
  }), [t1])


  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      uniforms: {...UniformsUtils.clone(ShaderLib.sprite.uniforms), ...myUniforms},
      vertexShader: vertex,
      fragmentShader: fragment,
      opacity: 0.1,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    return mat
  })

  useEffect( () => {
    if (material) {
      material.uniforms.uTxtShape.value = t1
    }
  }, [t1, material])

  useEffect( () => {
    if (material) {
      material.uniforms.uTxtCloudNoise.value = t2
    }
  }, [t2, material])

  useFrame(()=> {
    if (material) {
      material.uniforms.uTime.value += 1
          }
  })

  return (
      <mesh
        ref={mesh}
        position={position}
        scale={[width, height, 1]}
      >
        <planeBufferGeometry
          args={[20.0, 20.0, 5, 5]}
          attach="geometry" />
        <primitive
          object={material}
          attach="material"
        />
      </mesh>
  )
}


const Background = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
  pointer-events: auto;
  z-index: -300;
`;
/*
function Rig({ mouse }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current[0] / 50 - camera.position.x) * 0.05
    camera.position.y += (-mouse.current[1] / 50 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}
*/
//<Cloud size={[1, 1]} position={[0, 0, 0]}/>

const Particle = (props) => {
  //const mouse = useRef([0, 0])
    return (
        <Background>
        <Canvas>
        <Cloud size={[1, 1]} position={[0, 10, 0]}/>
        <ambientLight intensity={0.8}/>
        <Suspense fallback={null}>
        <Falling song={props.song}/>
        </Suspense>
        <Controls/>
        </Canvas>
        </Background>
    )
}

export default Particle;