import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserAvatar from "@/assets/images/all-img/user.png";
import { toast } from "react-toastify";
import axios from "axios";
import { loginUserApi, logoutUserApi } from "../../../../constant/apiRoutes";
import { clearAuth } from "../../../../store/auth/store";

const profileLabel = () => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="btn py-1 px-3 bg-primary-600 rounded text-white dark:text-slate-200 font-medium"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="btn py-1 px-3 bg-primary-600 rounded text-white dark:text-slate-200 font-medium"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex-1 ">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            src={user?.avatar}
            alt=""
            className="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
          {user?.fullName}
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post(logoutUserApi, {
        headers: { Authorization: token },
      });
      const { data } = response;
      if (data?.success) {
        dispatch(clearAuth());
        toast.success(data?.message);
      } else {
        toast.error(data?.message || "Error logging out");
        console.error("Error logging out:", data?.message);
      }
    } catch (error) {
      console.log("Error while logout:", error);
    } finally {
      // Execute some code regardless of the logout result
      // Reset some state or navigate to a new page
    }
  };

  const ProfileMenu = [
    {
      label: "Profile",
      icon: "heroicons-outline:user",

      action: () => {
        navigate("/profile");
      },
    },

    {
      label: "Settings",
      icon: "heroicons-outline:cog",
      action: () => {
        // handleLogout();
      },
    },

    {
      label: "Logout",
      icon: "heroicons-outline:login",
      action: () => handleLogout(),
    },
  ];

  return (
    <Dropdown label={profileLabel()} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
              } block     ${
                item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
