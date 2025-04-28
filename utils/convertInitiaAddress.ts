import { bech32 } from "bech32";

export const convertInitiaAddress = (initiaAddress: string) => {
    if (initiaAddress?.match(/^init[a-zA-Z0-9]{38,39}$/)) {
      const { words: decodedWords } = bech32.decode(initiaAddress);
      return "0x" + Buffer.from(bech32.fromWords(decodedWords)).toString("hex");
    }
    return initiaAddress;
  };

  export const convertToInitiaAddress = (evmAddress: string) => {
    if (evmAddress?.match(/^0x[a-fA-F0-9]{40}$/)) {
      const words = bech32.toWords(Buffer.from(evmAddress.slice(2), 'hex'));
      return bech32.encode('init', words);
    }
    return evmAddress;
  };