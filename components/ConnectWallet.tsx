import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import React from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAccount } from "@wagmi/core";
import { config } from "./../config";
import { FaWallet } from "react-icons/fa";
import { FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";

export const ConnectWallet = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { disconnect } = useDisconnect();
  const [currentVanity, setCurrentVanity] = React.useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState<string>("");
  const addr = getAccount(config).address;
  useEffect(() => {
    if (!addr) return; // If address is null or undefined, do nothing
    // Fetch profile data and generate profile image
    fetch(`./api/getProfile?ownerAddress=${addr}`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.uName) setCurrentVanity(data.uName);
        if (data?.profPicUrl) setCurrentProfileImage(data.profPicUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [addr]);
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="bg-yellow text-black flex flex-row items-center justify-center space-x-2 px-4 py-2 text-sm rounded-sm font-bold uppercase gradient-button hover:bg-white border-2 transition duration-500"
                  >
                    <FaWallet />
                    <p>Connect</p>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center text-gray -mr-5 ">
                  <div className="group">
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
                  </div>

                  <div
                    className="group  relative z-50"
                    onMouseEnter={() => {
                      setProfileMenuOpen(true);
                    }}
                  >
                    <button
                      type="button"
                      onClick={openAccountModal}
                      className="flex items-center justify-center rounded cursor-pointer px-2 py-2 text-sm font-medium text-gray-700 border border-dark-gray-all md:flex mr-1 max-w-xs gap-2"
                    >
                      <div className="truncate text-yellow-400">
                        {account.displayName}
                      </div>
                    </button>
                    <div
                      onMouseLeave={() => {
                        setProfileMenuOpen(false);
                      }}
                      className={`z-50 dropdown-content absolute left-0 translate-x-[-65px] w-[calc(100%+65px)] bg-black border border-dark-gray-all rounded-sm shadow-lg transition-opacity duration-300 ${profileMenuOpen ? "block" : " hidden  hover:block hover:visible hover:opacity-100"} z-50 uppercase`}
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white flex flex-row z-50"
                      >
                        <FaUser className="mr-2" />
                        Profile
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
                          disconnect();
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
      }}
    </ConnectButton.Custom>
  );
};
