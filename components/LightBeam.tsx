"use client";

import React from "react";

const LightBeam = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <div className="relative flex flex-col items-center">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60px] h-[68vh] opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-400 to-orange-500 blur-[30px]"></div>
          </div>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1px] h-[68vh] bg-white"></div>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[6px] h-[68vh] opacity-60">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-300 to-orange-400 blur-[3px]"></div>
          </div>

          <div className="absolute -top-[12px] left-1/2 transform -translate-x-1/2 w-[24px] h-[24px] rounded-full bg-gradient-to-br from-orange-300 to-orange-400 opacity-90 blur-[8px]"></div>

          <div className="absolute -top-[3px] left-1/2 transform -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white"></div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-float-particle opacity-80"
            style={{
              top: `${i * 20}%`,
              left: `${Math.sin(i * 0.8) * 5}px`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-[65vh] left-1/2 transform -translate-x-1/2 w-[100px] h-[50px] opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-orange-400 blur-[20px] opacity-40"></div>
      </div>
    </div>
  );
};

export default LightBeam;
