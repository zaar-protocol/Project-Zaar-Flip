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

export const Header = () => {
  const router = useRouter();
  const [page, setPage] = useState("/");
  useEffect(() => {
    setPage(router.asPath);
  }, [router.asPath]);

  return (
    <header className="flex flex-row justify-between w-screen  mb-0 relative z-20 px-2 py-2 pr-8 max-h-[57px]">
      <nav className="hidden  md:flex space-x-8 pl-5 uppercase text-sm ">
        <Link href="/zaar-flip" className="hover:cursor-pointer">
          <Image
            src="/logo.png"
            alt="Zaar Flip Logo"
            width={105}
            height={40}
            className="text-white"
          />
        </Link>

        <Link href="/challenges">
          <div
            className={` ${page == "/challenges" ? " text-white " : " text-gray hover:text-hoveryellow "} py-2`}
          >
            Challenges
          </div>
        </Link>
      </nav>

      <div className="flex space-x-4 mr-4">
        <ConnectButton
          client={client}
          chain={thirdwebInitiaChain}
          accountAbstraction={{ chain: thirdwebInitiaChain, sponsorGas: false }}
        />
        {/* <ThirdWebWallet /> */}
        {/* <Web3ModalButton /> */}
        {/* <InitiaWallet /> */}
        {/* <ConnectWallet /> */}
      </div>
    </header>
  );
};
