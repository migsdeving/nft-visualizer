import { OwnedNft } from "alchemy-sdk";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";
import NFTCard from "./NFTCard";

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
    <div className="flex justify-center p-5">
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 font-mono text-white text-sm text-center font-bold rounded-lg">
        {NFTS &&
          NFTS.map(
            (NFT, index) =>
              NFT.media[0]?.format && (
                <NFTCard
                  key={index}
                  setOpenModal={setOpenModal}
                  setModalData={setModalData}
                  contractName={NFT.contract.name}
                  contractAddress={NFT.contract.address}
                  title={NFT.title}
                  description={
                    NFT.contract.openSea?.description || NFT.description
                  }
                  tokenId={NFT.tokenId}
                  ownerAddress={address}
                  mediaFormat={NFT.media[0].format}
                  mediaURL={NFT.media[0].raw}
                  tokenType={NFT.tokenType}
                  balance={NFT.balance}
                />
              )
          )}
        {openModal && <Modal {...modalData} setOpenModal={setOpenModal} />}
      </div>
    </div>
  );
};
export default NFTList;
