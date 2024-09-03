import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import WalletSetUp from "@/components/wallet-setup/WalletSetUpForm";

// set up form page
const Page = () => {
  return (
    // portal for wallet setup modal
    <Portal>
      {/* modal for wallet setup */}
      <ModalOverlay>
        {/* wallet set up form */}
        <WalletSetUp/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
