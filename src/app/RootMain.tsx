"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BalanceProvider from "@/context/balance-context";
import UserProvider from "@/context/user-context";
import WalletProvider from "@/context/wallet-context";

const RootMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <WalletProvider>
        <BalanceProvider>
          <Header />
            <div className="min-h-[calc(100vh_-_180px)]">{children}</div>
          <Footer />
        </BalanceProvider>
      </WalletProvider>
    </UserProvider>
  );
};

export default RootMain;
