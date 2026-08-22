/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { naturePhotos } from '@/lib/photos';

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

function cubicPoint(
  p0: { x: number; y: number },
  c1: { x: number; y: number },
  c2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number,
) {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p3.y,
  };
}

// Number of intermediate keyframe stops (t=1 / rest is handled by the
// final 100% keyframe, so this covers u = 0, 1/18, ..., 17/18). Enough
// points that the linearly-interpolated chords hug the curved path
// instead of visibly cornering through the swirliest part of the flight.
const SAMPLE_STEPS = 18;

function photoMotion(
  photo: (typeof naturePhotos)[number],
  index: number,
  fillIndex: number,
  seed: number,
  compact: boolean,
) {
  const rng = mulberry32(seed * 4243 + index * 917 + 11);
  const standout = Boolean(STANDOUT_LAYOUT[photo.src]);
  const slot = STANDOUT_LAYOUT[photo.src] ?? FILL_SLOTS[fillIndex % FILL_SLOTS.length];
  const fit = compact ? 0.9 : 1;

  const restX = slot.x * fit;
  const restY = slot.y * fit;
  const rotRest = slot.rot + (rng() - 0.5) * 3;
  const p0 = startPoint(rng, restX, restY, compact);
  const rest = { x: restX, y: restY };

  const swirl = (compact ? 46 : 74) + rng() * (compact ? 32 : 52);
  const side = rng() > 0.5 ? 1 : -1;
  const c1 = {
    x: lerp(p0.x, restX, 0.28) + side * swirl * (0.6 + rng()),
    y: lerp(p0.y, restY, 0.18) - swirl * (0.35 + rng() * 0.7),
  };
  const c2 = {
    x: lerp(p0.x, restX, 0.72) - side * swirl * (0.25 + rng() * 0.5),
    y: lerp(p0.y, restY, 0.78) + swirl * (0.15 + rng() * 0.45),
  };

  // The keyframe % stops are evenly spaced in time (see CSS), so the
  // deceleration into rest has to come from how densely we sample the
  // path itself: early equal-time steps cover a lot of path (t), later
  // ones cover very little. That's the only easing applied — segments
  // are interpolated linearly in CSS — so there's one continuous glide
  // instead of every segment re-decelerating on its own.
  // Keep this modest: much above ~1.9 and the path is essentially
  // fully covered by the 80% keyframe, leaving a dead, motionless
  // hold before it "locks in" — which reads as a rigid stop rather
  // than a continuous glide.
  const easePower = 1.15 + rng() * 0.4;

  // Photos start big — like they're already close to the viewer — and
  // shrink smoothly down to their resting size as they swoop in. One
  // monotonic decay curve (no separate "rise" phase), so there's no
  // seam where the scale used to visibly pop.
  const basePeak = compact
    ? (standout ? 2.7 : 2.15)
    : (standout ? 3.9 : 2.9);
  const peak = basePeak + rng() * (compact ? 0.4 : 0.6);
  const decayPower = 1.5 + rng();

  const rot0 = (rng() - 0.5) * 55;

  // Chaotic 3D tumble that levels out as the photo lands, using the
  // `perspective` set on the stage container.
  const rotXStart = (rng() - 0.5) * (compact ? 46 : 78);
  const rotYStart = (rng() - 0.5) * (compact ? 46 : 78);

  const vars: Record<string, string> = {};
  for (let i = 0; i < SAMPLE_STEPS; i += 1) {
    const u = i / SAMPLE_STEPS;
    const t = 1 - (1 - u) ** easePower;
    const pt = cubicPoint(p0, c1, c2, rest, t);
    const scale = 1 + (peak - 1) * (1 - t) ** decayPower;
    const rot = lerp(rot0, rotRest, t);
    const rotX = lerp(rotXStart, 0, t);
    const rotY = lerp(rotYStart, 0, t);

    vars[`--k${i}x`] = `${pt.x}vw`;
    vars[`--k${i}y`] = `${pt.y}vh`;
    vars[`--k${i}r`] = `${rot}deg`;
    vars[`--k${i}rx`] = `${rotX}deg`;
    vars[`--k${i}ry`] = `${rotY}deg`;
    vars[`--k${i}s`] = `${scale}`;
  }

  const width = standout
    ? compact ? 6.8 : 12.4
    : compact ? 5.1 + rng() * 0.4 : 7.5 + rng() * 0.8;

  return {
    restX: `${restX}vw`,
    restY: `${restY}vh`,
    width,
    rotRest,
    delay: rng() < 0.45 ? rng() * 0.22 : 0.16 + rng() * 0.82,
    duration: 1.05 + rng() * 0.8,
    vars,
    standout,
    z: standout ? 11 : 4 + Math.floor(rng() * 5),
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

  const motions = useMemo(() => {
    let fillIndex = 0;
    return naturePhotos.map((photo, i) => {
      const motion = photoMotion(photo, i, fillIndex, seed, compact);
      if (!motion.standout) fillIndex += 1;
      return motion;
    });
  }, [seed, compact]);

  const motes = useMemo(() => dustMotes(seed, compact), [seed, compact]);

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

    const arrivals = motions.map((m) => m.delay + m.duration).sort((a, b) => a - b);
    const textAt = arrivals[Math.floor(arrivals.length * 0.35)] * 1000;
    const doneAt = arrivals[arrivals.length - 1] * 1000 + 2600;

    const textTimer = window.setTimeout(() => setPhase('text'), textAt);
    const doneTimer = window.setTimeout(finish, doneAt);
    return () => {
      window.clearTimeout(textTimer);
      window.clearTimeout(doneTimer);
    };
  }, [phase, motions]);

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
                className="intro-photo-slot is-glide pointer-events-none absolute left-1/2 top-1/2"
                style={{
                  zIndex: m.z,
                  animationDelay: `${m.delay}s`,
                  animationDuration: `${m.duration}s`,
                  ...m.vars,
                  ['--rest-x' as string]: m.restX,
                  ['--rest-y' as string]: m.restY,
                  ['--rot-rest' as string]: `${m.rotRest}deg`,
                } as React.CSSProperties}
              >
                <div
                  className="intro-photo-bob"
                  style={{
                    animationDelay: `${m.delay + 0.4}s`,
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
                I&apos;m a Computer Science student at UT Austin. I&apos;m interested in software
                engineering, agentic AI, AI/ML, and robotics. Feel free to chat with me about my
                experiences, projects, skills, or anything else!
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
