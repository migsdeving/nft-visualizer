// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.ETHERSCAN_API_KEY; // Replace with your Etherscan API key

const getAllNftTxs = async (address: string) => {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=1&endblock=99999999&sort=asc&apikey=${apiKey}`
    );
    const data = await response.json();
    const nftTxs = data.result;
    return nftTxs as NFTTransaction[];
  } catch (error) {
    console.error(error);
  }
};

const filterTransferedNfts = (
  nftTransactions: NFTTransaction[],
  address: string
) => {
  const transferredNfts = nftTransactions.filter(
    (transaction) => transaction.to !== address
  );

  const filteredNftTxs = nftTransactions.filter((nftTx) => {
    return !transferredNfts.some((filteredNftTx) => {
      return (
        filteredNftTx.contractAddress === nftTx.contractAddress &&
        filteredNftTx.tokenID === nftTx.tokenID
      );
    });
  });
  return filteredNftTxs;
};

const getOwnedNFTTxs = async (address: string) => {
  const allNftTxs = await getAllNftTxs(address);
  if (!allNftTxs) return;
  const filteredNftTxs = filterTransferedNfts(allNftTxs, address);
  return filteredNftTxs;
};

const getContractABI = async (contractAddress: string) => {
  try {
    const response = await fetch(
      `  https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
    );
    const data = await response.json();
    const contractABI = data.result;
    return contractABI;
  } catch (error) {
    console.error(error);
  }
};
const getTokenURI = async (
  tokenId: string,
  contractAddress: string,
  contractABI: [any]
) => {
  const provider = new ethers.EtherscanProvider("homestead", apiKey);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const tokenURI = await contract.tokenURI(tokenId);
  return tokenURI;
};

const getImageURL = async (tokenID: string, contractAddress: string) => {
  try {
    const contractABI = await getContractABI(contractAddress);
    const tokenURI = await getTokenURI(tokenID, contractAddress, contractABI);

    const response = await fetch(tokenURI);
    const data = await response.json();
    const imageURL = data.image;

    return imageURL;
  } catch (error) {
    console.error(error);
  }
};

const formatNFTData = async (addressNFTs: NFTTransaction[]) => {
  const nftData: NFTData[] = [];

  for (const tx of addressNFTs) {
    const imageURL = await getImageURL(tx.tokenID, tx.contractAddress);
    nftData.push({
      contractAddress: tx.contractAddress,
      tokenID: tx.tokenID,
      tokenName: tx.tokenName,
      tokenSymbol: tx.tokenSymbol,
      imageURL,
      description: "Description",
    });
  }

  return nftData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTData[]>
) {
  const { address } = req.query;
  if (address) {
    const formattedAddress = (address as string).toLowerCase();
    const addressNFTs = await getOwnedNFTTxs(formattedAddress);

    if (addressNFTs) {
      const formattedNFTData = await formatNFTData(addressNFTs);

      res.status(200).json(formattedNFTData);
    }
  }
  res.status(404);
}
