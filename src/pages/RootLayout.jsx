import { Outlet } from "react-router-dom";
import Nav from "../UI/Nav";
import Login from "../components/Login";

const RootLayout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
