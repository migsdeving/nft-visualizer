import { convertIPFSLink } from "@/utils";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface NFTCardProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setModalData: Dispatch<SetStateAction<ModalData>>;
  contractName: string;
  contractAddress: string;
  title: string;
  description: string;
  tokenId: string;
  ownerAddress: string;
  mediaFormat: string;
  mediaURL: string;
  tokenType: string;
  balance: number;
}

const NFTCard = ({
  setOpenModal,
  setModalData,
  contractName,
  contractAddress,
  title,
  description,
  tokenId,
  ownerAddress,
  mediaFormat,
  mediaURL,
  tokenType,
  balance,
}: NFTCardProps) => {
  return (
    <div
      className="card w-64 md:w-80 xl:w-90 2xl:w-96 bg-base-100 shadow-xl cursor-pointer transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105  duration-150"
      onClick={() => {
        setOpenModal(true);
        setModalData({
          collectionName: contractName,
          collectionDescription: description,
          tokenName: title,
          owner: ownerAddress,
          contractAddress: contractAddress,
          tokenId: tokenId,
          imageURL: convertIPFSLink(mediaURL),
        });
      }}
    >
      <figure className="card w-64 h-64 md:w-80 md:h-80 xl:h-90 2xl:h-96 xl:w-90 2xl:w-96 bg-base-100 shadow-xl">
        {mediaFormat !== "mp4" ? (
          <Image
            className="object-cover"
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
        <h2 className="card-title text-xl justify-center">
          {tokenType === "ERC1155" ? title : contractName}
        </h2>
        <p className="text-lg">
          {tokenType === "ERC1155" ? `x${balance}` : title}
        </p>
      </div>
    </div>
  );
};
export default NFTCard;
