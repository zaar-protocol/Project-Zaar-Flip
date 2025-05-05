import { useState } from "react";
import { useSimulateInitiaTokenMint } from "@/generated";
import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import { config } from "@/config";
import Link from "next/link";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
export default function GetFundsModal() 
{
    const [isOpen, setIsOpen] = useState(false);
    async function mintZaar() {
        try {
            let myhash = await writeContract(config, mint!.request);
            toast.success("ZAAR minted successfully");
            console.log(myhash);
        } catch (error) {
            console.log(error);
            toast.error("Error minting ZAAR");
        }
    }
    const { address: addr } = useAccount();
    
    const {data:mint}: {data:any} = useSimulateInitiaTokenMint(
        {args:[
            addr ? addr : "0x0000000000000000000000000000000000000000",
            BigInt(100000000000),
        ]}
    );

  return (
  <div>
    <Toaster />
    <button className="gradient-button mb-4 bg-yellow text-black rounded rounded-md hover:bg-darkYellow hover:scale-105 transition-all duration-300 px-4 py-2 rounded-md" onClick={() => setIsOpen(true)}>Get Funds</button>
    {
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 mx-auto flex justify-center items-center z-10">
                <div className="relative bg-black rounded rounded-md w-[90%] max-w-[500px] h-[70%] max-h-[650px] md:max-h-[550px] py-6 rounded-md">
                    <button className="absolute top-0 right-0 text-white text-2xl  w-4 h-4  mt-3 mr-2 flex justify-center items-center" onClick={() => setIsOpen(false)}>X</button>
                    <div className="relative pb-4 mb-4 border-b-2 border-gray">
                        <h2 className="ml-6 text-2xl text-yellow uppercase relative">
                            Get Testnet Funds
                            <div className="absolute bottom-[-16px] left-0 w-full h-[3px] -mb-0 bg-gray-600">
                                <div className="absolute top-0 left-0 w-[220px] h-full bg-yellow z-10"></div>
                            </div>
                        </h2>
                    </div>
                    <div className="flex flex-col p-4 gap-2 justify-center items-center ">
                        <div className="w-full h-[50px] flex flex-row justify-start items-center">
                            <p className="text-md uppercase text-yellow">
                                Step One
                            </p>
                        </div>
                        <div className="w-full h-[75px] md:h-[50px] flex flex-row justify-start items-center">
                            <p className="text-md text-white">
                                Claim Testnet INIT tokens from the Initia Faucet
                                to cover gas  on the Initia Testnet:
                            </p>
                        </div>
                        <Link href="https://faucet.testnet.initia.xyz/" target="_blank" className="mt-2 text-md text-black bg-light-gray hover:bg-white hover:text-black px-4 py-2 w-full text-center flex flex-row justify-center items-center gap-2 ">
                            Go To Faucet 
                            <FaArrowUpRightFromSquare className="w-4 h-4" />
                        </Link>
                        <div className="w-full h-[50px] flex flex-row justify-start items-center mt-4">
                            <p className="text-md uppercase text-yellow">
                                Step Two
                            </p>
                        </div>
                        <div className="w-full h-[75px] md:h-[50px] flex flex-row justify-start items-center">
                            <p className="text-md text-white">
                                Claim Testnet ZAAR Tokens to use playing 
                                Zaar Games on the Initia Testnet:
                            </p>
                        </div>
                        <button onClick={() => mintZaar()}  className="mt-2 text-md text-black bg-light-gray hover:bg-white hover:text-black px-4 py-2 w-full text-center flex flex-row justify-center items-center gap-2 ">
                            Claim Testnet ZAAR
                        </button>
                        <span className="flex flex-col md:flex-row justify-center items-center text-center gap-2 text-md text-light-gray">
                            Congrats! You are now ready to go play{" "}
                            <Link href="/zaar-flip" className="text-gray hover:text-yellow flex items-center gap-2">
                                Zaar Flip <FaArrowRight className="w-4 h-4" />
                            </Link>
                        </span>
                    </div>
                    
                </div>
            </div>
        )
    }
  </div>
);
}