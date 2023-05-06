import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider.js";
import { UserProvider } from "./Context/UserProvider.js";
import RequireAuth from "./Components/RequireAuth.js";
import PersistLogin from "./Components/PersistLogin.js";
import Navbar from "./Components/Navbar.js";
import App from "./App.js";
import SignInForm from "./Components/SignInForm.js";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<App />} />
          <Route path="/sign-in" element={<SignInForm />} />

          <Route element={<PersistLogin />}>
            {/* Public but auth-differentiated routes */}

            <Route element={<RequireAuth />}>{/* Protected routes */}</Route>
          </Route>

          {/* Catch-all for invalid URLs */}
          {/* //// Placeholder (App) */}
          <Route path="*" element={<App />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
