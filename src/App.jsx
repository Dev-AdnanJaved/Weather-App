import React from "react";
import MainComponent from "./MainComponent";
import NotFound from "./pages/NotFoundPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/weather/:city" element={<MainComponent />} />
        <Route path="/" element={<MainComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
