import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/website/home";
import ComingSoonPage from "./pages/ComingSoonPage";
import Loading from "./components/Loading";

const Signup = lazy(() => import("./pages/website/auth/Signup"));
const Login = lazy(() => import("./pages/website/auth/Login"));
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="liked_videos" element={<ComingSoonPage />} />
        <Route path="history" element={<ComingSoonPage />} />
        <Route path="content" element={<ComingSoonPage />} />
        <Route path="collection" element={<ComingSoonPage />} />
        <Route path="subscribers" element={<ComingSoonPage />} />
        <Route path="support" element={<ComingSoonPage />} />
        <Route path="settings" element={<ComingSoonPage />} />
      </Route>
      <Route
        path="/signup"
        element={
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
