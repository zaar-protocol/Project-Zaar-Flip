import Image from "next/image";
import Link from "next/link";
import React, { use, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ConnectWallet } from "@/components/ConnectWallet";
import { InitiaWallet } from "@/components/InitiaWallet";
import { useWallet } from "@initia/react-wallet-widget";
import { Web3ModalButton } from "./Web3ModalButton";
import { ThirdWebWallet } from "./ThirdWebWallet";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/pages/client";
import { thirdwebInitiaChain } from "@/thirdweb.config";

export const HomePageModal = () => {
  const router = useRouter();
  const [page, setPage] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setPage(router.asPath);
  }, [router.asPath]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="h-[37px] flex items-center px-4 gap-3 border border-dark-gray-all rounded"
      >
        MENU
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-300 -rotate-90 scale-75`}
        >
          <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
        </svg>
      </button>

      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isMenuOpen && (
          <div
            className="absolute -left-[40px] top-4 bg-black p-3 flex items-center justify-center rounded cursor-pointer z-30"
            onClick={toggleMenu}
          >
            <svg
              stroke="currentColor"
              fill="#E3BF00"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90"
            >
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
            </svg>
          </div>
        )}

        <div className="bg-black flex flex-col items-center py-24 gap-8 h-full text-lg text-[#E3BF00]">
          <Image
            height={200}
            width={200}
            src="/logo-3d.png"
            alt="Zaar 3D Logo"
            className="w-[50px]"
          />
          <Link
            href="/zaar-flip"
            className="hover:cursor-pointer transition duration-300 hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Zaar Flip Logo"
              width={105}
              height={40}
              className="text-white w-[150px]"
            />
          </Link>
          <Link
            href="/zlinko"
            className="hover:cursor-pointer transition duration-300 hover:scale-105"
          >
            <Image
              src="/zlinko/zaar-zlinko.png"
              alt="Zaar Zlinko Logo"
              width={105}
              height={40}
              className="text-white w-[150px]"
            />
          </Link>
          <div className="group hover:cursor-pointer transition duration-300 hover:scale-105 relative">
            <Image
              src="/Zaar-Raffle-Gray.png"
              alt="Zaar Flip Logo"
              width={105}
              height={40}
              className="text-white w-[100px] opacity-80 transition duraction-300 group-hover:opacity-100"
            />
            <div className="absolute left-1 text-center text-base text-gray transition duration-300 opacity-0 group-hover:opacity-100">
              Coming soon
            </div>
          </div>

          <Link
            href="/challenges"
            className="hover:cursor-pointer transition duration-300 hover:text-white"
          >
            CHALLENGES
          </Link>
          <Link
            href="/"
            className="hover:cursor-pointer transition duration-300 hover:text-white"
          >
            BE THE HOUSE
          </Link>
          <Link
            href="/"
            className="hover:cursor-pointer transition duration-300 hover:text-white"
          >
            MIGRATE PRTC
          </Link>
          <Link
            href="/"
            className="hover:cursor-pointer transition duration-300 hover:text-white"
          >
            EARN XP
          </Link>
        </div>
      </div>

      {/* Overlay to close the modal when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};
