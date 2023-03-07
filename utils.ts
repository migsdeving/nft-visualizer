export const ENS_CONTRACT_ADRESS = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85";

export const convertIPFSLink = (link: string) => {
  const IPFS_REGEX = /^ipfs:\/\/(.+)/;
  const match = link.match(IPFS_REGEX);
  if (match) {
    return `https://ipfs.io/ipfs/${match[1]}`;
  } else {
    return link;
  }
};

export const truncateEthAddress = (address: string) => {
  const prefix = address.slice(0, 5);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`;
};
