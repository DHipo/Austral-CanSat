'use client';

import React, { useEffect, useState } from 'react';

export const InteractiveBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  const [targetPos, setTargetPos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to percentage of window
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setTargetPos({ x, y });
    };

    // Smooth interpolation (lerp) loop for fluid motion
    const updateMotion = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.08,
        y: prev.y + (targetPos.y - prev.y) * 0.08,
      }));
      animationFrameId = requestAnimationFrame(updateMotion);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos.x, targetPos.y]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Deep Obsidian Black to Dark Navy Background */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* Floating Animated Ambient Gradient Meshes (Navy #0B1633 & Space Navy #17264F) */}
      <div 
        className="absolute -top-[25%] -left-[15%] w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] rounded-full opacity-60 blur-[140px] animate-ambient-mesh mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(11, 22, 51, 0.85) 0%, rgba(23, 38, 79, 0.5) 45%, transparent 70%)',
        }}
      />

      <div 
        className="absolute top-[35%] -right-[15%] w-[75vw] h-[75vw] max-w-[1100px] max-h-[1100px] rounded-full opacity-50 blur-[150px] animate-ambient-mesh-slow mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(30, 50, 104, 0.65) 0%, rgba(11, 22, 51, 0.4) 50%, transparent 75%)',
        }}
      />

      <div 
        className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] max-w-[950px] max-h-[950px] rounded-full opacity-40 blur-[160px] animate-ambient-mesh mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(23, 38, 79, 0.7) 0%, rgba(11, 22, 51, 0.45) 50%, transparent 80%)',
        }}
      />

      {/* Subtle Aerospace Orange Ambient Core */}
      <div 
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[350px] rounded-full opacity-15 blur-[130px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 122, 26, 0.7) 0%, transparent 70%)',
        }}
      />

      {/* Dynamic Cursor Reactive Glow (Tracks user mouse smoothly) */}
      <div
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-50 transition-opacity duration-500 blur-[100px] mix-blend-screen"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          background: 'radial-gradient(circle, rgba(201, 214, 242, 0.15) 0%, rgba(23, 38, 79, 0.4) 35%, rgba(11, 22, 51, 0.2) 60%, transparent 75%)',
        }}
      />

      {/* Second Subtle Cursor Reactive Orange Sparkle Glow */}
      <div
        className="absolute w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-20 blur-[80px]"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          background: 'radial-gradient(circle, rgba(255, 122, 26, 0.6) 0%, transparent 65%)',
        }}
      />

      {/* Apple Subtle Noise / Fine Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
    </div>
  );
};
