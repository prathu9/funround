import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react"

// wallet detail type
interface WalletDetailType {
    email: string,
    firstname: string,
    lastname: string,
}

// wallet context type
interface WalletContextType {
    walletDetail: WalletDetailType,
    setWalletDetail: Dispatch<SetStateAction<WalletDetailType>>
}

// wallet context to store wallet details
export const WalletContext = createContext<WalletContextType>({
    walletDetail:{
        email: "",
        firstname: "",
        lastname: ""
    },
    setWalletDetail: () => {}
})

// props type for wallet provider 
type WalletProviderProps = {
    children: ReactNode
}

// wallet context provider
const WalletProvider = ({children}: WalletProviderProps) => {
    const [walletDetail, setWalletDetail] = useState<WalletDetailType>({
        email: "",
        firstname: "",
        lastname: ""
    }); // wallet detail state

    useEffect(() => {
        // get wallet detail from localstorage of browser
        const walletDetailData = localStorage.getItem("wallet-detail");

        // check if wallet detail data is available and set wallet detail state
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