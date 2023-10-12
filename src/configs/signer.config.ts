import { NonceManager } from "@ethersproject/experimental";
import { Wallet, getDefaultProvider } from "ethers";

export const getSigner = (rpc: string) => {
  const privateKey = process.env.PRIVATE_KEY || "";

  const wallet = new Wallet(privateKey);

  const provider = getDefaultProvider(rpc);

  const baseSigner = wallet.connect(provider);

  // automatically manage the nonce for the signer
  const signer = new NonceManager(baseSigner);

  return signer;
};
