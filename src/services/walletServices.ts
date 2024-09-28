import { CreateWalletDataType, CreateWalletResponseDataType } from "@/type/walletRequestType";
import axiosInstance from "./api";

// function to send request to create wallet
export const createWallet = async (walletData: CreateWalletDataType) => {

    const formData = new FormData();
    

    const documentFrontSide = walletData.documentFrontSide[0];
    const documentBackSide = walletData.documentBackSide[0];
    formData.append("documentFrontSide", documentFrontSide);
    formData.append("documentBackSide", documentBackSide);
    Object.keys(walletData)
    .forEach((key) => {
      if(key !== "documentFrontSide" && key !== "documentBackSide"){
        formData.append(key, (walletData as Record<string, any>)[key])
      }
    })

    return (await axiosInstance.post<CreateWalletResponseDataType>("wallet/create", formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })).data;
}