import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import {mainnet } from "wagmi/chains";
// import {abi} from "@/abis/abi.json";
import {abi, plinkoAbi, zaarStakingAbi} from "@/abis/abi"
import { FlipAbi } from "@/abis/Flip-abi";
import { ManualFlipAbi } from "@/abis/ManualFlip-abi";
import { StakingAbi } from "@/abis/Staking-abi";

export default defineConfig({
    out: "generated.ts",
    contracts: [
        {
            name: "zaarflip",
            abi:ManualFlipAbi,
            address: "0xC6011Ed45a6CC6aBaC80F9Cf17F5dcd3B83556EE",
        },
        {
            name:"initiaToken",
            abi:erc20Abi,
            address:"0x7Fb2A94A13186E3C338f0DA9728B4835D86b1a7B",
        },
        {
            name:"staking", 
            abi:StakingAbi,
            address:"0xD738a9ce3BCdBf3d93Ab3ada72c57dE71eA1091f",
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