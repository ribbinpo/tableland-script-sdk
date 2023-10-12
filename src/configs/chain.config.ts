// chain support: https://docs.tableland.xyz/fundamentals/chains/ethereum
// collection_link: https://docs.tableland.xyz/fundamentals/architecture/table-token
export const chainConfig = {
  // testnet
  "mumbai": {
    chainId: 80001,
    rpc: "https://polygon-mumbai-bor.publicnode.com",
    blockExplorer: "https://testnets.opensea.io/collection/tableland-tables-mumbai",
  }
} as const;