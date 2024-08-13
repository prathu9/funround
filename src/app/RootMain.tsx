"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BalanceProvider from "@/context/balance-context";
import RouterProvider from "@/context/router-context";
import UserProvider from "@/context/user-context";
import WalletProvider from "@/context/wallet-context";

const RootMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <WalletProvider>
        <BalanceProvider>
          <RouterProvider>
            <Header />
            <div className="min-h-[calc(100vh_-_180px)]">{children}</div>
            <Footer />
          </RouterProvider>
        </BalanceProvider>
      </WalletProvider>
    </UserProvider>
  );
};

export default RootMain;
