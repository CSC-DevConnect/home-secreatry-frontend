import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Homepage, Navigation, Login, Register } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigation />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
