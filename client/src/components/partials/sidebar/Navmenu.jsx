import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";
import { useDispatch } from "react-redux";
import useMobileMenu from "@/hooks/useMobileMenu";
import useSidebar from "@/hooks/useSidebar";

const Navmenu = ({ menus }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const location = useLocation();
  const locationName = location.pathname.replace("/", "");
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const dispatch = useDispatch();
  const [collapsed, setMenuCollapsed] = useSidebar();

  useEffect(() => {
    let submenuIndex = null;
    menus.map((item, i) => {
      if (!item.child) return;
      if (item.link === locationName) {
        submenuIndex = null;
      } else {
        const ciIndex = item.child.findIndex(
          (ci) => ci.childlink === locationName
        );
        if (ciIndex !== -1) {
          submenuIndex = i;
        }
      }
    });
    document.title = `Play Tube | ${locationName}`;

    setActiveSubmenu(submenuIndex);
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [location]);

  return (
    <>
      <ul className="relative space-y-2">
        {menus.map((item, i) => (
          <li
            key={i}
            className={` single-sidebar-menu 
            ${!collapsed && "border rounded-md dark:border-slate-700"}
              ${item.child ? "item-has-children" : ""}
              ${activeSubmenu === i ? "open" : ""}
              ${locationName === item.link ? "menu-item-active" : ""}`}
          >
            {/* single menu with no childred*/}
            {!item.child && !item.isHeadr && (
              <NavLink className="menu-link" to={item.link}>
                <span className="menu-icon flex-grow-0">
                  <Icon icon={item.icon} />
                </span>
                <div className="text-box flex-grow">{item.title}</div>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </NavLink>
            )}
            {/* only for menulabel */}
            {item.isHeadr && !item.child && (
              <div className="menulabel">{item.title}</div>
            )}
            {/*    !!sub menu parent   */}
            {item.child && (
              <div
                className={`menu-link ${
                  activeSubmenu === i
                    ? "parent_active not-collapsed"
                    : "collapsed"
                }`}
                onClick={() => toggleSubmenu(i)}
              >
                <div className="flex-1 flex items-start">
                  <span className="menu-icon">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box">{item.title}</div>
                </div>
                <div className="flex-0">
                  <div
                    className={`menu-arrow transform transition-all duration-300 ${
                      activeSubmenu === i ? " rotate-90" : ""
                    }`}
                  >
                    <Icon icon="heroicons-outline:chevron-right" />
                  </div>
                </div>
              </div>
            )}
            <Collapse isOpened={activeSubmenu === i}>
              <ul className="sub-menu ">
                {item.child?.map((subItem, j) => (
                  <li key={j} className="block pl-4 pr-1 mb-4 first:mt-4">
                    <NavLink to={subItem.childlink}>
                      {({ isActive }) => (
                        <span
                          className={`${
                            isActive
                              ? " text-black dark:text-white font-medium"
                              : "text-slate-600 dark:text-slate-300"
                          } text-sm flex space-x-3 items-center transition-all duration-150`}
                        >
                          <span
                            className={`${
                              isActive
                                ? " bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                                : ""
                            } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none`}
                          ></span>
                          <span className="flex-1">{subItem.childtitle}</span>
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Collapse>
          </li>
        ))}
        <li
          className={` single-sidebar-menu 
            ${!collapsed && "border rounded-md dark:border-slate-700"}
              ${locationName === "/support" ? "menu-item-active" : ""}`}
        >
          <NavLink className="menu-link" to={"/support"}>
            <span className="menu-icon flex-grow-0">
              <Icon icon={"ph:question"} />
            </span>
            <div className="text-box flex-grow">Support</div>
            {/* {item.badge && <span className="menu-badge">{item.badge}</span>} */}
          </NavLink>
        </li>
        <li
          className={` single-sidebar-menu 
            ${!collapsed && "border rounded-md dark:border-slate-700"}
              ${locationName === "/settings" ? "menu-item-active" : ""}`}
        >
          <NavLink className="menu-link" to={"/settings"}>
            <span className="menu-icon flex-grow-0">
              <Icon icon={"simple-line-icons:settings"} />
            </span>
            <div className="text-box flex-grow">Settings</div>
            {/* {item.badge && <span className="menu-badge">{item.badge}</span>} */}
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navmenu;
