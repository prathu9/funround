"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import UserProvider from "@/context/user-context";
import { ReactNode } from "react";

const RootMain = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: ReactNode;
}) => {
  return (
    <UserProvider>
      <Header />
      <div className="min-h-[calc(100%_-_216px)]">{children}</div>
      {modal}
      <Footer />
    </UserProvider>
  );
};

export default RootMain;
