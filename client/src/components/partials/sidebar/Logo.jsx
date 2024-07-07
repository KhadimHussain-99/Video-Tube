import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import useSemiDark from "@/hooks/useSemiDark";

// import images
import MobileLogo from "@/assets/images/logo/logo.png";
import MobileLogoWhite from "@/assets/images/logo/logo.png";

const SidebarLogo = () => {
  const [isDark] = useDarkMode();
  // semi dark
  const [isSemiDark] = useSemiDark();
  // skin
  return (
    <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800  z-[9] py-3  px-4`}
    >
      <Link to="/">
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <div className="w-10 p-1 bg-slate-500 rounded-full">
                <img
                  className="w-full object-cover "
                  src={MobileLogo}
                  alt="logo"
                />
              </div>
            ) : (
              <img
                className="w-8 object-cover"
                src={MobileLogoWhite}
                alt="logo"
              />
            )}
          </div>

          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              PlayTube
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLogo;
