import { useState, useEffect, useRef } from "react";
export const StarField = () => {
  const starfieldRef = useRef(null);
  const shootingStarsRef = useRef(null);

  useEffect(() => {
    const starfield = starfieldRef.current as HTMLElement | null;
    const shootingStars = shootingStarsRef.current as HTMLElement | null;
    interface Star {
      x: number;
      y: number;
    }

    const stars: Star[] = [];

    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "star";

      let x: number, y: number;
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } while (
        stars.some((s) => Math.abs(s.x - x) < 10 && Math.abs(s.y - y) < 10)
      );

      const size = Math.random() * 2 + 1;
      star.style.width = star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;

      star.style.boxShadow = `
        0 0 ${size}px ${size / 2}px rgba(255, 255, 255, 0.5),
        0 0 ${size / 2}px ${size / 4}px #fff,
        ${size / 2}px 0 ${size / 4}px #fff,
        ${-size / 2}px 0 ${size / 4}px #fff,
        0 ${size / 2}px ${size / 4}px #fff,
        0 ${-size / 2}px ${size / 4}px #fff
      `;

      star.style.animation = `twinkle ${Math.random() * 4 + 3}s infinite alternate`;
      if (starfield) {
        starfield.appendChild(star);
      }
      stars.push({ x, y });
    }

    function createShootingStar() {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      shootingStar.style.width = `${Math.random() * 100 + 50}px`;
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 70}%`;
      shootingStars?.appendChild(shootingStar);

      setTimeout(() => {
        shootingStar.remove();
      }, 1000);
    }

    const intervalId = setInterval(
      createShootingStar,
      Math.random() * 3000 + 2000
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="absolute inset-0 w-full h-full z-[-10]">
      <div
        id="starfield"
        ref={starfieldRef}
        className="absolute inset-0 h-full w-full"
      ></div>
      <div
        id="shooting-stars"
        ref={shootingStarsRef}
        className="absolute inset-0 h-full w-full"
      ></div>
    </div>
  );
};
