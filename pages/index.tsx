/*
This file displays the migration component. 
It allows users to migrate their PRTC tokens to Zaar tokens.
*/
import Image from "next/image";
import Link from "next/link";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import toast, { Toaster } from "react-hot-toast";
import { formatEther } from "viem";
import React, { useEffect, useState } from "react";
import {
  useSimulateZaarflipFlip,
  useSimulateZaarflipAddAcceptedToken,
} from "@/generated";
import { writeContract } from "@wagmi/core";
import { useWriteZaarflipFlip } from "@/generated";
import { config } from "@/config";
import { abi } from "@/abis/abi";
import { Header } from "@/components/header";
import { HomePageBanner } from "@/components/HomePageBanner";
import { useMuteState } from "@/components/MuteContext";
import { MuteButton } from "@/components/MuteButton";
import { Footer } from "@/components/Footer";

const Home: React.FC = () => {
  const size = "w-[115px] h-[121px]  md:w-[350px] md:h-[350px]";
  const [zlinkoImageSrc, setZlinkoImageSrc] = useState("/zlinko-card.png");
  const [zaarflipImageSrc, setZaarflipImageSrc] =
    useState("/zaarflip-card.png");
  const [blinkerVisible, setBlinkerVisible] = useState(false);
  const { isMuted, toggleMute } = useMuteState();
  const playSound = () => {
    if (isMuted) return;
    const audio = new Audio("/sounds/switchgame.mp3");
    audio.play();
  };
  const [zaarPrice, setZaarPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchZaarPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=protectorate-protocol&vs_currencies=usd",
          {
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": "CG-KFXmN7FmLNDrkFUMpM5xAMCV",
            },
          }
        );
        const data = await response.json();
        setZaarPrice(data["protectorate-protocol"].usd.toFixed(4));
      } catch (error) {
        console.error("Error fetching Zaar price:", error);
      }
    };

    fetchZaarPrice();
    const interval = setInterval(fetchZaarPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkerVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center w-full relative pb-10">
        <Link
          href="https://www.coingecko.com/en/coins/zaar"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4 md:left-4 z-10 "
        >
          <div className="bg-black bg-opacity-50 px-3 py-1 rounded-full">
            <span className="text-yellow hover:text-white font-mono text-sm md:text-base">
              ZAAR: ${zaarPrice || "..."}
            </span>
          </div>
        </Link>
        <Image
          width={1125}
          height={414}
          alt="Zaar Coin Reflection"
          src="/zaar_coin_reflection.png"
          className=" absolute -z-10 top-[180px] w-full left-0 md:top-[290px]   mix-blend-plus-lighter"
        />
        <Image
          width={1125}
          height={414}
          alt="Zaar Coin Reflection"
          src="/zaar_coin_reflection.png"
          className="absolute -z-10 top-[180px] md:top-[290px] w-full left-0 mix-blend-color-dodge"
        />
        <div className={`mt-24 zaar-coin zaar-loading-coin ${size}`}>
          <div className={`zaar-coin-heads ${size}`}></div>
          <div className={`zaar-coin-tails ${size}`}></div>
        </div>

        {/* <Image
          height={800}
          width={800}
          src="/old-zaar-coins/zaar-flip-heads.png"
          alt="Zaar-flip coin"
          className="w-[430px] mt-24"
        /> */}
        <div className="text-[40px] lg:text-[60px] mt-8 font-bold text-white text-center mix-blend-overlay">
          THE FUN NETWORK
        </div>
      </div>
      <div className="flex flex-col w-full items-center text-white text-lg mt-10">
        <div className="flex flex-row items-center justify-start gap-4 tranistion duration-100 ease-in-out w-[250px]">
          Choose your next move
          {blinkerVisible ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 rotate-180 scale-75`}
            >
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
            </svg>
          ) : null}
        </div>

        <div className="flex w-full flew flex-col md:flex-row items-center justify-center gap-10 my-10 ">
          <Link
            href="/zaar-flip"
            className="hover:cursor-pointer "
            onMouseEnter={() => setZaarflipImageSrc("/zaarflip-card-hover.png")}
            onMouseLeave={() => setZaarflipImageSrc("/zaarflip-card.png")}
            onClick={playSound}
          >
            <Image
              src={zaarflipImageSrc}
              alt="Zaar Flip Logo"
              width={500}
              height={1000}
              className="w-[300px]  rounded rounded-md mb-2 text-white "
            />
          </Link>

          {/* <Link
            href="/zlinko"
            className="hover:cursor-pointer transition duration-300  "
            onMouseEnter={() => setZlinkoImageSrc("/zlinko-card-hover.png")}
            onMouseLeave={() => setZlinkoImageSrc("/zlinko-card.png")}
            onClick={playSound}
          > */}
          {/*<Image
                src={zlinkoImageSrc}
                alt="Zaar Zlinko Logo"
                width={500}
                height={500}
                className="text-white w-[300px]"
              />*/}
          <Image
            src="/zlinko-card-disabled.png"
            alt="Zaar Zlinko Logo"
            width={500}
            height={500}
            className="text-white w-[300px]"
          />
          {/* </Link> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
