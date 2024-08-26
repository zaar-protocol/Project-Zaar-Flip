"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef, use } from "react";
import {
  updateCoinsDisplay,
  updateWinChance,
  updatePotentialWin,
  randomFlip,
  flipCoins,
  WinChanceType,
} from "../components/zaarFlipUtils";
import { ConnectWallet } from "../components/ConnectWallet";
import toast, { Toaster } from "react-hot-toast";
import { StarField } from "@/components/star-field";
import { Header } from "@/components/header";
import { config } from "@/config";
import { getAccount } from "@wagmi/core";
import { createConfetti } from "@/components/confetti";
import { Tooltip } from "@/components/tooltip";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import {
  useSimulateZaarflipFlip,
  useWriteZaarflipFlip,
  useSimulateInitiaTokenApprove,
  useSimulateZaarflipAddAcceptedToken,
} from "@/generated";
import { writeContract } from "@wagmi/core";
import { waitForTransactionReceipt } from "@wagmi/core";

export default function Home() {
  const [currentSide, setCurrentSide] = useState("heads");
  const [coinsAmount, setCoinsAmount] = useState(1);
  const [minHeadsTails, setMinHeadsTails] = useState(1);
  const [wager, setWager] = useState(1.0);
  const [potentialWin, setPotentialWin] = useState(1.96);
  const [winChance, setWinChance] = useState<WinChanceType>({
    toWin: 1,
    chance: 50.0,
  });
  const coinsDisplayRef = useRef(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [wagerDropdown, setWagerDropdown] = useState(false);
  const [presetDropdown, setPresetDropdown] = useState(false);
  const [presetSelection, setPresetSelection] = useState("1 : 1 (x1.96)");
  const tokenAddress = "0xd5dedc655a3000df6318151940b3311f7a4cc931";
  //get prepared function to flip
  const { data: flip }: { data: any } = useSimulateZaarflipFlip({
    args: [
      BigInt(wager ? wager : 0),
      BigInt(coinsAmount),
      BigInt(minHeadsTails),
      tokenAddress,
    ],
  });

  const { data: addToken }: { data: any } = useSimulateZaarflipAddAcceptedToken(
    {
      args: [tokenAddress],
    }
  );

  async function flipContract() {
    const toastId = toast.loading("Waiting on confirmation from your wallet.");

    try {
      let myhash = await writeContract(config, flip!.request);
      toast.dismiss(toastId);
      toast.loading("Transaction Processing");
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      console.log("Receipt: ", receipt);
      toast.dismiss();
    } catch (error) {
      console.error("Error executing write: ", error);
      toast.dismiss();
    }
    return;
  }

  const wagerPresets = [10, 50, 100, 500, 1000, 5000];

  useEffect(() => {
    updateAll();
  }, [coinsAmount, minHeadsTails, wager]);

  function updateAll() {
    if (coinsDisplayRef.current) {
      updateCoinsDisplay(
        coinsDisplayRef.current,
        coinsAmount,
        minHeadsTails,
        currentSide
      );
    }
    setWinChance(updateWinChance(coinsAmount, minHeadsTails));
    setPotentialWin(
      Number(updatePotentialWin(coinsAmount, minHeadsTails, wager))
    );
  }

  function handlePresetChange(input: string) {
    const [coins, minHeadsTails] = input.split(":");
    setCoinsAmount(parseInt(coins));
    setMinHeadsTails(parseInt(minHeadsTails));
    if (parseInt(minHeadsTails) > parseInt(coins)) {
      setCoinsAmount(parseInt(minHeadsTails));
    }
  }

  function handleWagerChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace("$", "");
    value = parseFloat(value).toFixed(2);
    setWager(parseFloat(value));
  }

  function handleHalfWager() {
    setWager((prevWager) => parseFloat((prevWager / 2).toFixed(2)));
  }

  function handleDoubleWager() {
    setWager((prevWager) => parseFloat((prevWager * 2).toFixed(2)));
  }

  function handleSideChange(side: string) {
    if (currentSide !== side && coinsDisplayRef.current) {
      setCurrentSide(side);
      flipCoins(coinsDisplayRef.current, minHeadsTails, side, true);
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setWagerDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (minHeadsTails > coinsAmount) {
      setCoinsAmount(minHeadsTails);
    }
  }, [minHeadsTails]);

  // Ensure minHeadsTails is always <= coinsAmount
  useEffect(() => {
    if (coinsAmount < minHeadsTails) {
      setMinHeadsTails(coinsAmount);
    }
  }, [coinsAmount]);

  const { data: approve }: { data: any } = useSimulateInitiaTokenApprove({
    args: ["0xE161Ff5fDC157fb69B1c6459c9aac7E6CcCdbfCA", BigInt(1)],
  });
  const [okToApprove, setOkToApprove] = useState(false);
  useEffect(() => {
    if (approve?.request || false) {
      setOkToApprove(true);
    } else {
      setOkToApprove(false);
    }
  }, [approve?.request]);

  //creating a Write contract to use our prepared functions

  async function flipCoin() {
    const flipSound = new Audio("/coin-flip-sound.mp3"); // Make sure to add this sound file to your public folder
    //flipSound.play();
    //approver();
    await flipContract();
    const addr = getAccount(config).address;
    fetch(
      `./api/addEvent?ownerAddress=${addr}&coins=5&winnings=100&wager=1000&outcome=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        toast.success("Congratulations you won!");
        createConfetti();
      });
  }

  return (
    <div className=" min-h-screen w-screen overflow-x-hidden overflow-y-hidden relative flex flex-col items-center justify-start ">
      <Head>
        <title>Zaar Flip</title>
        <meta
          name="description"
          content="A first-in-class NFT trading platform for traders of every caliber."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <div className="-mr-8">
        <Header />
      </div>
      <StarField />

      <div
        id="planet"
        className="hidden absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-300 opacity-20"
      ></div>
      <div className="hidden absolute bottom-0 left-0 w-64 h-64 flex items-center justify-center">
        <Image
          src="/logo-3d.png"
          alt="Logo"
          width={160}
          height={160}
          className="w-[100px] h-[100px]  object-contain z-50 opacity-40 bg-red-400"
        />
      </div>
      <div className="container container-fluid  w-screen h-[800px] items-center justify-center relative z-10">
        <main className="contiainer w-full  h-full flex flex-col justify-center relative z-20">
          <div className="  flex flex-col h-[300px] items-center justify-center">
            <div
              id="coins-display"
              ref={coinsDisplayRef}
              className="bg-white absolute top-200 bg-whitish w-full h-[360px] flex items-center justify-center mb-2"
            >
              {/* Coins will be dynamically added here */}
            </div>

            <div className="text-yellow mb-2 mt-4">
              <span className="text-md mr-2">
                {winChance.toWin} OR MORE TO WIN
              </span>
              <span className="text-light-gray">
                {winChance.chance}% CHANCE
              </span>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden space-y-3 w-full px-4">
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <div className="text-light-green mb-1 text-sm">PICK SIDE:</div>
                <div className="flex space-x-4">
                  <div
                    onClick={() => handleSideChange("heads")}
                    className={`coin-side ${currentSide === "heads" ? "selected" : ""}`}
                  >
                    <Image
                      src="/zaar-flip-heads.png"
                      alt="Heads"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                    />
                  </div>
                  <div
                    onClick={() => handleSideChange("tails")}
                    className={`coin-side ${currentSide === "tails" ? "selected" : ""}`}
                  >
                    <Image
                      src="/zaar-flip-tails.png"
                      alt="Tails"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <button
                  onClick={() => {
                    if (coinsDisplayRef.current) {
                      flipCoins(
                        coinsDisplayRef.current,
                        minHeadsTails,
                        currentSide,
                        true
                      );
                    }
                  }}
                  className="gradient-button text-black px-6 py-2  hover:-translate-y-1 transition duration-700 ease-in-out rounded-sm font-bold mt-3 mx-auto block text-sm uppercase transition duration-700 ease-in-out"
                >
                  FLIP COIN - ${wager.toFixed(2)}
                </button>
              </div>
            </div>
            <div>
              <div className="text-light-green mb-1 text-sm">WAGER</div>
              <div className="wager-container bg-dark-gray text-light-green rounded-sm p-2 flex items-center justify-between h-10 focus-within:ring-1 focus-within:ring-yellow-400">
                <div className="flex items-center">
                  <Image
                    src="/zaar-flip-heads.png"
                    alt="Coin"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={`$${wager.toFixed(2)}`}
                    className="wager-input bg-transparent w-24 text-left pl-2 h-8 text-sm focus:outline-none"
                    onChange={handleWagerChange}
                  />
                </div>
                <div className="flex">
                  <button
                    onClick={handleHalfWager}
                    className="wager-button hover:bg-gray hover:bg-lightGray px-2 py-1 rounded-sm h-8 text-sm mr-3"
                  >
                    1/2
                  </button>
                  <button
                    onClick={handleDoubleWager}
                    className="wager-button hover:bg-gray hover:bg-lightGray px-2 py-1 rounded-sm h-8 text-sm"
                  >
                    x2
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="text-light-green mb-1 text-sm">
                POTENTIAL TO WIN
              </div>
              <div className="bg-gray rounded-sm p-2 text-lime-green h-10 flex items-center text-sm">
                ${potentialWin}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <div className="text-light-green mb-1 text-sm">
                  COINS AMOUNT
                </div>
                <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                  <div className="text-light-green text-center mr-2 text-sm">
                    x
                  </div>
                  <div className="text-light-green text-center mr-5 text-sm">
                    {coinsAmount}
                  </div>
                  <input
                    id="coinsAmount"
                    type="range"
                    min="1"
                    max="10"
                    value={coinsAmount}
                    className="slider coins-amount w-full h-4"
                    onChange={(e) => {
                      setCoinsAmount(parseInt(e.target.value));
                    }}
                    style={{
                      background: `linear-gradient(to right, green, yellow, orange, red)`,
                    }}
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="text-light-green mb-1 text-sm flex items-center">
                  MIN HEADS / TAILS
                </div>
                <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                  <div className="text-light-green text-center mr-2 text-sm">
                    x
                  </div>
                  <div className="text-light-green text-center mr-5 text-sm">
                    {minHeadsTails}
                  </div>
                  <input
                    id="minHeadsTails"
                    type="range"
                    min="1"
                    max="10"
                    value={minHeadsTails}
                    className="slider min-heads-tails w-full h-4"
                    onChange={(e) => {
                      setMinHeadsTails(parseInt(e.target.value));
                    }}
                    style={{
                      background: `linear-gradient(to right, green, yellow, orange, red)`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-light-green mb-1 text-sm  flex items-center ">
                PRESETS
              </div>

              <div className="z-40 relative flex flex-col flex-grow text-light-green rounded-sm w-full h-10 text-sm focus:outline-none focus:border focus:border-yellow-400">
                <div
                  className={`${presetDropdown ? "border-light-gray-all" : " "} flex flex-row justify-between bg-dark-gray items-center w-full text-light-green h-10 px-2`}
                  onClick={() => {
                    setPresetDropdown(!presetDropdown);
                  }}
                >
                  {presetSelection}
                  {presetDropdown ? <FaChevronDown /> : <FaChevronUp />}
                </div>
                <div className="absolute flex flex-col w-full mt-10 flex flex-grow">
                  <div
                    onClick={() => {
                      handlePresetChange("10:5:1.57");
                      setPresetSelection("10 : 5 (x1.57)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "10 : 5 (x1.57)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    10 : 5 (x1.57)
                  </div>
                  <div
                    onClick={() => {
                      handlePresetChange("4:3:3.14");
                      setPresetSelection("4 : 3 (x3.14)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "4 : 3 (x3.14)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    4 : 3 (x3.14)
                  </div>
                  <div
                    onClick={() => {
                      handlePresetChange("6:5:8.96");
                      setPresetSelection("6 : 5 (x8.96)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "6 : 5 (x8.96)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    6 : 5 (x8.96)
                  </div>
                  <div
                    onClick={() => {
                      handlePresetChange("9:8:50.8");
                      setPresetSelection("9 : 8 (x50.8)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "9 : 8 (x50.8)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    9 : 8 (x50.8)
                  </div>
                  <div
                    onClick={() => {
                      handlePresetChange("10:10:1003.52");
                      setPresetSelection("10 : 10 (x1003.52)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "10 : 10 (x1003.52)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    10 : 10 (x1003.52)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-4 h-50">
            <div className="space-y-3">
              <div>
                <div className="text-light-green mb-1 text-sm flex items-center">
                  COINS AMOUNT
                  <Tooltip
                    text={
                      "This determines how many virtual coins you are flipping in one game. You can choose from 1 to 10 coins."
                    }
                  />
                </div>
                <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                  <div className="text-light-green text-center mr-2 text-sm">
                    x
                  </div>
                  <div className="text-light-green text-center mr-5 text-sm">
                    {coinsAmount}
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={coinsAmount}
                    className="slider coins-amount w-full h-4"
                    onChange={(e) => setCoinsAmount(parseInt(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, green, yellow, orange, red)`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="text-light-green mb-1 text-sm mt-6">
                  MIN HEADS / TAILS
                  <Tooltip
                    text={
                      "This sets the minimum number of heads (or tails, depending on your chosen side) you need to win. For example, if you set this to 3 with 5 coins, you'd need at least 3 out of 5 coins to land on your chosen side to win."
                    }
                  />
                </div>

                <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                  <div className="text-light-green text-center mr-2 text-sm">
                    x
                  </div>
                  <div className="text-light-green text-center mr-5 text-sm">
                    {minHeadsTails}
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={minHeadsTails}
                    className="slider min-heads-tails w-full h-4"
                    onChange={(e) => setMinHeadsTails(parseInt(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, green, yellow, orange, red)`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-light-green mb-1 text-sm">WAGER</div>
                <div>
                  <div className="wager-container bg-dark-gray text-light-green rounded-sm p-2 flex items-center justify-between h-10 focus-within:ring-1 focus-within:ring-yellow-400">
                    <div className="flex items-center">
                      <Image
                        src="/zaar-flip-heads.png"
                        alt="Coin"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <div className="" ref={inputRef}>
                        <input
                          type="number"
                          value={wager}
                          className="wager-input bg-transparent w-24 text-left pl-2 h-8 text-sm focus:outline-none"
                          onChange={handleWagerChange}
                          onFocus={() => setWagerDropdown(true)}
                        />
                        {wagerDropdown && (
                          <div className="absolute z-10 w-36 shadow-lg mt-1">
                            {wagerPresets.map((value) => (
                              <div
                                key={value}
                                className="cursor-default w-[175px] px-2 hover:bg-gray h-8 flex items-center  bg-dark-gray flex flex-row items-center"
                                onClick={() => {
                                  setWager(value);
                                  setWagerDropdown(false);
                                }}
                              >
                                <Image
                                  src="/zaar-flip-heads.png"
                                  alt="Coin"
                                  width={15}
                                  height={15}
                                  className="mr-2"
                                />
                                {value} INIT
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        onClick={handleHalfWager}
                        className="wager-button hover:bg-gray  px-2 py-1 rounded-sm h-8 text-sm mr-3"
                      >
                        1/2
                      </button>
                      <button
                        onClick={handleDoubleWager}
                        className="mybutton hover:bg-gray hover:text-md px-2 py-1 rounded-sm h-8 text-sm"
                      >
                        x2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-light-green mb-1 text-sm mt-6">
                  POTENTIAL TO WIN
                </div>
                <div className="bg-gray rounded-sm p-2 text-lime-green h-10 flex items-center text-lg">
                  ${potentialWin}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-light-green mb-1 text-sm">
                  PRESETS
                  <Tooltip
                    text={
                      "Presets offer quick selections of coin amounts and minimum wins. Each option shows the number of coins, required wins, and potential payout multiplier. Choose a preset to instantly set up your game configuration."
                    }
                  />
                </div>
                {/*<select className="bg-dark-gray text-light-green rounded-sm p-2 w-full h-10 text-sm focus:outline-none focus:border focus:border-yellow-400" onChange={()=>{handlePresetChange("")}}>
                <option className="hover:bg-gray" value="1:1:1.96">1 : 1 (x1.96)</option>
                <option value="10:5:1.57">10 : 5 (x1.57)</option>
                <option value="4:3:3.14">4 : 3 (x3.14)</option>
                <option value="6:5:8.96">6 : 5 (x8.96)</option>
                <option value="9:8:50.8">9 : 8 (x50.8)</option>
                <option value="10:10:1003.52">10 : 10 (x1003.52)</option>
              </select>*/}
                <div className="z-40 relative flex flex-col flex-grow text-light-green rounded-sm w-full h-10 text-sm focus:outline-none focus:border focus:border-yellow-400 cursor-pointer">
                  <div
                    className={`${presetDropdown ? "border-light-gray-all" : " "} flex flex-row justify-between bg-dark-gray items-center w-full text-light-green h-10 px-2`}
                    onClick={() => {
                      setPresetDropdown(!presetDropdown);
                    }}
                  >
                    {presetSelection}
                    {presetDropdown ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  <div className="absolute flex flex-col w-full mt-10 flex flex-grow">
                    <div
                      onClick={() => {
                        handlePresetChange("10:5:1.57");
                        setPresetSelection("10 : 5 (x1.57)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "10 : 5 (x1.57)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      10 : 5 (x1.57)
                    </div>
                    <div
                      onClick={() => {
                        handlePresetChange("4:3:3.14");
                        setPresetSelection("4 : 3 (x3.14)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "4 : 3 (x3.14)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      4 : 3 (x3.14)
                    </div>
                    <div
                      onClick={() => {
                        handlePresetChange("6:5:8.96");
                        setPresetSelection("6 : 5 (x8.96)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "6 : 5 (x8.96)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      6 : 5 (x8.96)
                    </div>
                    <div
                      onClick={() => {
                        handlePresetChange("9:8:50.8");
                        setPresetSelection("9 : 8 (x50.8)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "9 : 8 (x50.8)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      9 : 8 (x50.8)
                    </div>
                    <div
                      onClick={() => {
                        handlePresetChange("10:10:1003.52");
                        setPresetSelection("10 : 10 (x1003.52)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "10 : 10 (x1003.52)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      10 : 10 (x1003.52)
                    </div>
                  </div>
                  {/*<div onClick={()=>{handlePresetChange("10:5:1.57"); setPresetSelection("10 : 5 (x1.57)");}} className={`${presetDropdown? "block" : "hidden"} bg-dark-gray absolute w-full`}>
                  <div onClick={()=>{handlePresetChange("10:5:1.57"); setPresetSelection("10 : 5 (x1.57)");}}>10 : 5 (x1.57)</div>
                  <div className={`text-center hover:bg-gray w-full ${presetSelection=="10 : 5 (x1.57)"? " text-white " : "text-light-gray"}`} onClick={()=>{handlePresetChange("10:5:1.57"); setPresetSelection("10 : 5 (x1.57)");}}>4 : 3 (x3.14)</div>
                </div>*/}
                </div>
              </div>
              <div>
                <div className="text-light-green mb-1 text-sm mt-6">
                  PICK SIDE:
                  <Tooltip
                    text={
                      "This lets you choose which side of the coin you're betting on - heads or tails. The side you pick becomes your `winning` side for that game. In essence, you're betting on getting at least a certain number of your chosen side (heads or tails) when flipping a set number of coins. The more challenging your bet, the higher your potential winnings."
                    }
                  />
                </div>
                <div className="flex space-x-4">
                  <div
                    onClick={() => handleSideChange("heads")}
                    className={`coin-side ${currentSide === "heads" ? "selected" : ""}`}
                  >
                    <Image
                      src="/zaar-flip-heads.png"
                      alt="Heads"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                    />
                  </div>
                  <div
                    onClick={() => handleSideChange("tails")}
                    className={`coin-side ${currentSide === "tails" ? "selected" : ""}`}
                  >
                    <Image
                      src="/zaar-flip-tails.png"
                      alt="Tails"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={async () => {
              if (coinsDisplayRef.current) {
                await flipCoin();
                flipCoins(
                  coinsDisplayRef.current,
                  minHeadsTails,
                  currentSide,
                  false
                );
                randomFlip(
                  coinsDisplayRef.current,
                  minHeadsTails,
                  currentSide,
                  true
                );
              }
            }}
            className="hidden sm:block gradient-button hover:-translate-y-1 transition duration-700 ease-in-out text-black px-6 py-2 rounded-sm font-bold mt-3 mx-auto block text-sm uppercase"
          >
            FLIP COIN - ${wager.toFixed(2)}
          </button>
        </main>
      </div>
    </div>
  );
}
