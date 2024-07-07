import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import useWidth from "@/hooks/useWidth";
import useMenulayout from "@/hooks/useMenulayout";
import useMenuHidden from "@/hooks/useMenuHidden";
import MobileMenu from "../components/partials/sidebar/MobileMenu";
import useMobileMenu from "@/hooks/useMobileMenu";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
const Layout = () => {
  const { width, breakpoints } = useWidth();
  const [menuType] = useMenulayout();
  const [menuHidden] = useMenuHidden();
  // mobile menu
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      <Header
        className={
          width > breakpoints.xl ? "ltr:ml-[200px] rtl:mr-[200px]" : ""
        }
      />
      {menuType === "vertical" && width > breakpoints.lg && !menuHidden && (
        <Sidebar />
      )}

      <MobileMenu
        className={`${
          width < breakpoints.lg && mobileMenu
            ? "left-0 visible opacity-100  z-[9999]"
            : "left-[-300px] invisible opacity-0  z-[-999] "
        }`}
      />
      {width < breakpoints.lg && mobileMenu && (
        <div
          className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}
      <div
        className={`content-wrapper transition-all duration-150 ${
          width > 1024 ? "ltr:ml-[200px] rtl:mr-[200px]" : ""
        }`}
      >
        <div className="p-2 sm:p-4">
          <div>
            <Suspense fallback={<Loading />}>
              {/* <Breadcrumbs /> */}
              {<Outlet />}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
