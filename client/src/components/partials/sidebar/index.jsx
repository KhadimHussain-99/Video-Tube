import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems } from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import svgRabitImage from "@/assets/images/svg/rabit.svg";

const Sidebar = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  return (
    <div
      className={`sidebar-wrapper bg-white dark:bg-slate-800 w-[200px] shadow-sm`}
    >
      <SidebarLogo />
      {/* <div
          className={`h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
            scroll ? " opacity-100" : " opacity-0"
          }`}
        ></div> */}

      <SimpleBar
        className="sidebar-menu pt-4 px-4 h-full"
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <Navmenu menus={menuItems} />
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
