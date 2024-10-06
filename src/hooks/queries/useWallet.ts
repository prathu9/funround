import { UserContext } from "@/context/user-context"
import { associateWallet, createWallet } from "@/services/walletServices"
import { AssociateWalletDataType, CreateWalletDataType } from "@/type/walletRequestType"
import { getWalletAddress } from "@/utils/wallet-utils"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"

// hook to create wallet 
export const useCreateWallet = () => {
    const { walletDetail, setWalletDetail } = useContext(UserContext);
    const { mutate: associateMutate } = useAssociateWallet();
    return useMutation({
        mutationFn: (walletData: CreateWalletDataType) => createWallet(walletData),
        onSuccess: async (walletResData) => {
            console.log("create wallet", walletResData);

            try {
                const walletAddress = await getWalletAddress();
                if (!walletAddress) {
                    throw new Error("Wallet address not found");
                }
                setWalletDetail({
                    ...walletDetail,
                    walletId: walletResData.data.walletId,
                    walletAddress: walletAddress
                })
                associateMutate({ walletAddress })
            }
            catch (error) {
                console.log("err", error);
                setWalletDetail({
                    ...walletDetail,
                    walletId: walletResData.data.walletId
                })
            }
        }
    })
}

// hook to associate wallet
export const useAssociateWallet = () => {
    return useMutation({
        mutationFn: (walletAddressData: AssociateWalletDataType) => associateWallet(walletAddressData),
        onSuccess: (associateResData) => {
            console.log("associate wallet", associateResData);
        }
    })
}