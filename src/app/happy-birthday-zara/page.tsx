"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const memories = [
  { src: "/images/zara/photo1.jpg", alt: "Zara Memory 1", delay: 0.1 },
  { src: "/images/zara/photo2.jpg", alt: "Zara Memory 2", delay: 0.2 },
  { src: "/images/zara/photo3.jpg", alt: "Zara Memory 3", delay: 0.3 },
  { src: "/images/zara/photo4.jpg", alt: "Zara Memory 4", delay: 0.4 },
  { src: "/images/zara/photo5.jpg", alt: "Zara Memory 5", delay: 0.5 },
  { src: "/images/zara/photo6.jpg", alt: "Zara Memory 6", delay: 0.6 },
];

export default function HappyBirthdayZara() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simple confetti effect
    const confetti = async () => {
      const { default: canvasConfetti } = await import("canvas-confetti");
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        canvasConfetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        canvasConfetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    };

    confetti();
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fff0f3] overflow-hidden font-sans selection:bg-rose-200">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-rose-300 to-transparent blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-pink-300 to-transparent blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="heading-serif mb-6 text-5xl font-bold leading-tight text-maroon-deep md:text-7xl lg:text-8xl">
            Happy Birthday, <span className="text-rose-500">Zara ❤️</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-charcoal/80 md:text-2xl">
            To the love of my life, my whole world, the best wife, and the most incredible mother to our two beautiful daughters.
          </p>
          <div className="inline-block rounded-full border-2 border-rose-200 bg-white/50 px-8 py-3 text-rose-600 backdrop-blur-sm">
            <span className="text-sm font-bold uppercase tracking-[0.2em]">November 24th</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-rose-400"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Love Letter Section */}
      <section className="relative z-10 bg-white py-24 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.05)]">
        <div className="container-narrow px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl rounded-3xl bg-rose-50/50 p-8 shadow-sm ring-1 ring-rose-100 md:p-14"
          >
            <h2 className="heading-serif mb-6 text-3xl font-semibold text-maroon-deep md:text-4xl">
              My Everything
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-charcoal/80">
              <p>
                My dearest Zara, words can never truly express how much you mean to me. From the moment you walked into my life, you have filled it with light, joy, and endless love.
              </p>
              <p>
                You have transformed my world and, in the process, transformed me. I have always lived with a pure heart and good intentions, but the gentle, patient way you handle my flaws and little habits is truly remarkable. You didn't just accept me; you nurtured my soul and brought out the absolute best version of the man I was always meant to be.
              </p>
              <p>
                You are not just the best wife a man could ask for, but the most loving and caring mother to our two precious daughters. Seeing you with them makes me fall in love with you all over again, every single day.
              </p>
              <p>
                Today is all about you. I want to celebrate the beautiful soul you are, the warmth you bring to our home, and the love that holds our family together. 
              </p>
              <p className="font-semibold text-rose-500">
                I love you more than words can say. Happy Birthday, my beautiful Zara!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Memory Lane Gallery */}
      <section className="bg-[#fff0f3] py-24">
        <div className="container px-4">
          <div className="mb-16 text-center">
            <h2 className="heading-serif mb-4 text-4xl font-semibold text-maroon-deep md:text-5xl">
              Our Beautiful Memories
            </h2>
            <p className="text-charcoal/60">A glimpse into our forever together.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {memories.map((memory, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: memory.delay }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-rose-100 shadow-sm"
              >
                <Image
                  src={memory.src}
                  alt={memory.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-serif text-xl text-white">Forever ❤️</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer message */}
      <section className="bg-maroon py-16 text-center">
        <h3 className="heading-serif text-3xl font-medium text-white md:text-4xl">
          To many more birthdays together.
        </h3>
        <p className="mt-4 text-rose-200">Yours forever.</p>
      </section>
    </div>
  );
}
