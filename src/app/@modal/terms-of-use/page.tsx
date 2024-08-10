import Terms from "@/components/auth/terms";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";


const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <Terms/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
