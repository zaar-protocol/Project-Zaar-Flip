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
            address: "0xA5E835BAAb3A78505dEA4369B3D862bFF90F1322",
        },
        {
            name:"initiaToken",
            abi:erc20Abi,
            address:"0xBdb128Cf29d40738875297E90aa42772D354c137",
        },
        // {
        //     name:"staking", 
        //     abi:StakingAbi,
        //     address:"0xb8909721F7D2b79C757B435e8cB1a9CF53aCf618",
        // },
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