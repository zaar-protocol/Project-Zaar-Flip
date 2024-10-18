import React, { useState, useEffect, useRef } from "react";
import { FaWallet, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { useWallet } from "@initia/react-wallet-widget";
import { useAccount, useDisconnect } from "wagmi";
import { useMuteState } from "./MuteContext";

export const InitiaWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVanity, setCurrentVanity] = useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState<string>("");

  const { wallet, onboard, disconnect: initiaDisconnect } = useWallet();
  const { address: wagmiAddress, isConnected } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { isMuted } = useMuteState();

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
          className="bg-yellow text-black flex flex-row items-center justify-center space-x-2 px-4 py-2 text-sm rounded-sm font-bold uppercase gradient-button hover:bg-white border-2 transition duration-500"
        >
          <FaWallet />
          <p>Connect</p>
        </button>
      ) : (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center rounded cursor-pointer px-2 py-2 text-sm font-medium text-gray-300 border border-dark-gray-all md:flex w-full gap-2 min-w-[100px] hover:bg-gray-700 transition duration-300"
          >
            {currentVanity || displayAddr(wagmiAddress || "")}
          </button>
          {isModalOpen && <Modal />}
        </>
      )}
    </div>
  );
};
