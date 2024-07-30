import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import SetUpEmailConfirmation from "@/components/wallet-setup/SetUpEmailConfirmation";


const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <SetUpEmailConfirmation/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
