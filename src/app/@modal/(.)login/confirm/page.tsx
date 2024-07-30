import ConfirmEmail from "@/components/ConfirmEmail";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";

const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <ConfirmEmail forwardLink="/wallet-setup" backLink="/login"/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
