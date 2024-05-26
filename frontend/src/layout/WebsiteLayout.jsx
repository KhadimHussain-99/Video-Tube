import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/website-partials/header";
import Footer from "../components/website-partials/footer";
import Loading from "@/components/Loading";
const WebsiteLayout = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Header />
        <Suspense fallback={<Loading />}>{<Outlet />}</Suspense>
        <Footer />
      </div>
    </>
  );
};

export default WebsiteLayout;
