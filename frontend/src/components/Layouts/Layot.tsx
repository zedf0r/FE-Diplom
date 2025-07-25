import { Header, Footer } from "../";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
