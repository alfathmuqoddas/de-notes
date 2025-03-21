import { Outlet } from "react-router";
import Navbar from "../Navbar";
import { ModeToggle } from "../mode-toggle";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <Outlet />
      </main>
      <div className="fixed bottom-1 right-1">
        <ModeToggle />
      </div>
    </>
  );
};

export default MainLayout;
