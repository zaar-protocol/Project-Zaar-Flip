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
import { SideMenuModal } from "./SideMenuModal";

const pageIcons = {
  "/": {
    src: "/logo-3d.png",
    alt: "Zaar Flip Logo",
    width: 1696,
    height: 1769,
    className: "text-white w-[50px] h-[50px]",
  },
  "/zaar-flip": {
    src: "/logo.png",
    alt: "Zaar Flip Logo",
    width: 105,
    height: 40,
    className: "text-white",
  },
  "/zlinko": {
    src: "/zlinko/zaar-zlinko.png",
    alt: "Zaar Zlinko Logo",
    width: 694,
    height: 96,
    className: "text-white h-[24px] w-[173px]",
  },
  "/zaar-raffle": {
    src: "/zaar-raffle/zaar-raffle.png",
    alt: "Zaar Raffle",
    width: 90,
    height: 30,
    className: "md:ml-4",
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
    <header className="flex flex-row items-center justify-between w-screen  mb-0 relative z-20 px-2 py-2 pr-8 max-h-[67px]">
      <nav className="hidden  md:flex space-x-8 pl-5 uppercase text-sm ">
        <Link href="/zaar-flip" className="hover:cursor-pointer">
          <Image
            src={currentIcon.src}
            alt={currentIcon.alt}
            width={currentIcon.width}
            height={currentIcon.height}
            className={currentIcon.className}
          />
        </Link>
      </nav>

      <div className="flex items-center space-x-4 mr-4">
        {/* <ConnectButton
          client={client}
          chain={thirdwebInitiaChain}
          accountAbstraction={{ chain: thirdwebInitiaChain, sponsorGas: false }}
        /> */}
        {/* <ThirdWebWallet /> */}
        {/* <Web3ModalButton /> */}
        <InitiaWallet />
        {/* <ConnectWallet /> */}
        <SideMenuModal />
      </div>
    </header>
  );
};
