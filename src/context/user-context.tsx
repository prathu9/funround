"use client";
import { useGetUser } from "@/hooks/queries/useAuth";

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { UserDetailType, WalletDetailType } from "./type";
import { connectWallet, getWalletAddress } from "@/utils/wallet-utils";
import { useAssociateWallet } from "@/hooks/queries/useWallet";

// type for user context
interface UserContextType {
  userDetail: UserDetailType;
  setUserDetail: Dispatch<SetStateAction<UserDetailType>>;
  walletDetail: WalletDetailType;
  setWalletDetail: Dispatch<SetStateAction<WalletDetailType>>;
  isFetchingUser: boolean;
}

// user context to store user information
export const UserContext = createContext<UserContextType>({
  userDetail: {
    userId: "",
    username: "",
    email: "",
    dateOfBirth: null,
    termsOfUse: false,
    emailVerified: false,
  },
  walletDetail: {
    walletId: "",
    walletAddress: null,
  },
  setWalletDetail: () => {},
  setUserDetail: () => {},
  isFetchingUser: false,
});

// props type for use provider
interface UserProviderProps {
  children: ReactNode;
}

// user provider
const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetail, setUserDetail] = useState<UserDetailType>({
    userId: "",
    username: "",
    email: "",
    dateOfBirth: null,
    termsOfUse: false,
    emailVerified: false,
  });

  const [walletDetail, setWalletDetail] = useState<WalletDetailType>({
    walletId: "",
    walletAddress: "",
  });

  const { data: userData, isFetching } = useGetUser({
    enabled: !Boolean(userDetail.email),
  });

  const {mutate: associateMutate} = useAssociateWallet();

  useEffect(() => {
    const connectWalletAsync = async () => {
      const walletAddress = await getWalletAddress();
      if (walletAddress) {
        setWalletDetail((prevWalletDetail) => ({
          ...prevWalletDetail,
          walletAddress,
        }));

        associateMutate({ walletAddress });
      }
    };

    if (userData) {
      const dateOfBirth = new Date(
        userData.data.dateOfBirth.split("/").reverse().join("/")
      );

      setUserDetail({
        userId: userData.data.userId,
        username: userData.data.username,
        email: userData.data.email,
        dateOfBirth: dateOfBirth,
        termsOfUse: userData.data.termsOfUse,
        emailVerified: true,
      });

      setWalletDetail((prevWalletDetail) => ({
        ...prevWalletDetail,
        walletId: userData.data.walletId,
      }));
console.log("check", userData.data.walletId)
      if (userData.data.walletId) {
        connectWalletAsync();
      }
    }
  }, [associateMutate, userData]);

  return (
    <UserContext.Provider
      value={{
        userDetail,
        setUserDetail,
        walletDetail,
        setWalletDetail,
        isFetchingUser: isFetching,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
