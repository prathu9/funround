import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Profile from "@/components/user/Profile";


const Page = () => {
  console.log("check")
  return (
    <Portal>
      <ModalOverlay>
        <Profile/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
