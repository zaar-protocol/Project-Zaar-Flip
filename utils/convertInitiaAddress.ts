import { bech32 } from "bech32";

export const convertInitiaAddress = (initiaAddress: string) => {
    if (initiaAddress?.match(/^init[a-zA-Z0-9]{38,39}$/)) {
      const { words: decodedWords } = bech32.decode(initiaAddress);
      return "0x" + Buffer.from(bech32.fromWords(decodedWords)).toString("hex");
    }
    return initiaAddress;
  };
