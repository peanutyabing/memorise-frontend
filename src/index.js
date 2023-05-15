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
import SignInForm from "./Components/Profile/SignInForm.js";
import SignUpForm from "./Components/Profile/SignUpForm.js";
import UserInterestsForm from "./Components/Profile/UserInterestsForm.js";
import UsersOwnProfile from "./Components/Profile/UsersOwnProfile.js";
import OtherUsersProfile from "./Components/Profile/OtherUsersProfile.js";
import MyDecks from "./Components/Decks/MyDecks.js";
import DeckForm from "./Components/Decks/DeckForm.js";
import AiInstructionsForm from "./Components/Decks/AiInstructionsForm.js";
import Practice from "./Components/Cards/Practice.js";
import PracticeSettings from "./Components/Cards/PracticeSettings.js";
import PracticeCard from "./Components/Cards/PracticeCard.js";
import PracticeSummary from "./Components/Cards/PracticeSummary.js";
import Feed from "./Components/Feed/Feed.js";
import DeckDetails from "./Components/Feed/DeckDetails.js";
import Tutorial from "./Components/Tutorial.js";
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
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/sign-in" element={<SignInForm />} />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route
                  path="/profile/:userId"
                  element={<OtherUsersProfile />}
                />
                <Route path="/feed" element={<Feed />} />
                <Route path="/feed/:deckId" element={<DeckDetails />} />

                <Route element={<RequireAuth />}>
                  {/* Protected routes */}
                  <Route path="/interests" element={<UserInterestsForm />} />
                  <Route
                    path="/edit-interests"
                    element={<UserInterestsForm />}
                  />
                  <Route path="/my-profile" element={<UsersOwnProfile />} />
                  <Route path="/my-decks" element={<MyDecks />} />
                  <Route path="/my-decks/new" element={<DeckForm />} />
                  <Route path="/my-decks/:deckId/edit" element={<DeckForm />} />
                  <Route path="/my-decks/:deckId/fork" element={<DeckForm />} />
                  <Route
                    path="/my-decks/ai-assistant"
                    element={<AiInstructionsForm />}
                  />
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
