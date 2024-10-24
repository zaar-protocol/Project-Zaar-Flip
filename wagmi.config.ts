import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import {mainnet } from "wagmi/chains";
// import {abi} from "@/abis/abi.json";
import {abi} from "@/abis/abi"

export default defineConfig({
    out: "generated.ts",
    contracts: [
        {
            name: "zaarflip",
            address: "0x397BFd2415B7688D9e65748c5E8066284284345E",
            abi:abi
        },
        {
            name:"initiaToken",
            abi:erc20Abi,
            address:"0x58dA30dA557A48ab0c6941699baFFA01401aea64",
        },
        {
            name: "erc20",
            abi: erc20Abi,
        },
        
    ],
    plugins: [
        react(),
    ],
    
    
});

/*
    plugins: [
        etherscan({
            apiKey: "HFV1I6KYJZFJGPE9E3AKMG6IRH9YUZV97N",//process.env.ETHERSCAN_API_KEY!,
            chainId: mainnet.id,
            contracts: [
                {
                    name: "zaarFlip",
                    address: {[mainnet.id]: "0x944330f3D4A425BEB9A24B8BAdd054f7B749e2f8",
                }
                },
                
            ],
        }),
        react(),
    ],*/