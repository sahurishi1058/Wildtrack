'use client'
import React, { useEffect, useState } from 'react';

const Logs = () => {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch("http://127.0.0.1:8080/logline")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  const Items = [];
  for (let i = 0; i < message.length+1; i++) {
    let k = message.length - i;
    Items.push(
      <div key={i}
        style={{
          padding: '10px', margin: '5px',
          borderRadius: '2px', width: '100%'
        }}>
        {message[k]}
      </div>
    );
  }
  // console.log(message[0])

  return (
    <div>
      <h1 className='text-black'>LOGS OF DETECTION</h1>
      <div className='text-black'>{Items}</div>

    </div>
  );
};

export default Logs;
