import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import SetUpEmailConfirmation from "@/components/wallet-setup/SetUpEmailConfirmation";

// setup email confirmation page
const Page = () => {
  return (
    // portal for set up email confirmation
    <Portal>
      {/* modal for set up email confirmation*/}
      <ModalOverlay>
        {/* set up email confirmation form */}
        <SetUpEmailConfirmation/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
