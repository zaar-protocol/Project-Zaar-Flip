import { FlipAbi } from "../abis/Flip-abi";
import { ethers } from "ethers";

const erc20Abi = [
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 value) returns (bool)",
    "function approve(address spender, uint256 value) returns (bool)",
    "function transferFrom(address from, address to, uint256 value) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)"
  ];

export const erc20ContractInterface = new ethers.Interface(erc20Abi);
export const flipContractInterface = new ethers.Interface(FlipAbi);
