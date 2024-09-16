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
import { HomePageModal } from "./HomePageModal";

export const HomePageBanner = () => {
  const router = useRouter();
  const [page, setPage] = useState("/");
  useEffect(() => {
    setPage(router.asPath);
  }, [router.asPath]);

  return (
    <header className="flex flex-row justify-end w-screen  mb-0 relative z-20 px-2 py-2 pr-8 max-h-[57px]">
      <div className="flex gap-5 space-x-4 mr-4 relative">
        {/* <ConnectButton
          client={client}
          chain={thirdwebInitiaChain}
          accountAbstraction={{ chain: thirdwebInitiaChain, sponsorGas: false }}
        /> */}

        {/* <ThirdWebWallet /> */}
        {/* <Web3ModalButton /> */}
        <InitiaWallet />
        {/* <ConnectWallet /> */}
        <HomePageModal />
      </div>
    </header>
  );
};
