"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import UserProvider from "@/context/user-context";
import { ReactNode } from "react";

const RootMain = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UserProvider>
      <Header />
      <div className="min-h-[calc(100vh_-_180px)]">
        {children}
      </div>
      <Footer />
    </UserProvider>
  );
};

export default RootMain;
