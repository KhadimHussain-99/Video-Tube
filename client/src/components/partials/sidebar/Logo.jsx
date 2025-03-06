import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import useSemiDark from "@/hooks/useSemiDark";

// import images
import MobileLogo from "@/assets/images/logo/logo.svg";
import MobileLogoWhite from "@/assets/images/logo/logo.svg";

const SidebarLogo = () => {
  const [isDark] = useDarkMode();
  // semi dark
  const [isSemiDark] = useSemiDark();
  // skin
  return (
    <div
      className={`h-[72px] logo-segment flex justify-between items-center bg-secondary-main  z-[9] pl-4 border-b border-white`}
    >
      <Link to="/">
        <div className="logo-icon">
          {!isDark && !isSemiDark ? (
            <div className="w-16">
              <img
                className="w-full object-contain "
                src={MobileLogo}
                alt="logo"
              />
            </div>
          ) : (
            <img
              className="w-8 object-contain"
              src={MobileLogoWhite}
              alt="logo"
            />
          )}
        </div>
      </Link>
    </div>
  );
};

export default SidebarLogo;
