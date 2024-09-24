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
      
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <div className="text-yellow text-sm">
                {audioOn? <FaVolumeUp className="h-6 w-6"/>
                : <FaVolumeMute className="h-6 w-6"/>}
              </div>
              <label className="relative inline-flex items-center me-5 cursor-pointer">
                <input
                  type="checkbox"
                  value="audio"
                  className="sr-only peer"
                  checked={audioOn}
                  onChange={() => {
                    setAudioOn(!audioOn);
                  }}
                />
                <div className="w-11 h-6 bg-gray rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow dark:peer-focus:ring-yellow peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow"></div>
              </label>
            </div>

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
    </div>
  );
}
