import { WalletContext } from "@/context/wallet-context"
import { createWallet } from "@/services/walletServices"
import { CreateWalletDataType } from "@/type/walletRequestType"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"

// hook to create wallet 
export const useCreateWallet = () => {
    const {setWalletDetail} = useContext(WalletContext)
    return useMutation({
        mutationFn: (walletData: CreateWalletDataType) => createWallet(walletData),
        onSuccess: (data) => {
            console.log("data", data);
            setWalletDetail({
                walletId: data.data.walletId
            })
        }
    })
}