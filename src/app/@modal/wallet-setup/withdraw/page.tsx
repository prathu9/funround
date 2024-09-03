import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Withdraw from "@/components/wallet-setup/wallet-balance/Withdraw";


// withdraw form page
const Page = () => {
  return (
    // portal for withdraw modal
    <Portal>
      {/* withdraw modal */}
      <ModalOverlay>
        {/* withdraw form */}
        <Withdraw/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
