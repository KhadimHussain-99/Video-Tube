import React from "react";
import Icon from "@/components/ui/Icon";
import HorizentalMenu from "./Tools/HorizentalMenu";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useNavbarType from "@/hooks/useNavbarType";
import useMenulayout from "@/hooks/useMenulayout";
import useSkin from "@/hooks/useSkin";
import Logo from "./Tools/Logo";
import Profile from "./Tools/Profile";
import Notification from "./Tools/Notification";
import useRtl from "@/hooks/useRtl";
import useMobileMenu from "@/hooks/useMobileMenu";
import { useSelector } from "react-redux";

const Header = ({ className = "custom-class" }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();
  const { width, breakpoints } = useWidth();
  const [navbarType] = useNavbarType();
  // console.log("i am the type: " + navbarType);
  const navbarTypeClass = () => {
    switch (navbarType) {
      case "floating":
        return "floating";
      case "sticky":
        return "sticky top-0 z-[999]";
      case "static":
        return "static";
      case "hidden":
        return "hidden";
      default:
        return "sticky top-0";
    }
  };
  const [menuType] = useMenulayout();
  const [skin] = useSkin();
  const [isRtl] = useRtl();
  const { token } = useSelector((state) => state.auth);

  const [mobileMenu, setMobileMenu] = useMobileMenu();

  const handleOpenMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const borderSwicthClass = () => {
    if (skin === "bordered" && navbarType !== "floating") {
      return "border-b border-slate-200 dark:border-slate-700";
    } else if (skin === "bordered" && navbarType === "floating") {
      return "border border-slate-200 dark:border-slate-700";
    } else {
      return "dark:border-b dark:border-slate-700 dark:border-opacity-60";
    }
  };
  return (
    <header className={`${className} sticky top-0 z-[999] bg-secondary-main`}>
      <div
        className={`h-[72px] md:px-4 px-[15px] border-b border-white 
        ${borderSwicthClass()}
             ${
               menuType === "horizontal" && width > breakpoints.xl
                 ? "py-1"
                 : "py-3"
             }
        `}
      >
        <div className="flex justify-between items-center flex-wrap h-full">
          {/* For Vertical  */}

          {menuType === "vertical" && (
            <div className="flex-grow flex items-center flex-wrap md:space-x-4 space-x-2 rtl:space-x-reverse">
              {collapsed && width >= breakpoints.xl && (
                <button
                  className="text-xl"
                  onClick={() => setMenuCollapsed(!collapsed)}
                >
                  {isRtl ? (
                    <Icon icon="akar-icons:arrow-left" />
                  ) : (
                    <Icon icon="akar-icons:arrow-right" />
                  )}
                </button>
              )}
              {width < breakpoints.xl && <Logo />}
              {/* open mobile menu handlaer*/}
              {width < breakpoints.xl && width >= breakpoints.md && (
                <div
                  className="cursor-pointer text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" />
                </div>
              )}
              {width >= breakpoints.lg && (
                <div className="flex-grow flex items-center justify-center">
                  <div className="relative flex flex-wrap left-3 w-1/3 px-3.5 py-2.5 bg-secondary-main border text-white border-white">
                    <input
                      type="text"
                      className="flex-grow outline-none text-xs  pl-6 bg-transparent text-white placeholder:text-white rounded-l"
                      placeholder="Search"
                      name="search"
                    />

                    <Icon
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 xl:w-4 h-5 xl:h-4"
                      icon="mingcute:search-line"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {/* For Horizontal  */}
          {menuType === "horizontal" && (
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Logo />
              {/* open mobile menu handlaer*/}
              {width <= breakpoints.xl && (
                <div
                  className="cursor-pointer text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" />
                </div>
              )}
            </div>
          )}
          {/*  Horizontal  Main Menu */}
          {menuType === "horizontal" && width >= breakpoints.xl ? (
            <HorizentalMenu />
          ) : null}
          {/* Nav Tools  */}
          <div className="nav-tools flex items-center lg:space-x-4 space-x-3 rtl:space-x-reverse">
            {width >= breakpoints.md && token && <Notification />}
            {width >= breakpoints.md && <Profile />}
            {width <= breakpoints.md && (
              <div
                className="cursor-pointer text-2xl"
                onClick={handleOpenMobileMenu}
              >
                <Icon icon="heroicons-outline:menu-alt-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
