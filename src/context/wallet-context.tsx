import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react"

type WalletDetailType = {
    email: string,
    firstname: string,
    lastname: string,
}

type WalletContextType = {
    walletDetail: WalletDetailType,
    setWalletDetail: Dispatch<SetStateAction<WalletDetailType>>
}

export const WalletContext = createContext<WalletContextType>({
    walletDetail:{
        email: "",
        firstname: "",
        lastname: ""
    },
    setWalletDetail: () => {}
})



type WalletProviderProps = {
    children: ReactNode
}

const WalletProvider = ({children}: WalletProviderProps) => {
    const [walletDetail, setWalletDetail] = useState<WalletDetailType>({
        email: "",
        firstname: "",
        lastname: ""
    });

    useEffect(() => {
        const walletDetailData = localStorage.getItem("wallet-detail");

        if(walletDetailData){
            const parsedWalletDetailData = JSON.parse(walletDetailData);
            setWalletDetail(parsedWalletDetailData);
        }
    }, [])

    return(
        <WalletContext.Provider value={{walletDetail, setWalletDetail}}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider;