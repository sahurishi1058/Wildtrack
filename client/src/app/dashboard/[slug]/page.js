'use client'
import React, { useEffect, useRef } from 'react';
// import React from 'react';
// import { useParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';

const items = [
  <div key="item1" className="text-center">Item 1</div>
  // Add more items as needed
];


export default function Page({params}){

  const {slug} = React.use(params)
  const videoRef = useRef(null);
  let cam = slug
  let camurl = "http://127.0.0.1:8080/video/" + cam
  
    useEffect(() => {
      const videoElement = videoRef.current;
      if (videoElement) {
        // videoElement.src = "http://127.0.0.1:8080/video";
        videoElement.src = camurl;
      }
    }, []);


  return (<>
    <header className="bg-white shadow">
    <h1 className='shrink-0 font-bold font-serif text-3xl text-black'>page {slug}</h1>
    {/* <Viewitem items={items} /> */}
    <div>
      <iframe
        ref={videoRef}
        autoPlay
        allowFullScreen
        controls={false}
        style={{ width: "643px", height: "482px", border: "1px solid black" }}
      />
    </div>
    </header> 
    </>)
}

