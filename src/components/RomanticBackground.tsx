import React, { useEffect, useRef } from 'react';

interface RomanticBackgroundProps {
  intensity?: 'subtle' | 'normal' | 'rich';
}

export const RomanticBackground: React.FC<RomanticBackgroundProps> = ({ intensity = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 1. Rose Petals (Romantic)
    const petalCount = intensity === 'subtle' ? 14 : intensity === 'rich' ? 32 : 22;
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      flip: number;
      flipSpeed: number;
      opacity: number;
      color: string;
    }

    const petalColors = [
      'rgba(233, 169, 189, 0.45)', // Soft rose
      'rgba(247, 220, 229, 0.55)', // Blush
      'rgba(200, 121, 151, 0.38)', // Deep rose
      'rgba(217, 188, 145, 0.35)', // Golden champagne
    ];

    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 7,
      speedY: Math.random() * 0.7 + 0.35,
      speedX: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.8,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.5 + 0.3,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // 2. Friendship & Warmth Constellation Nodes (Golden & Rose glowing nodes that connect when near)
    const nodeCount = intensity === 'subtle' ? 16 : intensity === 'rich' ? 36 : 24;
    interface ConstellationNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulsePhase: number;
      isGold: boolean;
    }

    const nodes: ConstellationNode[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1.2,
      baseAlpha: Math.random() * 0.4 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
      isGold: Math.random() > 0.4, // 60% warm golden friendship, 40% rose
    }));

    // 3. Floating Fairy Lights / Fireflies (warm glowing embers)
    const fireflyCount = intensity === 'subtle' ? 12 : intensity === 'rich' ? 28 : 18;
    interface Firefly {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      angle: number;
      speed: number;
      pulse: number;
      pulseSpeed: number;
    }

    const fireflies: Firefly[] = Array.from({ length: fireflyCount }, () => {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      return {
        x: rx,
        y: ry,
        baseX: rx,
        baseY: ry,
        size: Math.random() * 3.5 + 2,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.008,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.04 + 0.02,
      };
    });

    const maxConnectionDistance = 110;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- Draw Friendship Constellation Lines & Nodes ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulsePhase += n.pulseSpeed;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Draw links between nearby nodes (Friendship connection threads)
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const linkAlpha = (1 - dist / maxConnectionDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            // Gradient romantic-friendship line
            ctx.strokeStyle = n.isGold
              ? `rgba(217, 188, 145, ${linkAlpha})`
              : `rgba(233, 169, 189, ${linkAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node
        const currentAlpha = n.baseAlpha + Math.sin(n.pulsePhase) * 0.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.isGold
          ? `rgba(217, 188, 145, ${Math.max(0.1, currentAlpha)})`
          : `rgba(200, 121, 151, ${Math.max(0.1, currentAlpha)})`;
        ctx.fill();
      }

      // --- Draw Floating Fairy Lights / Fireflies ---
      for (const f of fireflies) {
        f.angle += f.speed;
        f.pulse += f.pulseSpeed;
        f.x = f.baseX + Math.cos(f.angle) * 35;
        f.y = f.baseY + Math.sin(f.angle * 1.5) * 25;
        f.baseY -= 0.25; // slowly drift upward

        if (f.baseY < -30) {
          f.baseY = height + 30;
          f.baseX = Math.random() * width;
        }

        const glow = Math.sin(f.pulse) * 0.35 + 0.65;
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 3.5);
        grad.addColorStop(0, `rgba(253, 230, 138, ${0.75 * glow})`); // soft amber light
        grad.addColorStop(0.4, `rgba(233, 169, 189, ${0.45 * glow})`); // soft rose
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // --- Draw Falling & Fluttering Rose Petals ---
      for (const p of petals) {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.008) * 0.7 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        // 3D flip effect on Y axis
        ctx.scale(1, Math.cos(p.flip));

        // Draw organic petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size, -p.size * 0.7, -p.size * 0.8, p.size, 0, p.size * 1.3);
        ctx.bezierCurveTo(p.size * 0.8, p.size, p.size, -p.size * 0.7, 0, 0);
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Layered Romantic & Warm Golden Friendship Ambient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F3] via-[#FFF5F7] to-[#F7DCE5]/35 opacity-95" />

      {/* Warm Golden Friendship Aurora (Top Left) */}
      <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-[#D9BC91]/25 via-[#FDE68A]/18 to-transparent blur-3xl pointer-events-none animate-float" />

      {/* Romantic Rose Ambient Aura (Top Right) */}
      <div className="absolute top-[20%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-bl from-[#E9A9BD]/25 via-[#C87997]/15 to-transparent blur-3xl pointer-events-none animate-float-delayed" />

      {/* Warm Sunset Peach / Friendship Glow (Center Bottom) */}
      <div className="absolute -bottom-[10%] left-[25%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tr from-[#D6A2B5]/20 via-[#D9BC91]/18 to-transparent blur-3xl pointer-events-none animate-float" />

      {/* Canvas for Petals, Constellations & Fairy Lights */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />
    </div>
  );
};
