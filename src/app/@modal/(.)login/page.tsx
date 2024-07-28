import Login from "@/components/Login";
import ModalOverlay from "@/components/ModalOverlay";
import Portal from "@/components/Portal";

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
