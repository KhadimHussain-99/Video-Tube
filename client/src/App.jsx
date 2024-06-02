import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/website/home";

const Signup = lazy(() => import("./pages/website/register/Signup"));
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
