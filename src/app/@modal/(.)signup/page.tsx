import SignUp from "@/components/auth/SignUp";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";


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
