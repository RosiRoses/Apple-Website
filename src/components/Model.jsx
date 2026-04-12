import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  })

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if(size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }

    if(size ==='small') {
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      })
    }
  }, [size])

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative cursor-pointer">
            <ModelView 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />  

            <ModelView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span key={label} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model




// // This Model component displays a 3D iPhone model and lets user change its color, size and rotate the model


// //useState triggers UI update so React rerenders -> changes UI
// //useRef stores a value that persists across renders without causing re-renders -> stores something quietly
// import React, { useRef, useState } from 'react';


// import gsap from 'gsap';
// import { useGSAP } from "@gsap/react";
// import ModelView from './ModelView';
// import { yellowImg } from "../utils";

// //core 3D engine which provides group, meshes, lights, camera
// //it is a JavaScript library for creating 3D graphics in the browser
// import * as THREE from 'three';

// //React wrapper for Three.js. Converts Three.js into React-style components
// import { Canvas } from "@react-three/fiber";

// //Allows mutliple views inside one canvas (used because small and large model is being implemented which are sharing the same WebGL context)
// //WebGL is the technology that lets browser talk to GPU and 'context' means one GPU rendering environment. Every context uses memory and GPU resources
// import { View } from "@react-three/drei";

// //models for color options, sizes for size buttons
// import { models,sizes } from "../constants";



// const Model = () => {
//   //which version of model to show (small vs large)
//   const [size, setSize] = useState('small');

//   const [model, setModel] = useState({
//     title: 'iPhone 15 pro in Natual Titanium',
//     color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
//     img: yellowImg,
//   })

//   //camera control for the model view
//   // Refs are used because I don't re-render the model when it changes and I need direct access to underlying 3D controls
//   const cameraControlSmall = useRef();
//   const cameraControlLarge = useRef();

//   //models themselves
//   //THREE.Group is a container for 3D objects
//   const small = useRef(new THREE.Group());
//   const large = useRef(new THREE.Group());

//   //keeping track of rotation models
//   //useState is used because roation changers when user drags, and the UI/animation depends on it
//   const [smallRotation, setSmallRotation] = useState(0);
//   const [largeRotation, setLargeRotation] = useState(0);

//   useGSAP(() => {
//     gsap.to('#heading', {
//       y:0,
//       opacity:1
//     })
//   }, []);

//   return (
//     <section className='common-padding'>
//         <div className='screen-max-width'>
//             <h1 id="heading" className='section-heading'>
//                 Take a closer look.
//             </h1>
//             <div className='flex flex-col items-center mt-5'>
//               <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
//                 <ModelView
//                   index={1}
//                   groupRef={small} //where 3D model is stored
//                   gsapType="view1" //animation identifier
//                   controlRef={cameraControlSmall}
//                   setRotationState={setSmallRotation}
//                   item={model}
//                   size = {size}
//                 />
              
//                 <ModelView
//                   index={2}
//                   groupRef={large}
//                   gsapType="view2"
//                   controlRef={cameraControlLarge}
//                   setRotationState={setLargeRotation}
//                   item={model}
//                   size = {size}
//                 />

//                 {/* 3D engine mount. Canvas replaces 'new Three.scene()' and 'new Three.Renderer()'*/}
//                 <Canvas className='w-full h-full'
//                   style = {{
//                     position: 'fixed', 
//                     top:0,
//                     bottom:0,
//                     left:0,
//                     right:0,
//                     overflow:'hidden'
//                   }}
//                   eventSource={document.getElementById('root')}
//                 >
//                   {/* This connects multiple View components (inside ModelView) to ONE canvas */}
//                   {/* Without this multiple canvases will have to be used */}
//                   <View.Port/>
//                 </Canvas>
//               </div>

//               <div className='mx-auto w-full'>
//                 <p className='text-sm font-light text-center mb-5'>
//                   {model.title}
//                 </p>

//                 <div className='flex-center'>
//                   <ul className='color-container'>
//                     {models.map((item,i) => (
//                       <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer'
//                         style={{
//                           backgroundColor: item.color[0]
//                         }}
//                         onClick={() => setModel(item)}/>                       
//                     ))}
//                   </ul>
                  
//                   <button className='size-btn-container'>
//                     {sizes.map(({ label, value }) => (
//                       <span key={label} className='size-btn'
//                         style={{ backgroundColor: size === value ? 'white' : 'transparent', 
//                           color: size === value ? 'black' : 'white'}}
//                         onClick={() => setSize(value)}>
//                         {label}
//                       </span>
//                     ))}
                      
//                   </button>
//                 </div>

//               </div>
//             </div>
//         </div>
//     </section>
//   )
// }

// export default Model