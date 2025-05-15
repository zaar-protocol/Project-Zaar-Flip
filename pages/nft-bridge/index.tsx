import { StarField } from "@/components/star-field";
import { Header } from "@/components/header"; // Fixed casing issue
import React, { useEffect, useState } from "react";
import { convertToInitiaAddress } from "@/utils/convertInitiaAddress";
import { useAccount } from "wagmi";
function NftBridge() {
  const { address } = useAccount();
  const [initiaAddress, setInitiaAddress] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    if (address) {
      setInitiaAddress(convertToInitiaAddress(address));
    }
  }, [address]);

  useEffect(() => {
    const getNfts = () => {
      if (!initiaAddress) return;
      fetch(
        `https://api.initia.xyz/indexer/nft/v1/collections/by_account/${initiaAddress}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setNfts(data);
        });
    };
    getNfts();
  }, [initiaAddress]);

  return (
    <div className=" h-screen w-screen overflow-x-hidden no-scrollbar relative flex flex-col items-center justify-start pb-10 ">
      <div className="-mr-8">
        <Header />
      </div>
      <StarField />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-6 space-y-4">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Bridge NFTs to Zaar
          </h1>
          <input
            type="text"
            placeholder="Enter wallet address"
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
          />
          <button className="text-black flex flex-row items-center justify-center space-x-2 px-4 py-2 text-sm rounded-sm font-bold uppercase gradient-button transition duration-500 w-full"></button>
        </div>
      </div>
    </div>
  );
}

export default NftBridge;
