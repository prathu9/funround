import ConfirmEmail from "@/components/Confirm";
import ModalOverlay from "@/components/ModalOverlay";
import Portal from "@/components/Portal";

const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <ConfirmEmail/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
