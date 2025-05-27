// Grid.jsx
// import React from 'react';
import React, { useEffect, useRef } from 'react';

const Vid = ({ keyva }) => {
    // const divRef = useRef(null);

    const keyVal = keyva; 

    const useKeyInFunction = (keyv) => { 
      console.log("Key value:", keyv); 
      // Add your logic here using the key value as a parameter 
      let cam = keyv
      let camurl = "http://127.0.0.1:8080/video/" + cam
      console.log(camurl)

      return camurl
    };
    const videoRef = useRef(null);
    // let cam = "item" + ind
    // let cam = "item" + ind
    // console.log(camurl)
    // console.log(ind)

    useEffect(() => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.src = useKeyInFunction(keyVal);
      }
    }, [keyVal]);

    return (<>
      <div>
        <iframe
          ref={videoRef}
          autoPlay
          allowFullScreen
          controls={false}
          display="block"
          // height="280px"
          // width="335px"
          style={{ width: "335px", height: "280px", border: "1px solid black" }}
        />
      </div>
    </>)
  }



  const Grid = ({ items }) => {
    // let k = toString(items.key)

    // const divRef = useRef(null);

    // const keyValue = divRef.current.getAttribute('data-key'); 
    return (
      <div className="grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {items.map((item) => (
          <div key={item.key} className="relative w-full h-72 bg-gray-200 flex items-center justify-center">
            {/* {Vid(item.key)} */}
            {/* {vid.map((vi) =>(

            ))} */}
            <Vid keyva={item.key} />
            {/* {item.key} */}
            {/* {Vid(item.key)} */}
            {item.content}
          </div>
        ))}
      </div>
    );
  };

  export default Grid;
