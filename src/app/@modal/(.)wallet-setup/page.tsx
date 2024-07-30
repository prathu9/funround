import ModalOverlay from "@/components/ModalOverlay";
import Portal from "@/components/Portal";
import SetUpEmailConfirmation from "@/components/SetUpEmailConfirmation";

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
