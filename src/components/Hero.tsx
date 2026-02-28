import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "../data/content";

const photos = [
  { caption: "With my better half", src: "/pics/with-wife.jpg", position: "center" },
  { caption: "Holding Sara for first time", src: "/pics/with-sara.jpg", position: "top" },
  { caption: "Linkedin Pic", src: "/pics/siddesh-solo.jpg", position: "top" },
];

export default function Hero() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const lightboxImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lightbox) return;
    const raf = requestAnimationFrame(() => {
      if (lightboxImgRef.current?.complete && lightboxImgRef.current?.naturalWidth > 0) {
        setImgLoaded(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [lightbox]);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col px-6 bg-slate-900 overflow-hidden"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 opacity-90" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 flex flex-col gap-5 pt-20 pb-8 max-w-5xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Hi, I am Siddhesh Mahadik
          </motion.h1>

          {/* Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.caption}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="flex flex-col gap-2"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-56 rounded-xl object-cover shadow-lg cursor-pointer"
                  style={{ objectPosition: photo.position }}
                  onClick={() => { setImgLoaded(false); setLightbox(photo.src); }}
                />
                <p className="text-white/60 text-sm font-medium text-center">{photo.caption}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-lg text-white/60 font-light tracking-wide"
          >
            {siteContent.tagline}
          </motion.p>

          {/* Bio block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <p className="text-amber-400 font-medium text-sm tracking-[0.2em] uppercase mb-3">
              About Me
            </p>
            <p className="text-white/70 text-sm leading-snug whitespace-pre-line">
              {siteContent.bio}
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="inline-block bg-amber-400 text-slate-900 px-8 py-3.5 rounded font-semibold text-sm tracking-wide hover:bg-amber-300 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="inline-block border border-white/30 text-white px-8 py-3.5 rounded font-medium text-sm tracking-wide hover:border-white/60 hover:bg-white/5 transition-all"
            >
              View Projects
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            {/* Spinner — visible until image loads */}
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
              </div>
            )}

            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: imgLoaded ? 1 : 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={lightbox}
              alt="Full size"
              className="max-h-screen max-w-[90vw] object-contain rounded-lg shadow-2xl"
              ref={lightboxImgRef}
              onLoad={() => setImgLoaded(true)}
              onClick={() => setLightbox(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
