import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import TopUp from "@/components/wallet-setup/top-up/TopUp";

// page for topup
const Page = () => {
  return (
    // portal for top up modal
    <Portal>
      {/* top up modal */}
      <ModalOverlay>
        {/* top up form */}
        <TopUp/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
