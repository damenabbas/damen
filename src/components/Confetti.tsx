import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle';
}

const colors = ['#006c35', '#c9a961', '#e0c97e', '#0a8f4a', '#ffffff', '#004d24'];

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6,
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as Particle['shape'],
      });
    }
    setParticles(newParticles);

    let animationId: number;
    let currentParticles = newParticles;

    const animate = () => {
      currentParticles = currentParticles.map((p) => {
        const newY = p.y + p.vy;
        const newX = p.x + p.vx;
        const newRotation = p.rotation + p.rotationSpeed;

        if (newY > window.innerHeight + 20) {
          return {
            ...p,
            y: -20,
            x: Math.random() * window.innerWidth,
            rotation: newRotation,
          };
        }
        return { ...p, y: newY, x: newX, rotation: newRotation };
      });

      setParticles([...currentParticles]);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.shape !== 'triangle' ? p.color : 'transparent',
            transform: `rotate(${p.rotation}deg)`,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '0',
            borderLeft: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : 'none',
            borderRight: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : 'none',
            borderBottom: p.shape === 'triangle' ? `${p.size}px solid ${p.color}` : 'none',
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}
