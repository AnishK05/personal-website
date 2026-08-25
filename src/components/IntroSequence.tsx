/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { naturePhotos } from '@/lib/photos';
import { useSetIntroActive } from '@/components/BubblyContext';

const STORAGE_KEY = 'anish-intro-seen';
type Phase = 'boot' | 'photos' | 'text' | 'exiting' | 'done';

const STANDOUT_LAYOUT: Record<string, { x: number; y: number; rot: number }> = {
  '/Cascades2.jpg': { x: -36, y: -38, rot: 7 },
  '/Si3.jpg': { x: 6, y: -40, rot: -4 },
  '/AnishKalraNature.jpg': { x: 30, y: -22, rot: -6 },
  '/Rainier2.jpg': { x: -22, y: 39, rot: 5 },
  '/Snow2.jpg': { x: 36, y: 38, rot: 8 },
};

const FILL_SLOTS = [
  { x: -22, y: -40, rot: -8 },
  { x: -8, y: -38, rot: 5 },
  { x: 22, y: -38, rot: -7 },
  { x: 38, y: -38, rot: 10 },
  { x: -28, y: -22, rot: 6 },
  { x: -42, y: -16, rot: -9 },
  { x: 42, y: -16, rot: 4 },
  { x: -44, y: 4, rot: 8 },
  { x: 44, y: 4, rot: -6 },
  { x: -42, y: 20, rot: 3 },
  { x: 42, y: 20, rot: -8 },
  { x: -28, y: 24, rot: 5 },
  { x: 28, y: 24, rot: -5 },
  { x: -36, y: 38, rot: 7 },
  { x: -8, y: 38, rot: -4 },
  { x: 8, y: 40, rot: 6 },
  { x: 22, y: 38, rot: -7 },
];

