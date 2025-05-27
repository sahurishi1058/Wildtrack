'use client'
import Grid from './grid';
import React, {useState, useEffect} from 'react';

// const items = [
//   <div key="item1" className="text-center"></div>,
//   <div key="item2" className="text-center"></div>,
//   <div key="item3" className="text-center"></div>,
//   <div key="item4" className="text-center"></div>,
//   <div key="item5" className="text-center"></div>,
//   <div key="item6" className="text-center"></div>,
//   // Add more items as needed
// ];

const items = [
  { key: 'item1', content: <div className="text-center"></div> },
  { key: 'item2', content: <div className="text-center"></div> },
  { key: 'item3', content: <div className="text-center"></div> },
  { key: 'item4', content: <div className="text-center"></div> },
  { key: 'item5', content: <div className="text-center"></div> },
  { key: 'item6', content: <div className="text-center"></div> },
  // Add more items as needed
];


export default function Example() {
  return (
    <>
        {/* <header className="bg-white shadow">
        </header> */}
        
        <main>
          <div> 
            <Grid items={items} /> 
            
          </div>
        </main>
    </>
  )
}
