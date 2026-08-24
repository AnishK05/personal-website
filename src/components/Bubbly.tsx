'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useIntroActive } from '@/components/BubblyContext';
import { requestScheduleMeeting } from '@/lib/scheduleRequest';

// Anish's little roaming AI helper — a floating circle with a face. Shown
// on every page except the intro (handled via BubblyContext) and any page
// not listed here (e.g. /private).
//
// Click behavior: a click always shows a short note about the page.
// Double-clicking asks the real chat to schedule a meeting with Anish, but
// only on the chat page itself ('/') — on every other page, double-click
// does nothing.
const PAGE_INFO: Record<string, string> = {
  '/': 'This is where you can chat with Anish, just type in the message bar below. Double click me to book a meeting with Anish.',
  '/experience': "This is where you can see Anish's work experience.",
  '/projects': "This is where you can see Anish's projects and publications.",
  '/skills': "This is where you can see Anish's skills.",
  '/leadership': "This is where you can see Anish's leadership and awards.",
  '/about': "This is where you can see Anish's background and contact info.",
};

const IDLE_PROMPTS = ['click me!', "Hi, I'm bubbly!"] as const;

const SPHERE = 56;
const RADIUS = SPHERE / 2;

// Bubbles rise from a fixed spot near the bottom of the sphere as it swims.
const BUBBLE_LOCAL_X = 0;
const BUBBLE_LOCAL_Y = RADIUS - 6;

type BubbleParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
  duration: number;
};

