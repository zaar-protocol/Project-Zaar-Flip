import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useWallet } from "@initia/react-wallet-widget";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { getAccount } from "@wagmi/core";
import { config } from "./../config";
import { FaWallet } from "react-icons/fa";
import { FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";

export const InitiaWallet = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const [currentVanity, setCurrentVanity] = React.useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState<string>("");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    try {
      // Call disconnect functions
      await wagmiDisconnect();
      await initiaDisconnect();

      // Redirect to the home page
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const {
    account,
    view,
    address,
    wallet,
    isLoading,
    onboard,
    disconnect: initiaDisconnect,
  } = useWallet();

  const addr = getAccount(config).address;

  const displayAddr = (addr: string) => {
    const firstFive = addr.slice(0, 5); // Get the first 5 characters
    const lastThree = addr.slice(-3); // Get the last 3 characters

    return `${firstFive}...${lastThree}`;
  };

  useEffect(() => {
    console.log("account", account);
    console.log("wallet", wallet);
    if (!addr) return; // If address is null or undefined, do nothing
    // Fetch profile data and generate profile image
    fetch(`./api/getProfile?ownerAddress=${addr}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentVanity(data.uName === "" ? displayAddr(addr) : data.uName);
        if (data?.profPicUrl) setCurrentProfileImage(data.profPicUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [address, account]);

  const handleMouseEnter = () => {
    /*if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }*/
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleMouseLeave = () => {

    setHideTimeout(setTimeout(() => setProfileMenuOpen(false), 200));
  };

  return (
    <div
    //   {...(!isLoading && {
    //     "aria-hidden": true,
    //     style: {
    //       opacity: 0,
    //       pointerEvents: "none",
    //       userSelect: "none",
    //     },
    //   })}
    >
      {(() => {
        if (!wallet) {
          return (
            <button
              onClick={onboard}
              className="bg-yellow text-black flex flex-row items-center justify-center space-x-2 px-4 py-2 text-sm rounded-sm font-bold uppercase gradient-button hover:bg-white border-2 transition duration-500"
            >
              <FaWallet />
              <p>Connect</p>
            </button>
          );
        }

        return (
          <div className="flex items-center text-gray -mr-5 relative">
            {/* <div className="group">
              <button
                onClick={openChainModal}
                style={{ display: "flex", alignItems: "center" }}
                type="button"
                className="mr-2 flex items-center justify-center rounded cursor-pointer px-2 py-5 text-sm font-medium text-gray border border-dark-gray-all h-10 md:flex ml-6 gap-1 divide-x-1 divide-gray-300"
              >
                <span className="mr-2">{account.displayBalance}</span>
                {chain.hasIcon && (
                  <div
                    style={{
                      background: chain.iconBackground,
                      width: 25,
                      height: 25,
                      borderRadius: 999,
                      overflow: "hidden",
                      marginRight: 4,
                    }}
                  >
                    {chain.iconUrl && (
                      <Image
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        style={{ width: 25, height: 25 }}
                        width={25}
                        height={25}
                      />
                    )}
                  </div>
                )}
              </button>
            </div> */}
              
            <div
              className="relative z-50 w-[150px] "
              onMouseEnter={handleMouseEnter}
              //onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={(event) => {
                  view(event);
                }}
                className="flex items-center justify-center rounded cursor-pointer px-2 py-2 text-sm font-medium text-gray-700 border border-dark-gray-all md:flex w-full gap-2 min-w-[100px]"
                ref={buttonRef}
              >
                <div className=" text-yellow-400">{currentVanity ||account.address.substring(0,7)+"..."}</div>
              </button>
              <div
                className={` z-50  absolute left-0  w-full bg-black border border-dark-gray-all rounded-sm shadow-lg transition-opacity duration-300 ${profileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"} z-50 uppercase`}
              >
                <Link
                  href="/profile"
                  className="block  py-3 px-4 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white flex flex-row z-50"
                  
                >
                  <FaUser className="mr-2" />
                  <p className="bg-black">Profile</p>
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-3 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white flex flex-row z-50"
                >
                  <FaCog className="mr-2" />
                  Settings
                </Link>
                {/* <a href="#" className="block px-4 py-3 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white"><i className="fal fa-eye text-gray mr-2"></i>Watchlist</a> */}
                {/* <a href="settings.html" className="block px-4 py-3 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white"><i className="far fa-cog text-gray mr-2"></i>Settings</a> */}
                <div
                  onClick={() => {
                    handleLogout();
                  }}
                  className="hover:cursor-pointer block px-4 py-3 text-sm text-light-green hover:bg-gray-900 hover:text-white flex flex-row z-50"
                >
                  <FaSignOutAlt className="mr-2" />
                  Log Out
                </div>
                </div>
              </div>
            </div>
        );
      })()}
    </div>
  );
};
