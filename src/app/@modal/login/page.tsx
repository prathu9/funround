import Login from "@/components/auth/Login";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";

// Page for login modal
const Page = () => {
  return (
    // Portal for login modal
    <Portal>
      {/* modal for login form */}
      <ModalOverlay>
        {/* login form */}
        <Login/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
