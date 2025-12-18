"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

export default function RayTracer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size.
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position.
    const handleMouseMove = (e: MouseEvent) => {
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      });

      // Limit points array size.
      if (pointsRef.current.length > 50) {
        pointsRef.current.shift();
      }
    };

    // Track touch position.
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        pointsRef.current.push({
          x: touch.clientX,
          y: touch.clientY,
          age: 0,
        });

        if (pointsRef.current.length > 50) {
          pointsRef.current.shift();
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Animation loop.
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;

      // Draw rays between points.
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];

          // Calculate opacity based on age.
          const maxAge = 30;
          const opacity = Math.max(0, 1 - p1.age / maxAge);

          if (opacity > 0) {
            // Draw line with neon green glow.
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Outer glow.
            ctx.strokeStyle = `rgba(57, 255, 20, ${opacity * 0.3})`;
            ctx.lineWidth = 8;
            ctx.lineCap = "round";
            ctx.stroke();

            // Middle glow.
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(57, 255, 20, ${opacity * 0.5})`;
            ctx.lineWidth = 4;
            ctx.stroke();

            // Core line.
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(57, 255, 20, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }

        // Draw cursor point.
        if (points.length > 0) {
          const lastPoint = points[points.length - 1];

          // Outer glow.
          ctx.beginPath();
          ctx.arc(lastPoint.x, lastPoint.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(57, 255, 20, 0.2)";
          ctx.fill();

          // Inner glow.
          ctx.beginPath();
          ctx.arc(lastPoint.x, lastPoint.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(57, 255, 20, 0.4)";
          ctx.fill();

          // Core point.
          ctx.beginPath();
          ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#39ff14";
          ctx.fill();
        }
      }

      // Age all points.
      pointsRef.current = points.map((p) => ({ ...p, age: p.age + 1 }));

      // Remove old points.
      pointsRef.current = pointsRef.current.filter((p) => p.age < 30);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup.
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
