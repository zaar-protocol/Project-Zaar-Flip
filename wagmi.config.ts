import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import {mainnet } from "wagmi/chains";
// import {abi} from "@/abis/abi.json";
import {abi, plinkoAbi, zaarStakingAbi} from "@/abis/abi"
import { zaarflipAbi } from "./generated";

export default defineConfig({
    out: "generated.ts",
    contracts: [
        {
            name: "zaarflip",
            abi:abi,
            address: "0x87F5f5c39649D3B9fc35E3448b27D536Bb1bF639",
        },
        {
            name:"initiaToken",
            abi:erc20Abi,
            address:"0x6f3790E91caf7B020f178aaB4482a2B1B5E9f45C",
        },
        {
            name:"staking", 
            abi:zaarStakingAbi,
            address:"0x78856b40369957A22b01e83a3727e6871Cc11539",
        },
        {
            name:"plinko",
            abi:plinkoAbi,
            address:"0x6283dA52Bce2D01C885d6977A5746fF7eA2e555D",
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