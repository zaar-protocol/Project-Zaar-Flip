import Image from "next/image";
import Link from "next/link";
import React, { use, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ConnectWallet } from "@/components/ConnectWallet";
import { InitiaWallet } from "@/components/InitiaWallet";
import { useWallet } from "@initia/react-wallet-widget";

export const Header = () => {
  const router = useRouter();
  const [page, setPage] = useState("/");
  useEffect(() => {
    setPage(router.asPath);
  }, [router.asPath]);

  return (
    <header className="flex flex-row justify-between items-center w-screen  mb-0 relative z-20 px-2 py-2 pr-8 ">
      <nav className="hidden  md:flex space-x-8 pl-5 uppercase text-sm ">
        <Link href="/" className="hover:cursor-pointer">
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
        <InitiaWallet />
        {/* <ConnectWallet /> */}
      </div>
    </header>
  );
};
