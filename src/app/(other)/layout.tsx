import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const OtherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* header component of page */}
      <Header />
      {/* page content */}
      <div className="min-h-[calc(100vh_-_180px)]">{children}</div>
      {/* footer component of page */}
      <Footer />
    </>
  );
};

export default OtherLayout;
