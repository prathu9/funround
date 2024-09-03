import TermsOfUseViewOnly from "@/components/auth/TermsOfUseViewOnly";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";

// terms page
const Page = () => {
  return (
    // portal for terms of use page
    <Portal>
      {/* modal for terms of use */}
      <ModalOverlay>
        {/* terms of use view only - without agree button */}
        <TermsOfUseViewOnly/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
