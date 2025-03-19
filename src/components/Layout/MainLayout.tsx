import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <>
      <nav>Navigation</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
