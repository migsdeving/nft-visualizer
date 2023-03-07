import { ENS_CONTRACT_ADRESS, truncateEthAddress } from "@/utils";
import { Dispatch, SetStateAction } from "react";

interface ModalProps extends ModalData {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({
  collectionName,
  collectionDescription,
  tokenName,
  owner,
  contractAddress,
  tokenId,
  imageURL,
  setOpenModal,
}: ModalProps) => {
  return (
    <>
      <div className="z-30 opacity-1 w-[50vw] h-[60vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <div className="card bg-base-100 shadow-xl object-cover w-full ">
          <button
            className="absolute top-3 right-4 btn btn-circle btn-outline"
            onClick={() => setOpenModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <figure className="px-10 pt-10">
            <img
              width={500}
              height={500}
              src={imageURL}
              alt={`${tokenId}-${contractAddress}`}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{collectionName}</h2>
            {contractAddress !== ENS_CONTRACT_ADRESS ? (
              <p className="text-xl">{tokenName}</p>
            ) : (
              <></>
            )}
            <p className="text-lg">{collectionDescription}</p>
            <p className="text-lg">
              <b>Owner:</b>{" "}
              <a href={`https://etherscan.io/address/${owner}`} target="_blank">
                <u>{truncateEthAddress(owner)}</u>
              </a>
            </p>

            <div className="card-actions">
              <a
                href={`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`}
                target="_blank"
              >
                <button className="btn btn-primary text-lg">Buy Now</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-black opacity-60 w-full h-full fixed inset-0  z-20"
        onClick={() => setOpenModal(false)}
      ></div>
    </>
  );
};
export default Modal;
