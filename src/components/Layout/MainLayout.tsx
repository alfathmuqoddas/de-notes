import { Outlet } from "react-router";
import Navbar from "../Navbar";
import { ModeToggle } from "../mode-toggle";
import ProtectedRoutes from "./ProtectedRoutes";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ProtectedRoutes>
        <Outlet />
      </ProtectedRoutes>

      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </>
  );
};

export default MainLayout;
