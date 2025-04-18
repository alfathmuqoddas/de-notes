import { Outlet } from "react-router";
import Navbar from "../Navbar";
import { ModeToggle } from "../mode-toggle";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-8 mx-auto max-w-7xl px-4">
        <Outlet />
      </main>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </>
  );
};

export default MainLayout;
