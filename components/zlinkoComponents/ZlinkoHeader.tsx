import Image from "next/image";
import Link from "next/link";
import React, { use, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ConnectWallet } from "@/components/ConnectWallet";
import { InitiaWallet } from "@/components/InitiaWallet";
import { useWallet } from "@initia/react-wallet-widget/ssr";
import { Web3ModalButton } from "../Web3ModalButton";

export const ZlinkoHeader = () => {
  const router = useRouter();
  const [page, setPage] = useState("/");
  useEffect(() => {
    setPage(router.asPath);
  }, [router.asPath]);

  return (
    <header className="flex flex-row justify-between items-center w-screen  mb-0 relative z-20 px-2 py-2 pr-8 max-h-[57px]">
      <nav className="hidden  md:flex space-x-8 pl-5 uppercase text-sm ">
        <Link href="/zaar-flip" className="hover:cursor-pointer">
          <Image
            src="/zlinko/zaar-zlinko.png"
            alt="Zaar Zlinko Logo"
            width={694}
            height={96}
            className="text-white h-[24px] w-[173px]"
          />
        </Link>
      </nav>

      <div className="flex space-x-4 mr-4">
        <Web3ModalButton />
        {/* <InitiaWallet /> */}
        {/* <ConnectWallet /> */}
      </div>
    </header>
  );
};
