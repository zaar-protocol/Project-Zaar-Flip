"use client";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Header } from "@/components/Header";
import Banner from "@/components/zaarRaffleComponents/Banner";
import RaffleDetails from "@/components/zaarRaffleComponents/RaffleDetails";
import RaffleSteps from "@/components/zaarRaffleComponents/RaffleSteps";
import WatchDetails from "@/components/zaarRaffleComponents/WatchDetails";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-dark-gray p-6 rounded-sm shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-lime-green uppercase">
        Zaar Rolex Raffle: Terms & Conditions
      </h2>
      <ul className="list-disc list-inside space-y-2 text-light-green">
        <li>Event Duration: OCT 1-15, 2024</li>
        <li>Prize: One Rolex watch awarded</li>
        <li>Ticket Policy: Non-refundable</li>
      </ul>
      <p className="mt-4 text-xs text-light-green italic">
        Zaar reserves the right to modify these terms. Participation constitutes
        acceptance of all conditions.
      </p>
    </div>
  );
};

export default function Home() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  const shootingStarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const starfield = starfieldRef.current;
    const shootingStars = shootingStarsRef.current;
    const stars: { x: number; y: number }[] = [];

    if (starfield && shootingStars) {
      const createStar = () => {
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
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
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

        return { element: star, x, y };
      };

      for (let i = 0; i < 50; i++) {
        const { element, x, y } = createStar();
        starfield.appendChild(element);
        stars.push({ x, y });
      }

      const createShootingStar = () => {
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";
        shootingStar.style.width = `${Math.random() * 100 + 50}px`;
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 70}%`;
        shootingStars.appendChild(shootingStar);

        setTimeout(() => {
          shootingStars.removeChild(shootingStar);
        }, 1000);
      };

      const shootingStarInterval = setInterval(
        createShootingStar,
        Math.random() * 3000 + 2000
      );

      return () => {
        clearInterval(shootingStarInterval);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>Zaar Raffle</title>
        <meta name="description" content="Win 4 Rolex watches in August" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-repeat z-0"
          style={{
            backgroundImage: "url('/black-pattern.png')",
            backgroundSize: "auto",
          }}
        ></div>
        <div
          id="starfield"
          ref={starfieldRef}
          className="absolute inset-0 z-10"
        ></div>
        <div
          id="shooting-stars"
          ref={shootingStarsRef}
          className="absolute inset-0 z-20"
        ></div>
        <div className="relative z-30">
          <Header />
          <Banner />
          <main className="container mx-auto px-4 py-8 space-y-8">
            <RaffleDetails />
            <WatchDetails />
            <RaffleSteps />
            <TermsAndConditions />
          </main>
          <footer className="bg-transparent text-white py-4 mt-8">
            <div className="container mx-auto px-4 text-center text-light-green">
              <p>&copy; 2024 Zaar Raffle. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
