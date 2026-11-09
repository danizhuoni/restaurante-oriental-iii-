import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
 * Drifting gold dust caught in the palace light beams.
 * A single THREE.Points draw call with a tiny shader; it renders only while
 * `active` is true (the hero is on screen) and reacts gently to the pointer.
 */
const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    // slow upward drift with a lazy sideways sway, wrapped in a 12-unit column
    p.y = mod(p.y + uTime * (0.12 + aSeed * 0.18) + 6.0, 12.0) - 6.0;
    p.x += sin(uTime * 0.3 + aSeed * 20.0) * 0.25;
    p.z += cos(uTime * 0.2 + aSeed * 12.0) * 0.2;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z);
    // twinkle, and fade out near the top/bottom of the column
    float twinkle = 0.55 + 0.45 * sin(uTime * (1.0 + aSeed * 2.0) + aSeed * 40.0);
    vAlpha = twinkle * smoothstep(6.0, 3.5, abs(p.y));
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, glow * glow * vAlpha);
  }
`;

export default function GoldDust({ active = true, count = 900, color = '#e9c46a' }) {
  const hostRef = useRef(null);
  const stateRef = useRef({ running: false });

  useEffect(() => {
    const host = hostRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      return; // no WebGL: the CSS light rays still carry the scene
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
    camera.position.z = 8;

    const n = window.innerWidth < 700 ? Math.round(count * 0.45) : count;
    const pos = new Float32Array(n * 3);
    const size = new Float32Array(n);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      size[i] = 0.6 + Math.random() * Math.random() * 3.2;
      seed[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: dpr },
        uColor: { value: new THREE.Color(color) },
      },
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const pointer = { x: 0, y: 0 };
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      mat.uniforms.uTime.value = clock.getElapsedTime();
      camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    stateRef.current = {
      start() {
        if (this.running) return;
        this.running = true;
        clock.start();
        raf = requestAnimationFrame(tick);
      },
      stop() {
        this.running = false;
        cancelAnimationFrame(raf);
      },
    };
    stateRef.current.start();

    return () => {
      stateRef.current.stop();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [count, color]);

  useEffect(() => {
    const s = stateRef.current;
    if (!s.start) return;
    active ? s.start() : s.stop();
  }, [active]);

  return <div ref={hostRef} className="gold-dust" aria-hidden="true" />;
}
