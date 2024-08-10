import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import WalletSetUp from "@/components/wallet-setup/WalletSetUpForm";


const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <WalletSetUp/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
