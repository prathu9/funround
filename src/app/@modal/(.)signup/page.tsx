import ModalOverlay from "@/components/ModalOverlay";
import Portal from "@/components/Portal";
import SignUp from "@/components/SignUp";

const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <SignUp/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
