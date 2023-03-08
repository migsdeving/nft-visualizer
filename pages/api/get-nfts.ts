import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OwnedNft[]>
) {
  const { address } = req.query;

  if (address) {
    const alchemy = new Alchemy(settings);
    const nfts = await alchemy.nft.getNftsForOwner(address as string);
    res.status(200).json(nfts.ownedNfts);
  }
  res.status(404);
}
