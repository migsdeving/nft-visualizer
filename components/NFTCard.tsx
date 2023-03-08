import { convertIPFSLink } from "@/utils";
import { Dispatch, SetStateAction } from "react";

interface NFTCardProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setModalData: Dispatch<SetStateAction<ModalData>>;
  contractAddress: string;
  title: string;
  description: string;
  tokenId: string;
  ownerAddress: string;
  mediaFormat: string;
  mediaURL: string;
  tokenType: string;
  balance: number;
  contractName?: string;
}

const NFTCard = ({
  setOpenModal,
  setModalData,
  contractAddress,
  title,
  description,
  tokenId,
  ownerAddress,
  mediaFormat,
  mediaURL,
  tokenType,
  balance,
  contractName,
}: NFTCardProps) => {
  return (
    <div
      className="card w-64 md:w-80 xl:w-90  bg-base-100 shadow-xl cursor-pointer transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105  duration-150"
      onClick={() => {
        setOpenModal(true);
        setModalData({
          collectionName: contractName || title,
          collectionDescription: description,
          tokenName: title,
          owner: ownerAddress,
          contractAddress: contractAddress,
          tokenId: tokenId,
          imageURL: convertIPFSLink(mediaURL),
        });
      }}
    >
      <figure className="card w-64 h-64 md:w-80 md:h-80 xl:h-90 xl:w-90 bg-base-100 shadow-xl">
        {mediaFormat !== "mp4" ? (
          <img
            className="object-cover w-full h-full"
            src={convertIPFSLink(mediaURL)}
            alt={`${tokenId}-${contractAddress}`}
            fill
          />
        ) : (
          <video className="object-cover w-full h-full" controls>
            <source src={mediaURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </figure>
      <div className="card-body bg-black rounded-b-2xl">
        <h2 className="card-title text-sm lg:text-xl justify-center">
          {tokenType === "ERC1155" ? title : contractName}
        </h2>
        <p className="text-md lg:text-lg">
          {tokenType === "ERC1155" ? `x${balance}` : title}
        </p>
      </div>
    </div>
  );
};
export default NFTCard;
