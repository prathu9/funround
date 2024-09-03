import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Profile from "@/components/user/Profile";

// profile page
const Page = () => {
 
  return (
    // Portal for profile modal
    <Portal>
      {/* modal for profile form */}
      <ModalOverlay>
        {/* profile form */}
        <Profile/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
