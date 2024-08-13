import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Withdraw from "@/components/wallet-setup/wallet-balance/Withdraw";



const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <Withdraw/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;