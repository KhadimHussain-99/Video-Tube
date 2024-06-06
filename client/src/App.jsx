import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/website/home";
import ComingSoonPage from "./pages/ComingSoonPage";

const Signup = lazy(() => import("./pages/website/register/Signup"));
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
      </Route>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
