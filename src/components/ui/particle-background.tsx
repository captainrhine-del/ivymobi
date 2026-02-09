import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  minRadius?: number;
  maxRadius?: number;
  speed?: number;
  lineDistance?: number;
}

export function ParticleBackground({
  className = "",
  particleCount = 80,
  minRadius = 1,
  maxRadius = 3,
  speed = 0.5,
  lineDistance = 150,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getGradientColor = (ratio: number): string => {
      // Red to Blue gradient based on position
      const r = Math.round(239 - ratio * 139); // 239 -> 100
      const g = Math.round(68 + ratio * 30);   // 68 -> 98
      const b = Math.round(68 + ratio * 187);  // 68 -> 255
      return `rgb(${r}, ${g}, ${b})`;
    };

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const ratio = x / canvas.width; // Use position for color gradient
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          color: getGradientColor(ratio),
          alpha: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      if (!ctx) return;
      
      // Glow effect
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 3
      );
      gradient.addColorStop(0, particle.color.replace("rgb", "rgba").replace(")", `, ${particle.alpha})`));
      gradient.addColorStop(1, "transparent");
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace("rgb", "rgba").replace(")", `, ${particle.alpha})`);
      ctx.fill();
    };

    const drawConnections = () => {
      if (!ctx) return;
      
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lineDistance) {
            const opacity = (1 - distance / lineDistance) * 0.3;
            
            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            gradient.addColorStop(0, particles[i].color.replace("rgb", "rgba").replace(")", `, ${opacity})`));
            gradient.addColorStop(1, particles[j].color.replace("rgb", "rgba").replace(")", `, ${opacity})`));
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction
        if (mouseRef.current.isActive) {
          const dx = particles[i].x - mouseRef.current.x;
          const dy = particles[i].y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lineDistance * 1.5) {
            const opacity = (1 - distance / (lineDistance * 1.5)) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const updateParticles = () => {
      const particles = particlesRef.current;
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Update color based on position (creates flowing gradient effect)
        const ratio = particle.x / canvas.width;
        particle.color = getGradientColor(ratio);
      });
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateParticles();
      drawConnections();
      particlesRef.current.forEach(drawParticle);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
    
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [particleCount, minRadius, maxRadius, speed, lineDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-auto ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
