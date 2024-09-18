import React from "react";
import Image from "next/image";
import { InitiaWallet } from "../InitiaWallet";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-0 px-4 py-3">
      <div className="flex items-center">
        <Image
          src="/zaar-raffle/zaar-raffle.png"
          alt="Zaar Raffle"
          width={90} // Adjust this value based on your image's dimensions
          height={30} // Adjust this value based on your image's dimensions
          className="md:ml-4"
        />
      </div>
      <InitiaWallet />
    </header>
  );
};

export default Header;
