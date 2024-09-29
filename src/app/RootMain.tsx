"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BalanceProvider from "@/context/balance-context";
import RouterProvider from "@/context/router-context";
import TanstackProvider from "@/context/tanstack-provider";
import UserProvider from "@/context/user-context";
import WalletProvider from "@/context/wallet-context";

// separate root component to use context provider
const RootMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackProvider>
      {/* user detail provider with login state */}
      <UserProvider>
        {/* wallet detail provider */}
        <WalletProvider>
          {/* wallet balance provider */}
          <BalanceProvider>
            {/* router detail provider */}
            <RouterProvider>
             {children}
            </RouterProvider>
          </BalanceProvider>
        </WalletProvider>
      </UserProvider>
    </TanstackProvider>
  );
};

export default RootMain;
