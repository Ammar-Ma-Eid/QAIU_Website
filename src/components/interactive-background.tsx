'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'dot' | 'atom';
  rotation: number;
  rotationSpeed: number;
}

const InteractiveBackground = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const foregroundColor = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim();
    const particleColor = `hsl(${foregroundColor})`;
    const [h, s, l] = foregroundColor.split(' ');

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      
      const particleCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 10000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isAtom = Math.random() < 0.20; // 20% chance to be an atom
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: isAtom ? Math.random() * 3 + 4 : Math.random() * 2 + 2,
          type: isAtom ? 'atom' : 'dot',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };
    
    resizeCanvas();

    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scaledWidth = canvas.offsetWidth;
      const scaledHeight = canvas.offsetHeight;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = scaledWidth + 10;
        if (p.x > scaledWidth + 10) p.x = -10;
        if (p.y < -10) p.y = scaledHeight + 10;
        if (p.y > scaledHeight + 10) p.y = -10;

        if (p.type === 'atom') {
          p.rotation += p.rotationSpeed;
          const nucleusRadius = p.radius;
          const orbitRadiusX = p.radius * 3.5;
          const orbitRadiusY = p.radius * 1.5;

          ctx.strokeStyle = particleColor;
          ctx.fillStyle = particleColor;
          ctx.lineWidth = 0.8;

          // Draw nucleus
          ctx.beginPath();
          ctx.arc(p.x, p.y, nucleusRadius, 0, Math.PI * 2);
          ctx.fill();

          // Draw first orbit
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, orbitRadiusX, orbitRadiusY, p.rotation, 0, Math.PI * 2);
          ctx.stroke();
          
          // Draw second orbit
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, orbitRadiusX, orbitRadiusY, p.rotation + Math.PI / 2, 0, Math.PI * 2);
          ctx.stroke();

        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }
      });

      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${h}, ${s}, ${l}, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn('fixed inset-0 w-full h-full opacity-20 pointer-events-none z-[-1]', className)}
    />
  );
};

export default InteractiveBackground;
