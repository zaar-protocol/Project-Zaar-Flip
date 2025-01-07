import Image from "next/image";
import Link from "next/link";
import React, { use, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMuteState } from "./MuteContext";
import { ConnectWallet } from "@/components/ConnectWallet";
import { InitiaWallet } from "@/components/InitiaWallet";
import { useWallet } from "@initia/react-wallet-widget";
import { Web3ModalButton } from "./Web3ModalButton";
import { ThirdWebWallet } from "./ThirdWebWallet";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/client";
import { thirdwebInitiaChain } from "@/thirdweb.config";

export const SideMenuModal = () => {
  const router = useRouter();
  const [page, setPage] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMuted, toggleMute } = useMuteState();

  const playSound = () => {
    if (isMuted) return;
    const audio = new Audio("/sounds/switchgame.mp3");
    audio.play();
  };

  useEffect(() => {
    setPage(router.asPath);
  }, [router.asPath]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="z-50">
      <button
        onClick={() => {
          toggleMenu();
          playSound();
        }}
        className="h-[37px] flex items-center px-4 gap-3 border border-dark-gray-all rounded text-white"
      >
        MENU
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-300 -rotate-90 scale-75`}
        >
          <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
        </svg>
      </button>

      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isMenuOpen && (
          <div
            className="absolute -left-[40px] top-4 bg-black p-3 flex items-center justify-center rounded cursor-pointer z-50"
            onClick={() => {
              toggleMenu();
              playSound();
            }}
          >
            <svg
              stroke="currentColor"
              fill="#E3BF00"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90"
            >
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
            </svg>
          </div>
        )}

        <div className="bg-black border-l-gray border-l-2 flex flex-col items-center pt-24 gap-8 h-full text-lg text-[#E3BF00] z-50 overflow-y-auto">
          <Link
            href="/"
            className="hover:cursor-pointer transition duration-300 hover:scale-105"
            onClick={playSound}
          >
            <Image
              height={200}
              width={200}
              src="/Zaar Wordmark-White.png"
              alt="Zaar 3D Logo"
              className="w-[120px]"
            />
          </Link>
          <Link
            href="/zaar-flip"
            className="hover:cursor-pointer transition duration-300 hover:scale-105"
            onClick={playSound}
          >
            <Image
              src="/logo.png"
              alt="Zaar Flip Logo"
              width={400}
              height={400}
              className="text-white w-[120px]"
            />
          </Link>
          <div className="group hover:cursor-pointer transition duration-300 hover:scale-105 relative z-50">
            {/* <Link
              href="/zlinko"
              className="hover:cursor-pointer transition duration-300 hover:scale-105"
              onClick={playSound}
            > */}
            <Image
              src="/zlinko/zaar-zlinko.png"
              alt="Zaar Zlinko Logo"
              width={400}
              height={400}
              className=" w-[120px] grayscale"
            />
            {/* </Link> */}
            <div className="absolute left-1 text-center text-base text-gray transition duration-300 opacity-0 group-hover:opacity-100 w-full z-50">
              Coming soon
            </div>
          </div>
          <div className="group hover:cursor-pointer transition duration-300 hover:scale-105 relative z-50">
            <Image
              src="/zaar-raffle.png"
              alt="Zaar Flip Logo"
              width={400}
              height={400}
              className="text-white grayscale  w-[100px] opacity-80 transition duraction-300 group-hover:opacity-100"
            />
            <div className="absolute left-1 text-center text-base text-gray transition duration-300 opacity-0 group-hover:opacity-100">
              Coming soon
            </div>
          </div>

          <div className="group hover:cursor-pointer text-gray opacity-80 hover:opacity-100 transition duration-300 hover:scale-105 relative z-50">
            {/* <Link
              href="/challenges"
              className="hover:cursor-pointer transition duration-300 hover:text-white"
              onClick={playSound}
            > */}
            CHALLENGES
            {/* </Link>  */}
            <div className="absolute left-2 text-center text-base text-gray transition duration-300 opacity-0 group-hover:opacity-100">
              Coming soon
            </div>
          </div>

          {/* <Link
            href="/"
            className="hidden hover:cursor-pointer transition duration-300 hover:text-white"
            onClick={playSound}
          >
            BE THE HOUSE
          </Link>
          <Link
            href="/"
            className="hidden hover:cursor-pointer transition duration-300 hover:text-white"
            onClick={playSound}
          >
            MIGRATE PRTC
          </Link>
          <Link
            href="/"
            className="hidden hover:cursor-pointer transition duration-300 hover:text-white"
            onClick={playSound}
          >
            EARN XP
          </Link> */}
          {/* <div className="group hover:cursor-pointer text-gray opacity-80 hover:opacity-100 transition duration-300 hover:scale-105 relative z-50">
            <Link
            href="/staking"
            className="hover:cursor-pointer transition duration-300 hover:text-white"
            onClick={playSound}
          >
            STAKING
            </Link>
            <div className="min-w-[100px] absolute -left-4 text-center text-base text-gray transition duration-300 opacity-0 group-hover:opacity-100">
              Coming soon
            </div>
          </div> */}

          {/* <Link
            href="/bridge"
            className="hover:cursor-pointer transition duration-300 hover:text-white"
            onClick={playSound}
          >
            BRIDGE
          </Link> */}
          <Link
            href="/profile"
            className="hover:cursor-pointer transition duration-300 hover:text-white"
            onClick={playSound}
          >
            PROFILE
          </Link>
          <Link
            href="/settings"
            className="hover:cursor-pointer transition duration-300 hover:text-white"
            onClick={playSound}
          >
            SETTINGS
          </Link>
          <div className="grow mb-5 flex flex-col justify-end items-center gap-3 text-sm text-gray z-50">
            <div className="flex items-center gap-5 mb-1">
              <Link href="https://x.com/zaar_gg" className="hover:text-white">
                <svg
                  className="fill-gray"
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8031 0.234375H15.2568L9.89684 6.37609L16.2031 14.7349H11.266L7.39627 9.66638L2.97341 14.7349H0.517411L6.24998 8.16352L0.203125 0.235518H5.26598L8.75855 4.86752L12.8031 0.234375ZM11.9403 13.2629H13.3003L4.52313 1.6298H3.06484L11.9403 13.2629Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link
                href="https://discord.com/invite/kSjrBEGnmf"
                className="hover:text-white"
              >
                <svg
                  className="fill-gray"
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0495 1.03806C11.1629 0.624731 10.2029 0.324731 9.20288 0.151398C9.19411 0.151117 9.18539 0.152763 9.17733 0.156218C9.16926 0.159674 9.16206 0.164856 9.15621 0.171398C9.03621 0.391398 8.89621 0.678064 8.80288 0.898064C7.74221 0.738064 6.66354 0.738064 5.60288 0.898064C5.50954 0.671398 5.36954 0.391398 5.24288 0.171398C5.23621 0.158065 5.21621 0.151398 5.19621 0.151398C4.19621 0.324731 3.24288 0.624731 2.34954 1.03806C2.34288 1.03806 2.33621 1.04473 2.32954 1.0514C0.516211 3.76473 0.016211 6.40473 0.262878 9.01806C0.262878 9.0314 0.269544 9.04473 0.282878 9.0514C1.48288 9.9314 2.63621 10.4647 3.77621 10.8181C3.79621 10.8247 3.81621 10.8181 3.82288 10.8047C4.08954 10.4381 4.32954 10.0514 4.53621 9.64473C4.54954 9.61806 4.53621 9.5914 4.50954 9.58473C4.12954 9.43806 3.76954 9.26473 3.41621 9.06473C3.38954 9.0514 3.38954 9.0114 3.40954 8.9914C3.48288 8.93806 3.55621 8.87807 3.62954 8.82473C3.64288 8.8114 3.66288 8.8114 3.67621 8.81806C5.96954 9.86473 8.44288 9.86473 10.7095 8.81806C10.7229 8.8114 10.7429 8.8114 10.7562 8.82473C10.8295 8.88473 10.9029 8.93806 10.9762 8.99806C11.0029 9.01806 11.0029 9.05806 10.9695 9.0714C10.6229 9.27806 10.2562 9.44473 9.87621 9.5914C9.84954 9.59806 9.84288 9.6314 9.84954 9.6514C10.0629 10.0581 10.3029 10.4447 10.5629 10.8114C10.5829 10.8181 10.6029 10.8247 10.6229 10.8181C11.7695 10.4647 12.9229 9.9314 14.1229 9.0514C14.1362 9.04473 14.1429 9.0314 14.1429 9.01806C14.4362 5.99806 13.6562 3.37806 12.0762 1.0514C12.0695 1.04473 12.0629 1.03806 12.0495 1.03806ZM4.88288 7.42473C4.19621 7.42473 3.62288 6.7914 3.62288 6.0114C3.62288 5.2314 4.18288 4.59806 4.88288 4.59806C5.58954 4.59806 6.14954 5.23806 6.14288 6.0114C6.14288 6.7914 5.58288 7.42473 4.88288 7.42473ZM9.52954 7.42473C8.84288 7.42473 8.26954 6.7914 8.26954 6.0114C8.26954 5.2314 8.82954 4.59806 9.52954 4.59806C10.2362 4.59806 10.7962 5.23806 10.7895 6.0114C10.7895 6.7914 10.2362 7.42473 9.52954 7.42473Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
            <Link
              href="https://gitbook.zaar.market/"
              className="hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="https://gitbook.zaar.market/"
              className="hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="https://gitbook.zaar.market/"
              className="hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay to close the modal when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};
