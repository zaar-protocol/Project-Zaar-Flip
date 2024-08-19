import React from "react";
import { useState, useRef, useEffect } from "react";
import { StarField } from "@/components/star-field";
import { Header } from "@/components/header";
import toast, { Toaster } from "react-hot-toast";
import ControlPanel from "@/components/zlinkoComponents/ControlPanel";
import PlinkoBoard from "@/components/zlinkoComponents/PlinkoBoard";

export default function Zlinko() {
  const [betAmount, setBetAmount] = useState<number>(1);
  const [degenLevel, setDegenLevel] = useState<string>("Normal");
  const [rows, setRows] = useState<number>(8);
  const [riskLevel, setRiskLevel] = useState<string>("Low");
  const [multipliers, setMultipliers] = useState<number[]>([
    4.7, 2.3, 1.2, 1, 0.4, 1, 1.2, 2.3, 4.7,
  ]);
  const [dropBallTrigger, setDropBallTrigger] = useState<boolean>(false);

  return (
    <div className="relative w-screen h-screen no-scrollbar">
      <Toaster />
      <Header />
      <StarField />
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-4 sm:mt-20">
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
