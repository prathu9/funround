import { WalletItemType } from "@/components/wallet-setup/wallet-balance/WalletBalance";

// function to filter out max value crypto
export const getMaxValueCrypto = (walletItems: WalletItemType[]) => {
    if(walletItems.length === 0){
        return walletItems[0];
    }

    let maxValueCrypto = walletItems[0]; // initialize max value with first element

    // loop through walletItems, check and update maxValue
    walletItems.forEach((crypto) => {
        if(parseFloat(crypto.valueInDollars) > parseFloat(maxValueCrypto.valueInDollars)){
            maxValueCrypto = crypto;
        }
    });

    return maxValueCrypto;
}