import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Tooltip } from "../tooltip";
import { useMuteState } from "@/components/MuteContext";
import { Footer } from "../Footer";

interface ControlPanelProps {
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  degenLevel: string;
  setDegenLevel: React.Dispatch<React.SetStateAction<string>>;
  rows: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  riskLevel: string;
  setRiskLevel: React.Dispatch<React.SetStateAction<string>>;
  dropBallTrigger: boolean;
  setDropBallTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setRunContractTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlPanel = ({
  betAmount,
  setBetAmount,
  degenLevel,
  setDegenLevel,
  rows,
  setRows,
  riskLevel,
  setRiskLevel,
  dropBallTrigger,
  setDropBallTrigger,
  setRunContractTrigger,
}: ControlPanelProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localRiskLevel, setLocalRiskLevel] = useState(riskLevel || "Low");
  const maxBet = 1000;

  useEffect(() => {
    if (typeof setRiskLevel === "function") {
      setRiskLevel(localRiskLevel);
    }
  }, [localRiskLevel, setRiskLevel]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dropaudio = new Audio("/sounds/flip.mp3");
  const squishaudio = new Audio("/sounds/squish.mp3");
  const { isMuted, toggleMute } = useMuteState();
  function handleDropBall() {
    setRunContractTrigger(true);
    if (!isMuted) {
      dropaudio.play();
    }
  }

  return (
    <div className="bg-transparent rounded-sm p-4 space-y-4 max-w-xs mx-auto mb-20 md:mb-0">
      <button
        className="lg:hidden w-full gradient-button text-black font-bold py-2 rounded hover:bg-yellow uppercase"
        onClick={() => {
          if (!isMuted) {
            dropaudio.play();
          }
          setDropBallTrigger(true);
        }}
      >
        Drop 1 Ball
      </button>
      <div>
        <div className="flex justify-between items-center mb-2 rounded-sm ">
          <label className="text-sm font-medium text-light-green">
            BET AMOUNT
          </label>
          <button
            disabled={dropBallTrigger}
            onClick={() => setBetAmount(maxBet)}
            className="bg-[#303030] hover:bg-[#514534] text-xs font-semibold px-3 py-1 rounded transition duration-200 ease-in-out text-yellow"
          >
            Max
          </button>
        </div>
        <div className="bet-amount-container flex items-center bg-gray rounded-sm border-dark-gray-all">
          <span className="pl-3 text-light-green">$</span>
          <input
            type="number"
            value={betAmount}
            max={maxBet}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            disabled={dropBallTrigger}
            className="bg-transparent flex-grow p-2 focus:outline-none bet-amount-input text-white"
          />
          <div className="flex space-x-1 pr-1">
            <button
              onClick={() => setBetAmount(betAmount / 2)}
              disabled={dropBallTrigger}
              className="w-8 h-8 flex items-center justify-center bg-dark-gray text-sm text-light-green rounded-sm hover:bg-zinc-900"
            >
              1/2
            </button>
            <button
              onClick={() => setBetAmount(betAmount * 2)}
              disabled={dropBallTrigger}
              className="w-8 h-8 flex items-center justify-center bg-dark-gray text-sm text-light-green rounded-sm hover:bg-zinc-900"
            >
              x2
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex mb-2 mt-5 justify-between items-center">
          <div className="flex">
            <label className="block text-sm font-medium text-light-green ">
              DEGEN LEVEL
            </label>
            <Tooltip text="High risk not enough for you? The degen options unlock the  EXTREME risk level with preset rows." />
          </div>

          {degenLevel != "Normal" && (
            <button
              disabled={dropBallTrigger}
              onClick={() => {
                setDegenLevel("Normal");
                setRiskLevel("Low");
                setRows(8);
              }}
              className="bg-[#303030] hover:bg-[#514534] text-xs font-semibold px-3 py-1 rounded transition duration-200 ease-in-out text-yellow"
            >
              Degen Off
            </button>
          )}
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            disabled={dropBallTrigger}
            className={`w-full bg-dark-gray p-2 rounded-sm focus:outline-none h-10 flex flex-row justify-between items-center text-light-green`}
          >
            {degenLevel}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${isDropdownOpen ? "" : "rotate-180"}`}
            >
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full bg-dark-gray mt-1 rounded-sm shadow-lg">
              {["Normal", "Degen", "Extra Degen", "Total Degen"].map(
                (degen) => (
                  <button
                    key={degen}
                    onClick={() => {
                      if (degen === "Degen") {
                        setRiskLevel("Extreme");
                        setRows(12);
                      } else if (degen === "Extra Degen") {
                        setRiskLevel("Extreme");
                        setRows(14);
                      } else if (degen === "Total Degen") {
                        setRiskLevel("Extreme");
                        setRows(16);
                      } else {
                        setRiskLevel("Low");
                        setRows(8);
                      }
                      setDegenLevel(degen);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-light-green hover:bg-zinc-900"
                  >
                    {degen}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-light-green mt-5">
          RISK LEVEL
        </label>
        <div className="bg-dark-gray rounded-sm p-2">
          {/* {riskLevel === "Extreme" && (
            <div className="relative w-full flex justify-between items-center text-[#ef4444] font-extrabold">
              {[0, 1, 2].map((index) => (
                <Image
                  width={235}
                  height={215}
                  src="/pepe.png"
                  alt="Pepe The Frog"
                  className="absolute w-8"
                  key={index}
                  style={{
                    top: "1px",
                    left: `${index * 95 + 10}px`, // Adjust `left` as needed for positioning
                  }}
                />
              ))}
            </div>
          )} */}
          <div className="flex justify-between items-center">
            {["Low", "Medium", "High"].map((risk, index) => (
              <div className="flex justify-center" key={risk}>
                <Image
                  width={235}
                  height={215}
                  src={
                    degenLevel === "Degen"
                      ? "/degen.png"
                      : degenLevel === "Extra Degen"
                        ? "/extra-degen.png"
                        : degenLevel === "Total Degen"
                          ? "/total-degen.png"
                          : "/pepe.png"
                  }
                  alt="Pepe The Frog"
                  className={`${riskLevel === "Extreme" ? "w-8 absolute" : "hidden"}`}
                />
                <button
                  disabled={dropBallTrigger || degenLevel != "Normal"}
                  onClick={() => setLocalRiskLevel(risk)}
                  className={`text-sm px-3 py-1 min-h-8 rounded ${
                    localRiskLevel === risk && degenLevel === "Normal"
                      ? "bg-gray text-light-green"
                      : "text-light-gray"
                  }${degenLevel != "Normal" ? "hover:bg-zinc-900" : ""}`}
                >
                  {degenLevel == "Normal" ? risk : ""}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-light-green mt-5">
          ROWS
        </label>
        <div className="flex items-center">
          <span className="text-light-green mr-5">{rows}</span>
          <input
            disabled={dropBallTrigger || degenLevel != "Normal"}
            type="range"
            min="8"
            max="16"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className={`flex-grow h-4 appearance-none bg-gradient-to-r from-green-500 via-[#eab308] via-orange-500 to-[#ef4444] rounded-full custom-slider`} // slider from green-500 via-yellow-500 via-orange-500 to red-500
          />
        </div>
      </div>
      <button
        className="hidden lg:block w-full gradient-button text-black font-bold py-2 rounded hover:bg-yellow uppercase"
        disabled={dropBallTrigger}
        onClick={handleDropBall}
      >
        Drop 1 Ball
      </button>
    </div>
  );
};

export default ControlPanel;