export default function Bubbly() {
  const pathname = usePathname();
  const introActive = useIntroActive();
  const message = pathname ? PAGE_INFO[pathname] : undefined;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const boosterMountRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [prompt, setPrompt] = useState<'none' | 'idle' | 'message'>('none');
  const [idleText, setIdleText] = useState<(typeof IDLE_PROMPTS)[number]>('click me!');
  const [bubbles, setBubbles] = useState<BubbleParticle[]>([]);
  const [boosting, setBoosting] = useState(false);

  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const directionRef = useRef<1 | -1>(1);
  const boostingRef = useRef(false);
  // Heading the booster (and its bubble stream) trails from — only updated
  // while boosting, and only when moving fast enough for the direction to
  // be meaningful, so it doesn't jitter at low speed.
  const boostHeadingRef = useRef(0);
  const bubbleIdRef = useRef(0);
  const messageHideTimer = useRef(0);

  // Sweeps fully to one edge, then flips and sweeps fully to the other —
  // a clean right-to-left / left-to-right pattern rather than random hops.
  const setTargetForDirection = useCallback(() => {
    const marginX = 70;
    const marginTop = 110; // leave room for the speech bubble above
    const marginBottom = 70;
    const w = window.innerWidth;
    const h = window.innerHeight;
    targetRef.current = {
      x: directionRef.current === 1 ? w - marginX : marginX,
      y: marginTop + Math.random() * Math.max(1, h - marginTop - marginBottom),
    };
  }, []);

  // Swim loop: cruise toward the current edge target, flip direction on
  // arrival, wiggle a little for a curvy path.
  useEffect(() => {
    if (!message) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    posRef.current = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.6 };
    directionRef.current = Math.random() < 0.5 ? 1 : -1;
    setTargetForDirection();
    setReady(true);

    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${posRef.current.x - RADIUS}px, ${posRef.current.y - RADIUS}px)`;
    }

    if (reduceMotion) return;

    let raf = 0;
    let last = performance.now();

    const CRUISE = 52; // px/s
    const BOOST_CRUISE = 320; // px/s, during a "lock in" burst
    const TURN = 1.8;
    const BOOST_TURN = 3.4;
    const ARRIVE = 30;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const p = posRef.current;
      const v = velRef.current;
      const t = targetRef.current;
      const boost = boostingRef.current;

      const dx = t.x - p.x;
      const dy = t.y - p.y;
      const dist = Math.hypot(dx, dy);

      if (dist < ARRIVE) {
        directionRef.current = directionRef.current === 1 ? -1 : 1;
        setTargetForDirection();
      }

      if (dist > 4) {
        const cruise = boost ? BOOST_CRUISE : CRUISE;
        const turn = boost ? BOOST_TURN : TURN;
        const desiredVx = (dx / dist) * cruise;
        const desiredVy = (dy / dist) * cruise;
        v.vx += (desiredVx - v.vx) * Math.min(1, turn * dt);
        v.vy += (desiredVy - v.vy) * Math.min(1, turn * dt);
      } else {
        v.vx *= 0.9;
        v.vy *= 0.9;
      }

      // A gentle sideways wiggle so the path curves like actual swimming
      // instead of beelining straight at each waypoint — wider and wilder
      // during a boost.
      const wiggle = Math.sin(now / 420) * (boost ? 24 : 10);
      const speed = Math.hypot(v.vx, v.vy) || 1;
      const px = -v.vy / speed;
      const py = v.vx / speed;

      p.x += (v.vx + px * wiggle) * dt;
      p.y += (v.vy + py * wiggle) * dt;

      const w = window.innerWidth;
      const h = window.innerHeight;
      p.x = Math.min(Math.max(p.x, RADIUS + 10), w - RADIUS - 10);
      p.y = Math.min(Math.max(p.y, RADIUS + 30), h - RADIUS - 20);

      // Re-read the ref every frame rather than capturing it once — if the
      // container node is ever swapped (e.g. a remount from the
      // intro-visibility toggle), a stale captured node would keep getting
      // moved off-screen invisibly while the real, currently rendered
      // sphere sits frozen at its default position.
      const node = containerRef.current;
      if (node) {
        node.style.transform = `translate(${(p.x - RADIUS).toFixed(1)}px, ${(p.y - RADIUS).toFixed(1)}px)`;
      }

      // Aim the booster opposite the direction of travel, so it trails
      // behind Bubbly like a real thruster instead of always pointing down.
      if (boost) {
        if (speed > 5) boostHeadingRef.current = Math.atan2(v.vy, v.vx);
        const mountNode = boosterMountRef.current;
        if (mountNode) {
          const deg = ((boostHeadingRef.current + Math.PI) * 180) / Math.PI;
          mountNode.style.transform = `rotate(${deg.toFixed(1)}deg)`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [message, setTargetForDirection]);

  // Spawns one bubble — from the fixed belly spot normally, or from the
  // booster's trailing point (with some angular spread) while boosting.
  // Shared by the ambient trickle below and the fast boost stream.
  const spawnBubble = useCallback(() => {
    const p = posRef.current;
    const boost = boostingRef.current;

    let x: number;
    let y: number;
    if (boost) {
      const angle = boostHeadingRef.current + Math.PI;
      const spread = (Math.random() - 0.5) * 0.9; // radians, widens the stream
      x = p.x + Math.cos(angle + spread) * (RADIUS + 8);
      y = p.y + Math.sin(angle + spread) * (RADIUS + 8);
    } else {
      x = p.x + BUBBLE_LOCAL_X;
      y = p.y + BUBBLE_LOCAL_Y;
    }

    const id = bubbleIdRef.current++;
    const size = boost ? 3 + Math.random() * 7 : 4 + Math.random() * 6;
    const dx = (Math.random() - 0.5) * (boost ? 70 : 30);
    const dy = boost ? -(20 + Math.random() * 90) : -(30 + Math.random() * 34);
    const duration = boost ? 0.7 + Math.random() * 0.7 : 1.4 + Math.random() * 1.1;

    setBubbles((prev) => [...prev.slice(-249), { id, x, y, size, dx, dy, duration }]);
    window.setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, duration * 1000);
  }, []);

  // Ambient bubble trickle while swimming normally.
  useEffect(() => {
    if (!message) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const spawn = window.setInterval(spawnBubble, 130);
    return () => window.clearInterval(spawn);
  }, [message, spawnBubble]);

  // "Lock in" moments: every so often, Bubbly fires its booster and zooms
  // around at full speed for a couple seconds, then settles back down.
  // TEMP: fixed cadence to make it easy to eyeball while tuning — swap
  // BOOST_EVERY_MS back to a randomized range once it feels right.
  useEffect(() => {
    if (!message) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const BOOST_EVERY_MS = 30000;
    const BOOST_STREAM_INTERVAL_MS = 10; // extra dense bubble stream while boosting
    const BOOST_STREAM_PER_TICK = 3; // bubbles spawned each stream tick

    let burstTimer = 0;
    let endTimer = 0;
    let streamInterval = 0;

    const scheduleBurst = () => {
      burstTimer = window.setTimeout(() => {
        boostingRef.current = true;
        setBoosting(true);
        streamInterval = window.setInterval(() => {
          for (let i = 0; i < BOOST_STREAM_PER_TICK; i += 1) spawnBubble();
        }, BOOST_STREAM_INTERVAL_MS);

        const duration = 1800 + Math.random() * 900;
        endTimer = window.setTimeout(() => {
          boostingRef.current = false;
          setBoosting(false);
          window.clearInterval(streamInterval);
          scheduleBurst();
        }, duration);
      }, BOOST_EVERY_MS);
    };

    scheduleBurst();
    return () => {
      window.clearTimeout(burstTimer);
      window.clearTimeout(endTimer);
      window.clearInterval(streamInterval);
      boostingRef.current = false;
    };
  }, [message, spawnBubble]);

  // Every so often, say hello or invite a click — unless a message is already showing.
  useEffect(() => {
    if (!message) return;
    let cycleTimer = 0;
    let hideTimer = 0;

    const scheduleIdlePrompt = () => {
      cycleTimer = window.setTimeout(() => {
        const next = IDLE_PROMPTS[Math.floor(Math.random() * IDLE_PROMPTS.length)];
        setIdleText(next);
        setPrompt((current) => (current === 'none' ? 'idle' : current));
        hideTimer = window.setTimeout(() => {
          setPrompt((current) => (current === 'idle' ? 'none' : current));
          scheduleIdlePrompt();
        }, 4200);
      }, 14000 + Math.random() * 12000);
    };

    scheduleIdlePrompt();
    return () => {
      window.clearTimeout(cycleTimer);
      window.clearTimeout(hideTimer);
    };
  }, [message]);

  // Bubbly is a single global instance, not remounted per page — clear any
  // message left showing from the previous page on every navigation.
  useEffect(() => {
    window.clearTimeout(messageHideTimer.current);
    setPrompt('none');
  }, [pathname]);

  const handleClick = () => {
    setPrompt('message');
    window.clearTimeout(messageHideTimer.current);
    messageHideTimer.current = window.setTimeout(() => {
      setPrompt((current) => (current === 'message' ? 'none' : current));
    }, 6000);
  };

  // Real double-click only — the browser's own dblclick timing window means
  // two separate, slower clicks over a few seconds never trigger this.
  const handleDoubleClick = () => {
    if (pathname !== '/') return;
    requestScheduleMeeting();
  };

  useEffect(() => () => window.clearTimeout(messageHideTimer.current), []);

  if (!message || introActive) return null;

  return (
    <>
      <div
        ref={containerRef}
        className={`fixed left-0 top-0 z-[45] h-14 w-14 transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      >
        {(prompt === 'idle' || prompt === 'message') && (
          <div
            key={prompt === 'message' ? message : idleText}
            className="bubbly-pop bubbly-speech pointer-events-none absolute left-1/2 bottom-full mb-1 w-max max-w-[190px] -translate-x-1/2 rounded-2xl px-3 py-2 text-center text-xs font-medium shadow-lg backdrop-blur-sm"
          >
            {prompt === 'idle' ? idleText : message}
          </div>
        )}

        <div ref={boosterMountRef} className="bubbly-booster-mount pointer-events-none absolute">
          <div className={`bubbly-booster-flame ${boosting ? 'bubbly-booster-flame-active' : ''}`} />
        </div>

        <button
          type="button"
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          aria-label="Bubbly, Anish's little AI helper"
          className={`bubbly-sphere relative h-14 w-14 cursor-pointer rounded-full ${boosting ? '' : 'bubbly-bob'}`}
        >
          <svg viewBox="0 0 56 56" className="pointer-events-none absolute inset-0 h-full w-full">
            {boosting ? (
              <>
                {/* Furrowed eyebrows, angled down toward the nose bridge */}
                <rect x="15.5" y="16.6" width="10" height="2.6" rx="1.3" fill="#1b2636" transform="rotate(14 20.5 17.9)" />
                <rect x="30.5" y="16.6" width="10" height="2.6" rx="1.3" fill="#1b2636" transform="rotate(-14 35.5 17.9)" />
                {/* Squinted, determined eyes */}
                <rect x="16.5" y="21.4" width="9" height="3.2" rx="1.6" fill="#1b2636" transform="rotate(-18 21 23)" />
                <rect x="30.5" y="21.4" width="9" height="3.2" rx="1.6" fill="#1b2636" transform="rotate(18 35 23)" />
                {/* Flat, tense mouth */}
                <rect x="21" y="31.4" width="14" height="2.4" rx="1.2" fill="#1b2636" />
              </>
            ) : (
              <>
                <g className="bubbly-eye bubbly-eye-left">
                  <g className="bubbly-pupil">
                    <ellipse cx="21" cy="23" rx="4.4" ry="5.2" fill="#1b2636" />
                    <circle cx="19.3" cy="21" r="1.3" fill="#fff" />
                    <circle cx="22.6" cy="24.6" r="0.5" fill="#fff" opacity="0.85" />
                  </g>
                </g>
                <g className="bubbly-eye bubbly-eye-right">
                  <g className="bubbly-pupil">
                    <ellipse cx="35" cy="23" rx="4.4" ry="5.2" fill="#1b2636" />
                    <circle cx="33.3" cy="21" r="1.3" fill="#fff" />
                    <circle cx="36.6" cy="24.6" r="0.5" fill="#fff" opacity="0.85" />
                  </g>
                </g>
                <path d="M20 34c2.2 3.4 13.8 3.4 16 0" stroke="#1e2a3a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </>
            )}
          </svg>
        </button>
      </div>

      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubbly-bubble pointer-events-none fixed z-[44] rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            ['--bubbly-dx' as string]: `${b.dx}px`,
            ['--bubbly-dy' as string]: `${b.dy}px`,
          }}
        />
      ))}
    </>
  );
}
