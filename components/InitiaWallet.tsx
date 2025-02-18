import React, { useState, useEffect, useRef } from "react";
import { FaWallet, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { useWallet } from "@initia/react-wallet-widget";
import { useAccount, useBalance, useDisconnect, useSwitchChain } from "wagmi";
import { useMuteState } from "./MuteContext";
import { formatEther } from "viem";
import { OctagonAlert, AlertOctagon } from "lucide-react";

const NetworkModal = ({ onClose }: { onClose: () => void }) => {
  const { switchChain } = useSwitchChain();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-dark-gray p-6 rounded-lg shadow-xl relative max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-white"
        >
          <FaTimes />
        </button>
        <div className="text-center text-gray-300 my-4">
          This app doesn&apos;t support your current network. Please switch to
          <span className="text-white"> zaar-test-3</span>.
        </div>
        <button
          onClick={() => {
            switchChain({ chainId: 3710952917853191 });
            onClose();
          }}
          className="w-full gradient-button text-black py-2 px-4 rounded-sm hover:opacity-90 transition duration-300"
        >
          Switch Network
        </button>
      </div>
    </div>
  );
};

export const InitiaWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVanity, setCurrentVanity] = useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState<string>("");
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);

  const { wallet, onboard, disconnect: initiaDisconnect, view } = useWallet();
  const { address: wagmiAddress, isConnected, chainId } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { isMuted } = useMuteState();

  const balance = useBalance({
    address: wagmiAddress,
  });

  const playSound = () => {
    if (isMuted) return;
    const audio = new Audio("/sounds/switchgame.mp3");
    audio.play();
  };

  const displayAddr = (addr: string) => {
    const firstFive = addr.slice(0, 5);
    const lastThree = addr.slice(-3);

    return `${firstFive}...${lastThree}`;
  };

  useEffect(() => {
    if (!wagmiAddress) return;
    fetch(`./api/getProfile?ownerAddress=${wagmiAddress}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentVanity(
          data.uName === "" || !data.uName
            ? displayAddr(wagmiAddress)
            : data.uName
        );
        if (data?.profPicUrl) setCurrentProfileImage(data.profPicUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [wagmiAddress, isConnected]);

  const handleLogout = async () => {
    try {
      await wagmiDisconnect();
      await initiaDisconnect();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-dark-gray p-6 rounded-lg shadow-xl relative"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 hover:text-white"
        >
          <FaTimes />
        </button>
        <div className="w-24 h-16 rounded-full mx-16 bg-gray-700 flex items-center justify-center">
          {currentProfileImage ? (
            <img
              src={currentProfileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaWallet className="text-4xl" />
          )}
        </div>
        <div className="text-xl font-bold text-center mb-8 text-gray-300">
          {currentVanity || displayAddr(wagmiAddress || "")}
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-blue-500 text-gray-300 py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-white"
          style={{ backgroundColor: "#3b82f6" }}
        >
          <FaSignOutAlt className="inline mr-2" />
          Disconnect
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {!wallet ? (
        <button
          onClick={() => {
            playSound();
            onboard();
          }}
          className="h-full text-black flex flex-row items-center justify-center space-x-2 px-4 py-2 text-sm rounded-sm font-bold uppercase gradient-button transition duration-500"
        >
          <FaWallet />
          <p>Connect</p>
        </button>
      ) : (
        <div className="flex items-center gap-2 md:gap-6">
          {chainId === 3710952917853191 ? (
            <div className="flex items-center justify-center px-4 py-2 text-sm rounded-sm font-bold uppercase text-black gradient-button transition duration-500 whitespace-nowrap">
              {Number(formatEther(balance.data?.value || BigInt(0))).toFixed(2)}{" "}
              fZAAR
            </div>
          ) : (
            <button
              onClick={() => setIsNetworkModalOpen(true)}
              className="h-[24px] w-[24px] min-w-[24px] text-white text-sm font-bold flex items-center justify-center relative"
            >
              <AlertOctagon
                size={24}
                fill="red"
                className="absolute top-0 left-0"
              />
              <AlertOctagon size={24} className="absolute top-0 left-0" />
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center rounded cursor-pointer px-2 py-2 text-sm font-medium text-gray-300 border border-dark-gray-all md:flex w-full gap-2 min-w-[100px] hover:bg-gray-700 transition duration-300"
          >
            {currentVanity || displayAddr(wagmiAddress || "")}
          </button>
          {isModalOpen && <Modal />}
          {isNetworkModalOpen && (
            <NetworkModal onClose={() => setIsNetworkModalOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
};
