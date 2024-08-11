import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import TopUp from "@/components/wallet-setup/top-up/TopUp";



const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <TopUp/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
