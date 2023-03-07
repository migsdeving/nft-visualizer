// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const filterUnsupportedENS = (nfts: OwnedNft[]) => {
  return nfts.filter((nft) => nft.title);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OwnedNft[]>
) {
  const { address } = req.query;

  if (address) {
    const alchemy = new Alchemy(settings);
    const nfts = await alchemy.nft.getNftsForOwner(address as string);
    const filteredNfts = filterUnsupportedENS(nfts.ownedNfts);
    res.status(200).json(filteredNfts);
  }
  res.status(404);
}
