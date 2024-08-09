import Head from "next/head";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { StarField } from "@/components/star-field";
import { Header } from "@/components/header";
import Link from "next/link";
import React from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { FaChevronDown, FaChevronUp, FaBook } from "react-icons/fa";
import useXP from "@/hooks/xpcalcs";
import { getAccount } from "@wagmi/core";
import { config } from "./../../config";
import { FaEthereum } from "react-icons/fa";
import { encode } from "base64-arraybuffer";
import { EventBox } from "@/components/profileComponents/event-box";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState("ALL");
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { xpcalcs } = useXP();
  const [currentVanity, setCurrentVanity] = React.useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState<string>("");
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [currentProfileBanner, setCurrentProfileBanner] = useState<string>("");
  const addr = getAccount(config).address;
  const [history, setHistory] = useState<any[]>([]);
  const [winnings, setWinning] = useState(0);
  const [waged, setWaged] = useState(0);
  const [wins, setWins] = useState<any[]>([]);
  const [losses, setLosses] = useState<any[]>([]);
  useEffect(() => {
    if (!addr) return; // If address is null or undefined, do nothing
    // Fetch profile data and generate profile image
    fetch(`./api/getProfile?ownerAddress=${addr}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.uName) setCurrentVanity(data.uName);
        if (data?.profPicUrl) setCurrentProfileImage(data.profPicUrl);
        if (data?.email) setCurrentEmail(data.email);
        if (data?.bannerPicUrl) setCurrentProfileBanner(data.bannerPicUrl);
        if (data?.winnings) setWinning(data.winnings);
        if (data?.waged) setWaged(data.waged);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
    setLosses([]);
    setWins([]);
    fetch(`./api/getHistory?ownerAddress=${addr}`)
      .then((response) => response.json())
      .then((data) => {
        let newWins = [];
        let newLosses = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].outcome) {
            newWins.push(data[i]);
          } else {
            newLosses.push(data[i]);
          }
        }
        setWins(newWins);
        setLosses(newLosses);
        console.log(data);
        setHistory(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [addr]);
  return (
    <div className="pl-4 h-screen overflow-hidden z-20 no-scrollbar">
      <Header />
      <StarField />
      <div className=" container container-fluid mt-[60px] container-fluid mx-auto py-6 pt-0">
        <div className="bg-transparent text-white min-h-screen">
          <div className="container mx-auto p-4">
            <main className="flex-grow flex flex-col items-center relative    overflow-hidden">
              <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start mb-12">
                <div className="flex items-center mb-6 md:mb-0 md:mr-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mr-4">
                    <Image
                      src={
                        currentProfileImage != ""
                          ? currentProfileImage
                          : "/profile.jpg"
                      }
                      alt="User Avatar"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-light-green">
                      {currentVanity
                        ? currentVanity
                        : addr?.slice(0, 4) + "..." + addr?.slice(-4)}
                    </h1>
                    <button className="btn btn-sm btn-outline bg-neutral-900 font-normal flex items-center mt-2">
                      <span className="text-gray-light">
                        {" "}
                        {currentEmail ? currentEmail : ""}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex-grow w-full md:w-auto">
                  <div className="bg-dark-gray rounded-sm p-6 shadow-xl">
                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-6 text-center">
                      <div className="border-r border-dark-gray-r pb-4 sm:pb-0 last:border-r-0">
                        <p className="text-gray text-sm mb-2">RANK</p>
                        <p className="text-light-green font-bold text-lg sm:text-2xl">
                          #{Math.floor(history?.length / 10) || 1}
                        </p>
                      </div>
                      <div className="border-r border-dark-gray-r pb-4 sm:pb-0 last:border-r-0">
                        <p className="text-gray text-sm mb-2">ROI</p>
                        <p className="text-light-green font-bold text-lg sm:text-2xl">
                          {winnings != 0 && waged != 0
                            ? Math.floor((winnings / waged) * 100)
                            : 0}
                          %
                        </p>
                      </div>
                      <div className="border-r border-dark-gray-r pb-4 sm:pb-0 last:border-r-0">
                        <p className="text-gray text-sm mb-2">PROFIT</p>
                        <p className="text-light-green font-bold text-lg sm:text-2xl">
                          ${winnings - waged}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray text-sm mb-2">XP</p>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/xp.png"
                            alt="XP Icon"
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          <p className="text-light-green font-bold text-lg sm:text-2xl">
                            {" "}
                            {xpcalcs != undefined ? Number(xpcalcs) : Number(0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-5xl mb-8 flex justify-center md:justify-start">
                <button className="bg-light-green text-black px-6 py-2 rounded-sm font-semibold">
                  FLIPS {history?.length || 0}
                </button>
              </div>

              <div className="w-full max-w-5xl mb-8">
                <div className="flex justify-center md:justify-start space-x-4">
                  {["ALL", "WON", "LOST"].map((tab) => (
                    <button
                      key={tab}
                      className={`px-6 py-2 rounded-sm transition-colors ${
                        activeTab === tab
                          ? "bg-dark-gray text-light-green"
                          : "bg-black text-gray hover:bg-zinc-900"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-5xl bg-black border-dark-gray-all p-6 rounded-sm shadow-xl no-scrollbar">
                {activeTab === "ALL" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[250px] overflow-y-scroll no-scrollbar">
                    {history?.map((box) => (
                      <EventBox
                        key={box.id}
                        userName={currentVanity}
                        date={box.createdAt}
                        profPicUrl={
                          currentProfileImage
                            ? currentProfileImage
                            : "/profile.jpg"
                        }
                        wager={box.wager}
                        coinsAmount={box.coins}
                        minHeads={box.minHeads}
                        outcome={box.outcome}
                      />
                    ))}
                  </div>
                ) : activeTab == "WON" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[250px] overflow-y-scroll no-scrollbar">
                    {wins?.map((box) => (
                      <EventBox
                        key={box.id}
                        userName={currentVanity}
                        date={box.createdAt}
                        profPicUrl={
                          currentProfileImage
                            ? currentProfileImage
                            : "/profile.jpg"
                        }
                        wager={box.wager}
                        coinsAmount={box.coins}
                        minHeads={box.minHeads}
                        outcome={box.outcome}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[250px] overflow-y-scroll no-scrollbar">
                    {losses?.map((box) => (
                      <EventBox
                        key={box.id}
                        userName={currentVanity}
                        date={box.createdAt}
                        profPicUrl={
                          currentProfileImage
                            ? currentProfileImage
                            : "/profile.jpg"
                        }
                        wager={box.wager}
                        coinsAmount={box.coins}
                        minHeads={box.minHeads}
                        outcome={box.outcome}
                      />
                    ))}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
