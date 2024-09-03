import ResetPassword from "@/components/auth/ResetPassword";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";

//  Reset Password page
const Page = () => {
  return (
    // portal for reset password modal
    <Portal>
      {/* modal for reset password */}
      <ModalOverlay>
        {/* Reset password component */}
        <ResetPassword/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
