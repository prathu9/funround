import TermsOfUseViewOnly from "@/components/auth/TermsOfUseViewOnly";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";


const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <TermsOfUseViewOnly/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
