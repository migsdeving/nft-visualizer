export const convertIPFSLink = (link: string) => {
  const IPFS_REGEX = /^ipfs:\/\/(.+)/;
  const match = link.match(IPFS_REGEX);
  if (match) {
    return `https://ipfs.io/ipfs/${match[1]}`;
  } else {
    return link;
  }
};
