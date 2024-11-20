import Footer from "@/components/Footer";
import { Header } from "@/components/header";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
//import {approveInitiaToken, initiaTokenAddress, } from  "@/generated";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from 'wagmi';
import { useContractRead } from 'wagmi';
//import { zaarStakingAbi } from '../../abis/abi';
import { formatEther } from 'viem';

export default function Bridge() {


    return (    
        <div className="w-screen min-h-screen ">
            <Header />
            {/* Updated background div */}
            <div 
                style={{ backgroundImage: "url('/ZAAR-Bridge.png')" }} 
                className="fixed right-0 top-0 w-full h-full bg-cover bg-center -z-10 bg-black"
            >
            </div>

            <div className="flex flex-col items-center justify-center h-screen gap-6">
                {/*Back to home button*/    }
                <Link href="/">
                    <Link href="/" className="hover:text-white text-gray px-4 py-2 flex flex-row items-center justify-center gap-2 transition-all duration-300">
                        <FaArrowLeft />
                        Back to Home
                    </Link>
                </Link>
                <div className="flex flex-row items-center justify-center gap-4">
                    {/*Initia Logo Coin*/}
                    <Image 
                      src="/zaarcoin.png" 
                      alt="Initia Logo Coin" 
                      width={50} 
                      height={50}
                      className="drop-shadow-[0_0_5px_rgba(255,255,255,1)] h-[80px] w-[80px]"
                    />
                    <h1 className="text-4xl text-white uppercase">Bridge ZAAR</h1>

                </div>
                <div className=" flex flex-col items-center justify-center gap-4">
                    <div className="flex text-sm flex-col items-center text-white justify-center gap-2">
                        <p className="text-white">Bridge ZAAR from ETH Mainnet to the 
                        <span className="text-yellow"> ZAAR Chain - an EVM Minitia</span></p>
                        <p className="text-center">Powered by LayerZero</p>
                    </div>
                    
                    
                </div>
                <div className="flex flex-col md:flex-row w-full w-full md:w-[70%] lg:w-[50%] max-w-[700px] items-center justify-center gap-4">
                   
                   <div className="flex flex-col items-center justify-center w-[90%]  h-full ">
                    <div className="bg-black bg-opacity-70 text-yellow flex flex-row items-start justify-start w-full">
                        <div className="flex flex-col ">
                            <button 
                            className={` px-4 py-2 rounded-md uppercase text-lg md:text-2xl`}
                        >
                            Bridge
                        </button>
                        <div className={`h-[2px] w-full bg-yellow`}></div>
                        </div>

                        

                        
                    </div>
                        <div className="flex flex-col bg-white bg-opacity-5 backdrop-blur-sm w-full items-center justify-center p-6 gap-6">
                        <div className="flex flex-col w-full items-center justify-center gap-6">
                            <div className="flex flex-col items-start justify-center w-full gap-2">
                                <div className="flex flex-row items-center justify-between gap-2 text-white p-2 w-full ">
                                    <div className="flex flex-col gap-4">
                                        <p className="text-white text-lg md:text-2xl">From </p>
                                        <div className="flex flex-row items-center justify-center gap-4">
                                            <Image src="/EthIcon.png" alt="Initia Logo Coin" width={40} height={40} />
                                            <p className="text-white  text-lg md:text-2xl uppercase">Ethereum</p>
                                        </div>
                                    </div>
                                    <Image className="w-[20px] h-[25px] lg:w-[25px] lg:h-[30px] mt-[40px] " src="/arrow.png" alt="Bridge Zaar" width={30} height={30} />
                                    <div className="flex flex-col gap-4">
                                        <p className="text-white text-lg md:text-2xl">To </p>
                                        <div className="flex flex-row items-center justify-center gap-4">
                                            <Image src="/ZaarIcon.png" alt="Initia Logo Coin" width={40} height={40} />
                                            <p className="text-white text-lg md:text-2xl">ZAAR</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-center w-full gap-2">
                                <div className="flex flex-row items-center justify-between gap-2 bg-black border-2 w-full border-hoverGray p-2">
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <Image src="/zaarcoin.png" alt="Initia Logo Coin" className="w-[20px] h-[20px]" width={30} height={30} />
                                        <p className="text-white">ZAAR</p>
                                    </div>
                                    <div className="flex flex-row items-center justify-center w-[100px]">
                                    <input 
                                        className=" bg-black  text-white focus:outline-none w-[50%]"
                                        placeholder="0.00"
                                    />
                                    <button 
                                        className="text-black bg-white p-1 px-2 text-xs  hover:bg-gray-200 transition-colors"
                                        onClick={() => {
                                            // Add logic to set max amount
                                        }}
                                    >
                                        Max
                                    </button>
                                    </div>  
                                </div>
                                <p className="text-white">You have 0 ZAAR</p>
                            </div>
                        </div>
                        <button className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10">
                        Approve
                       </button>
                    </div>
                    
                    
                   </div>
                </div>
                
            </div>
        </div>
    )
}
