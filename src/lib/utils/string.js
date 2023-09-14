// Shorthand wallet address
export const getShortAddress = (address) => {
    if (!address) {
        return '';
    }

    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
};