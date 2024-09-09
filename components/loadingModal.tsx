import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadingModal: React.FC<ApproveModalProps> = ({ isOpen, onClose }) => {
  const size = "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24";
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-dark-gray rounded-lg p-6 w-full max-w-[350px] sm:max-w-[400px] md:max-w-[525px] relative pb-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <div className="text-white mb-10">
            Waiting on confirmation from your wallet...
          </div>
          <div className={`coin loading-coin2 ${size}`}>
            <div className={`coin-heads ${size}`}></div>
            <div className={`coin-tails ${size}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
