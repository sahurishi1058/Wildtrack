// import React, { useEffect, useRef } from 'react';

// const Video = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     video.src = 'http://127.0.0.1:8080/video';
//     video.load();

//     const playPromise = video.play();
//     if (playPromise !== undefined) {
//       playPromise.then(() => {
//         console.log('Video is playing');
//       }).catch((error) => {
//         console.error('Error playing video:', error);
//       });
//     }

//     return () => {
//       if (video) {
//         video.pause();
//         video.src = '';
//       }
//     };
//   }, []);

//   return <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: 'auto' }} />;
// };

// export default Video;
