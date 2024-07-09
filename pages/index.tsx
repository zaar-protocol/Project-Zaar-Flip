"use client";
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import {
  updateCoinsDisplay,
  updateWinChance,
  updatePotentialWin,
  flipCoins,
  WinChanceType,
} from '../components/zaarFlipUtils';
import { ConnectWallet} from "../components/ConnectWallet";
import toast, {Toaster} from "react-hot-toast";
import { StarField } from '@/components/star-field';
import {Header} from '@/components/header';
import { config } from "@/config";
import { getAccount } from "@wagmi/core";
export default function Home() {
  const [currentSide, setCurrentSide] = useState('heads');
  const [coinsAmount, setCoinsAmount] = useState(1);
  const [minHeadsTails, setMinHeadsTails] = useState(1);
  const [wager, setWager] = useState(1.00);
  const [potentialWin, setPotentialWin] = useState(1.96);
  const [winChance, setWinChance] = useState<WinChanceType>({ toWin: 1, chance: 50.00 });
  const coinsDisplayRef = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  useEffect(() => {
    updateAll();
  }, [coinsAmount, minHeadsTails, wager]);

  function updateAll() {
    if (coinsDisplayRef.current) {
      updateCoinsDisplay(coinsDisplayRef.current, coinsAmount, minHeadsTails, currentSide);
    }
    setWinChance(updateWinChance(coinsAmount, minHeadsTails));
    setPotentialWin(Number(updatePotentialWin(coinsAmount, minHeadsTails, wager)));
  }

  function handlePresetChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const [coins, minHeadsTails] = e.target.value.split(':');
    setCoinsAmount(parseInt(coins));
    setMinHeadsTails(parseInt(minHeadsTails));
    if(parseInt(minHeadsTails) > parseInt(coins)) {
      setCoinsAmount(parseInt(minHeadsTails));
    }
  }

  function handleWagerChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace('$', '');
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
      flipCoins(coinsDisplayRef.current, minHeadsTails, side);
    }
  }
  
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
  function flipCoin() {
    const addr = getAccount(config).address;
    fetch(`./api/addEvent?ownerAddress=${addr}&coins=5&winnings=100&wager=50&outcome=false`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        toast.success('Congratulations you won!');
      });
  }

  return (
    <div className="min-h-screen w-screen  relative overflow-hidden flex flex-col items-center justify-start ">
      <Head>
        <title>Zaar Flip</title>
        <meta name="description" content="A first-in-class NFT trading platform for traders of every caliber." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>
      <div className="-mr-8"><Header/></div>
      <StarField/>

      <div id="planet" className="hidden absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-300 opacity-20"></div>
        <div className=" hidden absolute bottom-0 left-0 w-64 h-64 flex items-center justify-center">
          <Image src="/logo-3d.png" alt="Logo" width={160} height={160} className="w-[100px] h-[100px]  object-contain z-50 opacity-40 bg-red-400" />
        </div>
      <div className="container container-fluid  w-screen h-full flex flex-grow items-center justify-center  ">

      <main className="contiainer flex-grow flex flex-col justify-between relative z-20">
        <div className=" flex-grow flex flex-col items-center justify-center">
          <div id="coins-display" ref={coinsDisplayRef} className="w-full h-[260px] flex items-center justify-center mb-2">
            {/* Coins will be dynamically added here */}
          </div>

          <div className="text-yellow mb-2 mt-4">
            <span className="text-md mr-2">{winChance.toWin} OR MORE TO WIN</span>
            <span className="text-light-gray">{winChance.chance}% CHANCE</span>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-3 w-full">
          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <div className="text-light-green mb-1 text-sm">PICK SIDE:</div>
              <div className="flex space-x-4">
                <div
                  onClick={() => handleSideChange('heads')}
                  className={`coin-side ${currentSide === 'heads' ? 'selected' : ''}`}
                >
                  <Image src="/zaar-flip-heads.png" alt="Heads" width={48} height={48} className="cursor-pointer" />
                </div>
                <div
                  onClick={() => handleSideChange('tails')}
                  className={`coin-side ${currentSide === 'tails' ? 'selected' : ''}`}
                >
                  <Image src="/zaar-flip-tails.png" alt="Tails" width={48} height={48} className="cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="w-1/2 pl-2">
            <button
              onClick={() => {if(coinsDisplayRef.current){flipCoins(coinsDisplayRef.current, minHeadsTails, currentSide)};}}
              className="gradient-button text-black px-6 py-2 rounded-sm font-bold mt-3 mx-auto block text-sm uppercase"
            >
              FLIP COIN - ${wager.toFixed(2)}
            </button>
            </div>
          </div>
          <div>
            <div className="text-light-green mb-1 text-sm">WAGER</div>
            <div className="wager-container bg-dark-gray text-light-green rounded-sm p-2 flex items-center justify-between h-10 focus-within:ring-1 focus-within:ring-yellow-400">
              <div className="flex items-center">
                <Image src="/zaar-flip-heads.png" alt="Coin" width={20} height={20} className="mr-2" />
                <input
                  type="text"
                  value={`$${wager.toFixed(2)}`}
                  className="wager-input bg-transparent w-24 text-left pl-2 h-8 text-sm focus:outline-none"
                  onChange={handleWagerChange}
                />
              </div>
              <div className="flex">
                <button onClick={handleHalfWager} className="wager-button bg-gray px-2 py-1 rounded-sm h-8 text-sm mr-3">1/2</button>
                <button onClick={handleDoubleWager} className="wager-button bg-gray px-2 py-1 rounded-sm h-8 text-sm">x2</button>
              </div>
            </div>
          </div>
          <div>
            <div className="text-light-green mb-1 text-sm">POTENTIAL TO WIN</div>
            <div className="bg-gray rounded-sm p-2 text-lime-green h-10 flex items-center text-sm">
              ${potentialWin}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <div className="text-light-green mb-1 text-sm">COINS AMOUNT</div>
              <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                <div className="text-light-green text-center mr-2 text-sm">x</div>
                <div className="text-light-green text-center mr-5 text-sm">{coinsAmount}</div>
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
                  style={{ background: `linear-gradient(to right, green, yellow, orange, red)` }}
                />
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <div className="text-light-green mb-1 text-sm">MIN HEADS / TAILS</div>
              <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                <div className="text-light-green text-center mr-2 text-sm">x</div>
                <div className="text-light-green text-center mr-5 text-sm">{minHeadsTails}</div>
                <input
                  id="minHeadsTails"
                  type="range"
                  min="1"
                  max="10"
                  value={minHeadsTails}
                  className="slider min-heads-tails w-full h-4"
                  onChange={(e) => {
                    setMinHeadsTails(parseInt(e.target.value));
                  }
                 }
                  style={{ background: `linear-gradient(to right, green, yellow, orange, red)` }}
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-light-green mb-1 text-sm">PRESETS</div>
            <select className="bg-dark-gray text-light-green rounded-sm p-2 w-full h-10 text-sm focus:outline-none focus:border focus:border-yellow-400" onChange={handlePresetChange}>
              <option value="1:1:1.96">1 : 1 (x1.96)</option>
              <option value="10:5:1.57">10 : 5 (x1.57)</option>
              <option value="4:3:3.14">4 : 3 (x3.14)</option>
              <option value="6:5:8.96">6 : 5 (x8.96)</option>
              <option value="9:8:50.8">9 : 8 (x50.8)</option>
              <option value="10:10:1003.52">10 : 10 (x1003.52)</option>
            </select>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-4">
          <div className="space-y-3">
            <div>
            <div className="text-light-green mb-1 text-sm flex items-center">
              COINS AMOUNT
              <span className="ml-2 relative group">
                <button onClick={()=>{setTooltipOpen(true);}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current text-yellow-400">
                    <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
                  </svg>
                </button>
                <div className={`absolute bottom-6 left-9 transform -translate-x-1/2 bg-gray text-light-green text-sm rounded py-2 px-3  ${tooltipOpen? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300 w-72 text-left`}>
                  <div className="relative w-full h-full">
                    <div onClick={()=>{setTooltipOpen(false);}} className="absolute top-0 right-0 w-4 h-4 bg-gray hover:cursor-pointer">X</div>
                    <p>This determines how many virtual coins you&apos;re flipping in one game. You can choose from 1 to 10 coins.</p>
                  </div>
                </div>
              </span>
            </div>
              <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                <div className="text-light-green text-center mr-2 text-sm">x</div>
                <div className="text-light-green text-center mr-5 text-sm">{coinsAmount}</div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={coinsAmount}
                  className="slider coins-amount w-full h-4"
                  onChange={(e) => setCoinsAmount(parseInt(e.target.value))}
                  style={{ background: `linear-gradient(to right, green, yellow, orange, red)` }}
                />
              </div>
            </div>
            <div>
              <div className="text-light-green mb-1 text-sm mt-6">MIN HEADS / TAILS</div>
              <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                <div className="text-light-green text-center mr-2 text-sm">x</div>
                <div className="text-light-green text-center mr-5 text-sm">{minHeadsTails}</div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={minHeadsTails}
                  className="slider min-heads-tails w-full h-4"
                  onChange={(e) => setMinHeadsTails(parseInt(e.target.value))}
                  style={{ background: `linear-gradient(to right, green, yellow, orange, red)` }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-light-green mb-1 text-sm">WAGER</div>
              <div className="wager-container bg-dark-gray text-light-green rounded-sm p-2 flex items-center justify-between h-10 focus-within:ring-1 focus-within:ring-yellow-400">
                <div className="flex items-center">
                  <Image src="/zaar-flip-heads.png" alt="Coin" width={20} height={20} className="mr-2" />
                  <input
                    type="number"
                    value={wager}
                    className="wager-input bg-transparent w-24 text-left pl-2 h-8 text-sm focus:outline-none"
                    onChange={handleWagerChange}
                  />
                </div>
                <div className="flex">
                  <button onClick={handleHalfWager} className="wager-button bg-gray px-2 py-1 rounded-sm h-8 text-sm mr-3">1/2</button>
                  <button onClick={handleDoubleWager} className="wager-button bg-gray px-2 py-1 rounded-sm h-8 text-sm">x2</button>
                </div>
              </div>
            </div>
            <div>
              <div className="text-light-green mb-1 text-sm mt-6">POTENTIAL TO WIN</div>
              <div className="bg-gray rounded-sm p-2 text-lime-green h-10 flex items-center text-lg">
                ${potentialWin}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-light-green mb-1 text-sm">PRESETS</div>
              <select className="bg-dark-gray text-light-green rounded-sm p-2 w-full h-10 text-sm focus:outline-none focus:border focus:border-yellow-400" onChange={handlePresetChange}>
                <option value="1:1:1.96">1 : 1 (x1.96)</option>
                <option value="10:5:1.57">10 : 5 (x1.57)</option>
                <option value="4:3:3.14">4 : 3 (x3.14)</option>
                <option value="6:5:8.96">6 : 5 (x8.96)</option>
                <option value="9:8:50.8">9 : 8 (x50.8)</option>
                <option value="10:10:1003.52">10 : 10 (x1003.52)</option>
              </select>
            </div>
            <div>
              <div className="text-light-green mb-1 text-sm mt-6">PICK SIDE:</div>
              <div className="flex space-x-4">
                <div
                  onClick={() => handleSideChange('heads')}
                  className={`coin-side ${currentSide === 'heads' ? 'selected' : ''}`}
                >
                  <Image src="/zaar-flip-heads.png" alt="Heads" width={48} height={48} className="cursor-pointer" />
                </div>
                <div
                  onClick={() => handleSideChange('tails')}
                  className={`coin-side ${currentSide === 'tails' ? 'selected' : ''}`}
                >
                  <Image src="/zaar-flip-tails.png" alt="Tails" width={48} height={48} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button

          onClick={() => {if(coinsDisplayRef.current){
            flipCoins(coinsDisplayRef.current, minHeadsTails, currentSide);
            flipCoin();
          };}}
          className="hidden sm:block gradient-button text-black px-6 py-2 rounded-sm font-bold mt-3 mx-auto block text-sm uppercase"
        >
          FLIP COIN - ${wager.toFixed(2)}
        </button>
      </main>
      </div>
    </div>
  );
}