import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider.js";
import { UserProvider } from "./Context/UserProvider.js";
import { PracticeSettingsProvider } from "./Context/PracticeSettingsProvider.js";
import RequireAuth from "./Components/RequireAuth.js";
import PersistLogin from "./Components/PersistLogin.js";
import Navbar from "./Components/Nav/Navbar.js";
import App from "./App.js";
import SignInForm from "./Components/SignInForm.js";
import SignUpForm from "./Components/SignUpForm.js";
import MyDecks from "./Components/Decks/MyDecks.js";
import DeckForm from "./Components/Decks/DeckForm.js";
import Practice from "./Components/Cards/Practice.js";
import PracticeSettings from "./Components/Cards/PracticeSettings.js";
import PracticeCard from "./Components/Cards/PracticeCard.js";
import PracticeSummary from "./Components/Cards/PracticeSummary.js";
import Lost from "./Components/Lost.js";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <PracticeSettingsProvider>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route element={<Navbar />}>
                {/* Public routes */}
                <Route path="/" element={<App />} />
                <Route path="/sign-in" element={<SignInForm />} />
                <Route path="/sign-up" element={<SignUpForm />} />

                <Route element={<RequireAuth />}>
                  {/* Protected routes */}
                  <Route path="/my-decks" element={<MyDecks />} />
                  <Route path="/my-decks/new" element={<DeckForm />} />
                  <Route path="/my-decks/:deckId/edit" element={<DeckForm />} />
                  <Route
                    path="/my-decks/:deckId/practice"
                    element={<Practice />}
                  >
                    <Route
                      path="/my-decks/:deckId/practice/settings"
                      element={<PracticeSettings />}
                    />
                    <Route
                      path="/my-decks/:deckId/practice/:cardIndex"
                      element={<PracticeCard />}
                    />
                    <Route
                      path="/my-decks/:deckId/practice/summary"
                      element={<PracticeSummary />}
                    />
                  </Route>
                </Route>

                {/* Catch-all for invalid URLs */}
                <Route path="*" element={<Lost />} />
              </Route>
            </Route>
          </Routes>
        </PracticeSettingsProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
