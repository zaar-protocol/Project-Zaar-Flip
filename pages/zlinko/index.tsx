import React from "react";
import { useState, useRef, useEffect } from "react";
import { StarField } from "@/components/star-field";
import { Header } from "@/components/header";
import toast, { Toaster } from "react-hot-toast";
import ControlPanel from "@/components/zlinkoComponents/ControlPanel";
import PlinkoBoard from "@/components/zlinkoComponents/PlinkoBoard";
import { storedMultipliers } from "@/components/zlinkoComponents/multipliers";
import type { Risk } from "@/components/zlinkoComponents/multipliers";
import {FaVolumeUp, FaVolumeMute} from "react-icons/fa";
import MuteButton from "@/components/MuteButton";
import Footer from "@/components/Footer";

export default function Zlinko() {
  const [betAmount, setBetAmount] = useState<number>(1);
  const [degenLevel, setDegenLevel] = useState<string>("Normal");
  const [rows, setRows] = useState<number>(8);
  const [riskLevel, setRiskLevel] = useState<string>("Low");
  const [audioOn, setAudioOn] = useState<boolean>(true);
  const [multipliers, setMultipliers] = useState<number[]>([
    4.7, 2.3, 1.2, 1, 0.4, 1, 1.2, 2.3, 4.7,
  ]);
  const [dropBallTrigger, setDropBallTrigger] = useState<boolean>(false);

  const fullMultipliers = (halfMultipliers: number[]) => {
    let reversePart = halfMultipliers.slice(0, -1).reverse();
    if (rows % 2 !== 0) {
      reversePart.unshift(halfMultipliers[halfMultipliers.length - 1]);
    }
    return halfMultipliers.concat(reversePart);
  };

  useEffect(() => {
    console.log(degenLevel);
    let halfMultipliers;
    if (degenLevel != "Normal") {
      halfMultipliers = storedMultipliers[degenLevel as Risk][0];
    } else {
      if (riskLevel === "Extreme") {
        return;
      }
      halfMultipliers = storedMultipliers[riskLevel as Risk][rows - 8];
    }
    setMultipliers(fullMultipliers(halfMultipliers));
  }, [rows, riskLevel, degenLevel]);

  return (
    <div className="relative w-screen h-screen no-scrollbar">
      <Toaster />
      <Header />
      <StarField />
      
      <MuteButton />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-end gap-4 sm:mt-20">
        <div className="w-full lg:w-auto lg:order-1 order-2">
          <ControlPanel
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            degenLevel={degenLevel}
            setDegenLevel={setDegenLevel}
            rows={rows}
            setRows={setRows}
            riskLevel={riskLevel}
            setRiskLevel={setRiskLevel}
            dropBallTrigger={dropBallTrigger}
            setDropBallTrigger={setDropBallTrigger}
            
          />
        </div>
        <div className="w-full lg:w-auto lg:mt-[-65px] lg:order-2 order-1 mb-8 lg:mb-0">
          <PlinkoBoard
            rows={rows}
            multipliers={multipliers}
            dropBallTrigger={dropBallTrigger}
            setDropBallTrigger={setDropBallTrigger}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
