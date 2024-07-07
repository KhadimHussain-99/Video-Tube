import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/website/home";
import ComingSoonPage from "./pages/ComingSoonPage";

const Signup = lazy(() => import("./pages/website/register"));
const Login = lazy(() => import("./pages/website/login"));
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="liked-videos" element={<ComingSoonPage />} />
        <Route path="history" element={<ComingSoonPage />} />
        <Route path="content" element={<ComingSoonPage />} />
        <Route path="collection" element={<ComingSoonPage />} />
        <Route path="subscribers" element={<ComingSoonPage />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
