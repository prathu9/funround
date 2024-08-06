import ResetPassword from "@/components/auth/ResetPassword";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";

const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <ResetPassword/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
