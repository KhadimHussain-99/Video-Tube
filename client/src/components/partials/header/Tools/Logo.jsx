import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo.svg";
import MobileLogo from "@/assets/images/logo/logo.svg";
import MobileLogoWhite from "@/assets/images/logo/logo.svg";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();
  console.log("theme: ", isDark);

  return (
    <div>
      <Link to="/">
        {width >= breakpoints.xl ? (
          <img src={isDark ? LogoWhite : MainLogo} alt="logo" />
        ) : (
          <img src={isDark ? MobileLogoWhite : MobileLogo} alt="logo" />
        )}
      </Link>
    </div>
  );
};

export default Logo;
