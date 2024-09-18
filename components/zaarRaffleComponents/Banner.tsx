import Image from "next/image";
import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 88)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addLeadingZero = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString();
  };

  return (
    <div className="flex space-x-2 sm:space-x-4 text-xs sm:text-sm md:text-base lg:text-lg font-bold">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center">
          <span className="text-light-green">{addLeadingZero(value)}</span>
          <span className="text-light-gray text-xs uppercase">{interval}</span>
        </div>
      ))}
    </div>
  );
};

const Multiplier: React.FC = () => {
  return (
    <div className="absolute top-10 right-4 z-10">
      <div className="relative group shooting-star-multiplier">
        <span className="spark__container">
          <span className="spark" />
        </span>
        <span className="backdrop" />
        <div className="content bg-gray bg-opacity-80 backdrop-blur-sm px-3 py-1">
          <span className="text-lime-green font-bold text-lg sm:text-xl">
            3x
          </span>
          <span className="ml-1 text-sm text-light-green uppercase tracking-wider">
            Multiplier
          </span>
        </div>
      </div>
    </div>
  );
};

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gray border-l border-t border-r"></div>
      <Image
        src="/zaar-raffle/rolex.jpg"
        alt="Rolex Raffle"
        layout="fill"
        objectFit="cover"
        className="object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/70 to-[#111827]/50"></div>
      <Multiplier />
      <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 md:p-8 text-white z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 shadow-text text-lime-green">
          $10K ROLEX <span className="text-light-green">RAFFLE</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 font-semibold shadow-text text-light-gray">
          WIN A ROLEX WATCH
        </p>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg shadow-text mb-2">
          OCT 1ST, 2024 - OCT 15th, 2024
        </p>
        <CountdownTimer targetDate="2024-10-15T23:59:59" />
      </div>
      <button className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-light-green hover:bg-green-600 text-black uppercase text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-sm font-bold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center">
        Share & Win
        <Image
          src="/zaar-raffle/init.png"
          alt="INIT Logo"
          width={16}
          height={16}
          className="mr-1 ml-1"
        />
        1,000 INIT X
      </button>
    </div>
  );
};

export default Banner;
