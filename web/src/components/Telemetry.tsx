'use client';

import { useEffect, useRef, useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 1800, className = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime: number | null = null;

          const step = (now: number) => {
            if (!startTime) startTime = now;
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out cubic curve: fast start, soft stop
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Telemetry() {
  const stats = [
    { target: 500, suffix: '+', label: 'Vehicles Delivered Nationwide', highlight: true },
    { target: 200, suffix: '-Pt', label: 'Master Vehicle Inspection', highlight: false },
    { target: 15, suffix: ' Min', label: 'Loan Pre-Approval Time', highlight: true },
    { target: 100, suffix: '%', label: 'Clean Title & Flood-Free', highlight: false },
  ];

  return (
    <section className="px-6 lg:px-12 py-12 bg-black border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-carbon opacity-30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center relative z-10">
        {stats.map((stat, idx) => (
          <div key={stat.label} className="flex-1 flex flex-col md:flex-row items-center w-full">
            <AnimateOnScroll delay={idx * 80} direction="up" className="w-full">
              <p className={`text-4xl lg:text-5xl font-black italic tracking-tight ${stat.highlight ? 'text-red-500' : 'text-white'}`}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase mt-2 tracking-widest font-mono">
                {stat.label}
              </p>
            </AnimateOnScroll>
            {idx < stats.length - 1 && (
              <div className="hidden md:block w-px h-10 bg-white/10 mx-auto"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
