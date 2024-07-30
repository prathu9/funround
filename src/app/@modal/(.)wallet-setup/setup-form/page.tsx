import ModalOverlay from "@/components/ModalOverlay";
import Portal from "@/components/Portal";
import WalletSetUp from "@/components/WalletSetUpForm";

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