// naturePhotos.ts lists photos grouped by location (all Cascades shots
// together, all Rainier shots together, ...), and FILL_SLOTS is handed
// out in that same array order. Left alone, that puts every photo from
// one location next to each other in the collage. Round-robin across
// locations instead so slot order stays visually shuffled.
function locationKey(src: string) {
  return src.replace(/^\//, '').replace(/\d+\.jpg$/i, '');
}

const FILL_INDEX: Record<string, number> = (() => {
  const groups = new Map<string, string[]>();
  naturePhotos.forEach((photo) => {
    if (STANDOUT_LAYOUT[photo.src]) return;
    const key = locationKey(photo.src);
    const list = groups.get(key) ?? [];
    list.push(photo.src);
    groups.set(key, list);
  });

  const buckets = Array.from(groups.values());
  const total = buckets.reduce((n, b) => n + b.length, 0);
  const order: string[] = [];
  for (let round = 0; order.length < total; round += 1) {
    buckets.forEach((bucket) => {
      if (bucket[round]) order.push(bucket[round]);
    });
  }

  return Object.fromEntries(order.map((src, i) => [src, i]));
})();

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function startPoint(rng: () => number, restX: number, restY: number, compact: boolean) {
  const far = (compact ? 74 : 88) + rng() * 34;
  const roll = rng();

  if (roll < 0.28) {
    const sx = Math.abs(restX) >= Math.abs(restY) ? Math.sign(restX || 1) : (rng() > 0.5 ? 1 : -1);
    const sy = Math.abs(restY) > Math.abs(restX) ? Math.sign(restY || 1) : (rng() > 0.5 ? 1 : -1);
    if (Math.abs(restX) >= Math.abs(restY)) return { x: sx * far, y: restY + (rng() - 0.5) * 18 };
    return { x: restX + (rng() - 0.5) * 18, y: sy * far };
  }

  if (roll < 0.5) {
    return {
      x: (rng() > 0.5 ? 1 : -1) * far,
      y: (rng() > 0.5 ? 1 : -1) * (far * (0.55 + rng() * 0.35)),
    };
  }

  const edge = Math.floor(rng() * 4);
  const along = (rng() - 0.5) * 130;
  if (edge === 0) return { x: along, y: -far };
  if (edge === 1) return { x: far, y: along };
  if (edge === 2) return { x: along, y: far };
  return { x: -far, y: along };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Per-photo constants for the physics sim: where it rests, where it
// starts, and the parameters governing how it wanders and settles.
// This replaces precomputed keyframes entirely — position, rotation,
// tilt and scale are now integrated live every animation frame in the
// component below, so there's no fixed sampling resolution to outgrow.
function photoRig(
  photo: (typeof naturePhotos)[number],
  index: number,
  seed: number,
  compact: boolean,
) {
  const rng = mulberry32(seed * 4243 + index * 917 + 11);
  const standout = Boolean(STANDOUT_LAYOUT[photo.src]);
  const slot = STANDOUT_LAYOUT[photo.src] ?? FILL_SLOTS[(FILL_INDEX[photo.src] ?? 0) % FILL_SLOTS.length];
  const fit = compact ? 0.9 : 1;

  const restX = slot.x * fit;
  const restY = slot.y * fit;
  const rotRest = slot.rot + (rng() - 0.5) * 3;
  const p0 = startPoint(rng, restX, restY, compact);

  // Photos start big — like they're already close to the viewer — and
  // shrink smoothly down to their resting size as they settle. One
  // monotonic decay curve driven by live settle-progress each frame.
  const basePeak = compact
    ? (standout ? 3.1 : 2.4)
    : (standout ? 4.5 : 3.3);
  const peak = basePeak + rng() * (compact ? 0.5 : 0.8);
  const decayPower = 1.4 + rng() * 0.6;

  const rot0 = (rng() - 0.5) * 70;
  const rotXStart = (rng() - 0.5) * (compact ? 50 : 85);
  const rotYStart = (rng() - 0.5) * (compact ? 50 : 85);

  // The photo orbits around its own flight path on the way in — radius
  // shrinks smoothly to exactly 0 by the time it settles, so the swirl
  // never has to be "stopped," it just runs out of room on its own.
  const spiralRadius0 = compact ? 16 + rng() * 14 : 26 + rng() * 22;
  const spiralAngle0 = rng() * Math.PI * 2;
  const spiralSpeed = (rng() < 0.5 ? -1 : 1) * (1.4 + rng() * 1.6);
  const spiralDecayPower = 1.1 + rng() * 0.8;
  // A little rotation leans into the swirl (banks like it's turning),
  // fading out on the same envelope as the swirl itself.
  const rotSwirlAmp = 8 + rng() * 10;

  // Always at or above critical damping — an underdamped spring rings
  // (overshoots and wobbles back) as it nears its target, which is
  // exactly the "wavy" motion on arrival. No oscillation is possible
  // at ratio >= 1, so the landing is always a smooth, single glide in.
  const dampingRatio = 1.0 + rng() * 0.3;

  return {
    restX,
    restY,
    rotRest,
    p0,
    standout,
    width: standout
      ? compact ? 6.8 : 12.4
      : compact ? 5.1 + rng() * 0.4 : 7.5 + rng() * 0.8,
    z: standout ? 11 : 4 + Math.floor(rng() * 5),
    // Stagger: how long this photo waits before its sim clock starts.
    delay: rng() < 0.32 ? rng() * 0.55 : 0.4 + rng() * 2.0,
    // Total active wander+settle time once it starts.
    settleDuration: 3.8 + rng() * 2.2,
    dampingRatio,
    peak,
    decayPower,
    rot0,
    rotXStart,
    rotYStart,
    spiralRadius0,
    spiralAngle0,
    spiralSpeed,
    spiralDecayPower,
    rotSwirlAmp,
    floatX: `${(rng() - 0.5) * (compact ? 10 : 18)}px`,
    floatY: `${(rng() - 0.5) * (compact ? 14 : 22)}px`,
    floatRot: `${(rng() - 0.5) * 5}deg`,
    floatDuration: `${7 + rng() * 5}s`,
  };
}

function dustMotes(seed: number, compact: boolean) {
  const rng = mulberry32(seed * 77 + 3);
  const count = compact ? 22 : 38;
  return Array.from({ length: count }, (_, i) => {
    const r = rng();
    return {
      id: i,
      x: `${(rng() - 0.5) * 88}vw`,
      y: `${(rng() - 0.5) * 78}vh`,
      dx: `${(rng() - 0.5) * (compact ? 40 : 58)}vw`,
      dy: `${-18 - rng() * (compact ? 28 : 42)}vh`,
      size: 2 + rng() * 5,
      delay: rng() * 1.8,
      duration: 1.8 + rng() * 2.2,
      hue: r < 0.45 ? '#fff6d8' : r < 0.8 ? '#ffa630' : '#ffe7a3',
    };
  });
}

export default function IntroSequence({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('boot');
  const [seed, setSeed] = useState(1);
  const [compact, setCompact] = useState(false);

  const playing = phase === 'photos' || phase === 'text';
  const showOverlay = playing || phase === 'exiting';

  const setIntroActive = useSetIntroActive();
  useEffect(() => {
    setIntroActive(showOverlay);
    return () => setIntroActive(false);
  }, [showOverlay, setIntroActive]);

  const motions = useMemo(
    () => naturePhotos.map((photo, i) => photoRig(photo, i, seed, compact)),
    [seed, compact],
  );

  const motes = useMemo(() => dustMotes(seed, compact), [seed, compact]);

  const photoRefs = useRef<Array<HTMLDivElement | null>>([]);

  const play = (nextSeed = seed + 1) => {
    setSeed(nextSeed);
    setPhase('photos');
  };

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore quota / private mode */
    }
    setPhase('exiting');
    window.setTimeout(() => setPhase('done'), 650);
  };

  useEffect(() => {
    naturePhotos.forEach((photo) => {
      const img = new Image();
      img.src = photo.src;
    });

    const mq = window.matchMedia('(max-width: 768px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setCompact(mq.matches);

    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      seen = true;
    }

    if (seen || motion.matches) {
      setPhase('done');
      return;
    }

    play(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'photos') return;

    const arrivals = motions.map((m) => m.delay + m.settleDuration).sort((a, b) => a - b);
    const textAt = arrivals[Math.floor(arrivals.length * 0.35)] * 1000;
    const doneAt = arrivals[arrivals.length - 1] * 1000 + 3200;

    const textTimer = window.setTimeout(() => setPhase('text'), textAt);
    const doneTimer = window.setTimeout(finish, doneAt);
    return () => {
      window.clearTimeout(textTimer);
      window.clearTimeout(doneTimer);
    };
  }, [phase, motions]);

  // Live physics sim: each photo gets a noise-driven "wander"
  // acceleration plus a damped spring pulling it toward its rest slot.
  // The spring stiffness ramps up and the wander fades out over the
  // photo's own settle window, so early on it's drifting freely and by
  // the end it's smoothly, firmly locked in — computed fresh every
  // frame rather than interpolated between fixed keyframes.
  useEffect(() => {
    if (!playing) return;

    // Only the spring's own base position needs integrated state now —
    // rotation/tilt are plain deterministic curves (see below), so they
    // can't ring/oscillate no matter what.
    const states = motions.map((m) => ({ x: m.p0.x, y: m.p0.y, vx: 0, vy: 0 }));

    const springK0 = 0.28; // weak pull early — lets it swirl further out
    const springK1 = 32; // firm pull while settling

    let raf = 0;
    let last = performance.now();
    const start = last;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.04);
      last = now;
      const elapsed = (now - start) / 1000;

      motions.forEach((m, i) => {
        const node = photoRefs.current[i];
        const s = states[i];
        if (!node) return;

        const localT = elapsed - m.delay;
        if (localT < 0) {
          node.style.opacity = '0';
          return;
        }

        const progress = Math.min(1, localT / m.settleDuration);
        const settle = smoothstep(0, 1, progress);

        // The base flight path: a spring pulling toward the rest slot.
        // dampingRatio is always >= 1 (see photoRig), so this alone can
        // never overshoot or oscillate — it's a single smooth glide.
        const k = springK0 + (springK1 - springK0) * settle;
        const c = 2 * Math.sqrt(k) * m.dampingRatio;

        if (progress >= 1) {
          s.x = m.restX;
          s.y = m.restY;
          s.vx = 0;
          s.vy = 0;
        } else {
          const ax = (m.restX - s.x) * k - s.vx * c;
          const ay = (m.restY - s.y) * k - s.vy * c;
          s.vx += ax * dt;
          s.x += s.vx * dt;
          s.vy += ay * dt;
          s.y += s.vy * dt;
        }

        // The airy "flying around" flair: an orbit around the spring's
        // own path, with a radius that shrinks smoothly to exactly zero
        // right as the spring finishes — so the swirl runs out of room
        // on its own instead of being cut off or fought to a stop.
        const spiralEnvelope = progress >= 1 ? 0 : (1 - settle) ** m.spiralDecayPower;
        const spiralAngle = m.spiralAngle0 + m.spiralSpeed * localT;
        const spiralRadius = m.spiralRadius0 * spiralEnvelope;
        const swirlX = spiralRadius * Math.cos(spiralAngle);
        const swirlY = spiralRadius * Math.sin(spiralAngle) * 0.82;

        const drawX = s.x + swirlX;
        const drawY = s.y + swirlY;

        // Rotation/tilt: plain interpolation toward rest, no spring —
        // guaranteed to never overshoot or wobble on the way in. A touch
        // of rotation banks into the swirl and fades with it.
        const rot = lerp(m.rot0, m.rotRest, settle) + m.rotSwirlAmp * spiralEnvelope * Math.sin(spiralAngle);
        const rotX = lerp(m.rotXStart, 0, settle);
        const rotY = lerp(m.rotYStart, 0, settle);

        const scale = 1 + (m.peak - 1) * (1 - settle) ** m.decayPower;
        const speed = Math.hypot(s.vx, s.vy) + Math.abs(m.spiralSpeed) * spiralRadius;
        const blur = Math.min(8, speed * 0.065) * (1 - smoothstep(0.9, 1, progress));
        const saturate = lerp(1.25, 1, settle);
        const opacity = Math.min(1, localT / 0.18);

        node.style.opacity = String(opacity);
        node.style.filter = blur > 0.02 ? `blur(${blur.toFixed(2)}px) saturate(${saturate.toFixed(3)})` : '';
        node.style.transform =
          `translate(-50%, -50%) translate(${drawX.toFixed(3)}vw, ${drawY.toFixed(3)}vh) ` +
          `rotate(${rot.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) ` +
          `scale(${scale.toFixed(4)})`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, motions]);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playing]);

  return (
    <>
      <div
        className={`h-full min-h-[100dvh] transition-opacity duration-700 ${
          phase === 'done' || phase === 'exiting' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {children}
      </div>

      {showOverlay && (
        <div
          className={`intro-stage fixed inset-0 z-50 overflow-hidden transition-opacity duration-700 ${
            phase === 'exiting' ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          onClick={playing ? finish : undefined}
          role="dialog"
          aria-label="Site introduction"
        >
          <div
            className={`absolute inset-0 transition-colors duration-700 ${
              phase === 'text' ? 'bg-black/50' : 'bg-black/30'
            }`}
          />

          {motes.map((mote) => (
            <span
              key={`dust-${seed}-${mote.id}`}
              className="intro-dust pointer-events-none absolute left-1/2 top-1/2"
              style={{
                width: mote.size,
                height: mote.size,
                background: mote.hue,
                animationDelay: `${mote.delay}s`,
                animationDuration: `${mote.duration}s`,
                ['--dust-x' as string]: mote.x,
                ['--dust-y' as string]: mote.y,
                ['--dust-dx' as string]: mote.dx,
                ['--dust-dy' as string]: mote.dy,
              }}
            />
          ))}

          {naturePhotos.map((photo, i) => {
            const m = motions[i];
            return (
              <div
                key={`${seed}-${photo.src}`}
                ref={(el) => {
                  photoRefs.current[i] = el;
                }}
                className="intro-photo-slot pointer-events-none absolute left-1/2 top-1/2"
                style={{
                  zIndex: m.z,
                  opacity: 0,
                  transform:
                    `translate(-50%, -50%) translate(${m.p0.x}vw, ${m.p0.y}vh) ` +
                    `rotate(${m.rot0}deg) rotateX(${m.rotXStart}deg) rotateY(${m.rotYStart}deg) scale(${m.peak})`,
                }}
              >
                <div
                  className="intro-photo-bob"
                  style={{
                    animationDelay: `${m.delay + m.settleDuration}s`,
                    animationDuration: m.floatDuration,
                    ['--float-x' as string]: m.floatX,
                    ['--float-y' as string]: m.floatY,
                    ['--float-rot' as string]: m.floatRot,
                  }}
                >
                  <img
                    src={photo.src}
                    alt=""
                    style={{
                      width: `${m.width}rem`,
                      objectPosition: photo.position,
                    }}
                    className={`aspect-[4/5] rounded-xl object-cover ring-1 ring-white/15 ${
                      m.standout
                        ? 'shadow-[0_22px_60px_rgba(0,0,0,0.55)]'
                        : 'shadow-[0_14px_36px_rgba(0,0,0,0.4)]'
                    }`}
                  />
                </div>
              </div>
            );
          })}

          <div
            className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ${
              phase === 'text' || phase === 'exiting' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="rounded-3xl bg-black/35 px-6 py-5 backdrop-blur-md sm:px-8 sm:py-6">
              <h1 className="text-3xl font-semibold text-gray-100 sm:text-4xl">
                Hi, I&apos;m Anish!{' '}
                <span className="inline-block animate-[wave_1s_ease-in-out_infinite]">👋</span>
              </h1>
              <p className="mt-3 max-w-md text-sm text-gray-300 sm:text-base">
                Glad you found your way here, thanks for stumbling along! I&apos;m a Computer science student at UT Austin. Currently working on scalable backend systems, agentic AI, and owning products from infra to UI. Feel free to check out my experiences, projects, or anything else. Also, say hi to bubbly!!
              </p>
            </div>
          </div>

          {playing && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finish();
              }}
              className="absolute right-4 top-4 z-30 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-gray-300 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
            >
              Skip
            </button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <button
          type="button"
          onClick={() => play()}
          className="fixed right-4 z-40 inline-flex items-center gap-2 rounded-full border border-gray-600/70 bg-gray-800/80 px-3 py-2 text-xs text-gray-300 shadow-lg backdrop-blur-md transition-colors hover:border-gray-500 hover:text-gray-100 bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
          aria-label="Replay intro animation"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M5 19a8 8 0 0014.14-4.24M19 5A8 8 0 004.86 9.24" />
          </svg>
          Replay intro
        </button>
      )}
    </>
  );
}
