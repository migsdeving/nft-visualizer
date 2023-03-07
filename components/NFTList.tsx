import { convertIPFSLink } from "@/utils";
import { OwnedNft } from "alchemy-sdk";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";

const emptyModal: ModalData = {
  collectionName: "",
  collectionDescription: "",
  tokenName: "",
  owner: "",
  contractAddress: "",
  tokenId: "",
  imageURL: "",
};

interface NFTListProps {
  NFTS: OwnedNft[];
  address: string;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const NFTList = ({ NFTS, address, openModal, setOpenModal }: NFTListProps) => {
  const [modalData, setModalData] = useState<ModalData>(emptyModal);
  return (
    <div className="flex justify-center ">
      <div className="grid grid-flow-row grid-cols-3 gap-10 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-pink rounded-lg">
        {NFTS &&
          NFTS.map((NFT) => (
            <div
              className="card w-96 bg-base-100 shadow-xl cursor-pointer"
              onClick={() => {
                setOpenModal(true);
                setModalData({
                  collectionName: NFT.contract.name || NFT.title,
                  collectionDescription: NFT.description,
                  tokenName: NFT.title,
                  owner: address,
                  contractAddress: NFT.contract.address,
                  tokenId: NFT.tokenId,
                  imageURL: convertIPFSLink(
                    NFT.rawMetadata?.image || "placeholder.webp"
                  ),
                });
              }}
            >
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
                <h2 className="card-title text-xl justify-center">
                  {NFT.tokenType === "ERC1155" ? NFT.title : NFT.contract.name}
                </h2>
                <p className="text-lg">
                  {NFT.tokenType === "ERC1155" ? `x${NFT.balance}` : NFT.title}
                </p>
              </div>
            </div>
          ))}
        {/* modal */}
        {openModal ? (
          <Modal {...modalData} setOpenModal={setOpenModal} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default NFTList;
