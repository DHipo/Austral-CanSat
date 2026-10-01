'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const InteractiveBackground: React.FC = () => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  const [targetPos, setTargetPos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setTargetPos({ x, y });
    };

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

  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700">
      {/* Base Background: Deep Black vs Clean Apple White */}
      <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-[#F5F5F7]' : 'bg-[#000000]'}`} />

      {/* Floating Animated Ambient Gradient Meshes */}
      <div 
        className="absolute -top-[25%] -left-[15%] w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[140px] animate-ambient-mesh transition-all duration-700"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(201, 214, 242, 0.7) 0%, rgba(11, 22, 51, 0.07) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(11, 22, 51, 0.85) 0%, rgba(23, 38, 79, 0.5) 45%, transparent 70%)',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: isLight ? 0.75 : 0.6,
        }}
      />

      <div 
        className="absolute top-[35%] -right-[15%] w-[75vw] h-[75vw] max-w-[1100px] max-h-[1100px] rounded-full blur-[150px] animate-ambient-mesh-slow transition-all duration-700"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(255, 122, 26, 0.12) 0%, rgba(201, 214, 242, 0.5) 45%, transparent 75%)'
            : 'radial-gradient(circle, rgba(30, 50, 104, 0.65) 0%, rgba(11, 22, 51, 0.4) 50%, transparent 75%)',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: isLight ? 0.6 : 0.5,
        }}
      />

      <div 
        className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] max-w-[950px] max-h-[950px] rounded-full blur-[160px] animate-ambient-mesh transition-all duration-700"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(23, 38, 79, 0.08) 0%, rgba(201, 214, 242, 0.4) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(23, 38, 79, 0.7) 0%, rgba(11, 22, 51, 0.45) 50%, transparent 80%)',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: isLight ? 0.5 : 0.4,
        }}
      />

      {/* Dynamic Cursor Reactive Glow (Tracks user mouse smoothly) */}
      <div
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-[100px] transition-opacity duration-500"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          background: isLight
            ? 'radial-gradient(circle, rgba(11, 22, 51, 0.08) 0%, rgba(255, 122, 26, 0.06) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(201, 214, 242, 0.15) 0%, rgba(23, 38, 79, 0.4) 35%, rgba(11, 22, 51, 0.2) 60%, transparent 75%)',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: isLight ? 0.7 : 0.5,
        }}
      />

      {/* Subtle Texture Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isLight ? 'opacity-[0.035] bg-[radial-gradient(#000_1px,transparent_1px)]' : 'opacity-[0.025] bg-[radial-gradient(#fff_1px,transparent_1px)]'} [background-size:24px_24px]`} 
      />
    </div>
  );
};
