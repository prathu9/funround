import Login from "@/components/Login";
import ModalOverlay from "@/components/ModalOverlay";
import Portal from "@/components/Portal";
import Link from "next/link";

const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <Login/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
