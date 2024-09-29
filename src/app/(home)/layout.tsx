import HomeFooter from "@/components/layout/HomeFooter";
import HomeHeader from "@/components/layout/HomeHeader";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <HomeHeader />
      <div className="h-full min-h-screen">{children}</div>
      <HomeFooter />
    </div>
  );
};


export default HomeLayout;
