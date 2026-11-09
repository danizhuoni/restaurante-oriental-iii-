import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

/** Sparks rising from the wok flame. Plain 2D canvas; paused when offscreen. */
export default function Embers({ active }) {
  const canvasRef = useRef(null);
  const runRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = w < 700 ? 45 : 90;
    const spawn = (p = {}) => {
      // Sparks are born around the flame (lower centre-right of the photo).
      p.x = w * (0.5 + (Math.random() - 0.4) * 0.35);
      p.y = h * (0.72 + Math.random() * 0.2);
      p.vx = (Math.random() - 0.5) * 0.5;
      p.vy = -(0.6 + Math.random() * 1.6);
      p.life = 0;
      p.max = 90 + Math.random() * 160;
      p.r = 0.6 + Math.random() * 1.8;
      return p;
    };
    const sparks = Array.from({ length: N }, () => {
      const p = spawn();
      p.life = Math.random() * p.max;
      return p;
    });

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of sparks) {
        p.life++;
        p.vx += (Math.random() - 0.5) * 0.08;
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.max;
        if (t >= 1 || p.y < -10) {
          spawn(p);
          continue;
        }
        const a = Math.sin(Math.PI * t) * 0.9;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255,214,140,${a})`);
        g.addColorStop(0.4, `rgba(255,120,40,${a * 0.6})`);
        g.addColorStop(1, 'rgba(255,60,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    runRef.current = {
      start() {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      },
      stop() {
        cancelAnimationFrame(raf);
      },
    };
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      runRef.current = {};
    };
  }, []);

  useEffect(() => {
    const r = runRef.current;
    if (!r.start) return;
    active ? r.start() : r.stop();
  }, [active]);

  return <canvas ref={canvasRef} className="embers" aria-hidden="true" />;
}
