import Login from "@/components/auth/Login";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";


const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <Login/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
