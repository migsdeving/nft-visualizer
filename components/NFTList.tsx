import { convertIPFSLink } from "@/utils";
import { OwnedNft } from "alchemy-sdk";

const ENSAddress = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85";

interface NFTListProps {
  NFTS: OwnedNft[];
}

const NFTList = ({ NFTS }: NFTListProps) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-flow-row grid-cols-3 gap-10 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-pink rounded-lg">
        {NFTS &&
          NFTS.map((NFT) => (
            <div className="card w-96 bg-base-100 shadow-xl ">
              <figure className="">
                {NFT.rawMetadata?.image ? (
                  <img
                    className="object-cover w-full h-full"
                    src={convertIPFSLink(NFT.rawMetadata?.image)}
                    alt={`${NFT.tokenId}-${NFT.contract}`}
                  />
                ) : (
                  <></>
                )}
              </figure>
              <div className="card-body bg-black rounded-b-2xl">
                <h2 className="card-title  justify-center">
                  {NFT.tokenType === "ERC1155" ? NFT.title : NFT.contract.name}
                </h2>
                <p>
                  {NFT.tokenType === "ERC1155" ? `x${NFT.balance}` : NFT.title}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default NFTList;
