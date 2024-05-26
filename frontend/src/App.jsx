import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import WebsiteLayout from "./layout/WebsiteLayout";
import Home from "./pages/website/home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
