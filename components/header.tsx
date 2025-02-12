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
import { client } from "@/client";
import { thirdwebInitiaChain } from "@/thirdweb.config";
import { SideMenuModal } from "./SideMenuModal";

const pageIcons = {
  "/": {
    src: "/Zaar Wordmark-Yellow.png",
    alt: "Zaar Flip Logo",
    width: 500,
    height: 500,
    className: "text-white w-[130px] h-[30px]",
  },
  "/zaar-flip": {
    src: "/logo.png",
    alt: "Zaar Flip Logo",
    width: 500,
    height: 500,
    className: "text-white w-[130px] h-[40px]",
  },
  "/zlinko": {
    src: "/zlinko/zaar-zlinko.png",
    alt: "Zaar Zlinko Logo",
    width: 500,
    height: 500,
    className: "text-white h-[24px] w-[173px]",
  },
  "/zaar-raffle": {
    src: "/zaar-raffle/zaar-raffle.png",
    alt: "Zaar Raffle",
    width: 500,
    height: 500,
    className: "md:ml-4 w-[90px] h-[40px]",
  },
  "/staking": {
    src: "/StakingHero.png",
    alt: "Zaar Staking",
    width: 500,
    height: 500,
    className: "md:ml-4 w-[90px] h-[40px]",
  },
} as const;

type PageIconKey = keyof typeof pageIcons;

export const Header = () => {
  const router = useRouter();
  const [page, setPage] = useState<PageIconKey>("/");

  useEffect(() => {
    const path = router.asPath as PageIconKey;
    // Only update if the path exists in pageIcons
    if (path in pageIcons) {
      setPage(path);
    }
  }, [router.asPath]);

  const currentIcon = pageIcons[page] || pageIcons["/"];

  return (
    <header className="flex flex-row items-center justify-end md:justify-between w-screen  mb-0 relative z-20 px-2 py-2 pr-4 md:pr-8 max-h-[67px]">
      <nav className="hidden  md:flex space-x-8 pl-5 uppercase text-sm ">
        <Link href="/zaar-flip" className="hover:cursor-pointer">
          {page != "/staking" && (
            <Image
              src={currentIcon.src}
              alt={currentIcon.alt}
              width={currentIcon.width}
              height={currentIcon.height}
              className={currentIcon.className}
            />
          )}
        </Link>
      </nav>
      <div className="flex items-center space-x-2 md:space-x-6 md:mr-4">
        <Link href="/faucet">
          <button
            className="h-9 flex items-center px-4 rounded-sm font-medium uppercase gap-2
  bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#BDBDBD]
  text-zinc-800
  shadow-sm
  tracking-wider"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
              <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
            </svg>
            Faucet
          </button>
        </Link>
        <InitiaWallet />
        <SideMenuModal />
      </div>
    </header>
  );
};
