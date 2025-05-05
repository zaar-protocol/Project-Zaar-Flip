import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import {mainnet } from "wagmi/chains";
// import {abi} from "@/abis/abi.json";
import {abi, plinkoAbi, zaarStakingAbi} from "@/abis/abi"
import { FlipAbi } from "@/abis/Flip-abi";
import { StakingAbi } from "@/abis/Staking-abi";

export default defineConfig({
    out: "generated.ts",
    contracts: [
        {
            name: "zaarflip",
            abi:FlipAbi,
            address: "0x9be15f31aC9043dca395958C7531Bd6EF0b6dEf0",
        },
        {
            name:"initiaToken",
            abi:erc20Abi,
            address:"0x7Fb2A94A13186E3C338f0DA9728B4835D86b1a7B",
        },
        {
            name:"staking", 
            abi:StakingAbi,
            address:"0x292CBeEc7108C5e214eF7365C68cc8B875980Ef4",
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