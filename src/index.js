import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider.js";
import { UserProvider } from "./Context/UserProvider.js";
import { RoundSettingsProvider } from "./Context/RoundSettingsProvider.js";
import { RedirectProvider } from "./Context/RedirectProvider.js";
import RequireAuth from "./Components/RequireAuth.js";
import PersistLogin from "./Components/PersistLogin.js";
import Navbar from "./Components/Nav/Navbar.js";
import App from "./App.js";
import SignInForm from "./Components/Profile/SignInForm.js";
import SignUpForm from "./Components/Profile/SignUpForm.js";
import UserInterestsForm from "./Components/Profile/UserInterestsForm.js";
import UsersOwnProfile from "./Components/Profile/UsersOwnProfile.js";
import ProfileForm from "./Components/Profile/ProfileForm.js";
import XpHistory from "./Components/Profile/XpHistory.js";
import OtherUsersProfile from "./Components/Profile/OtherUsersProfile.js";
import MyDecks from "./Components/Decks/MyDecks.js";
import DeckForm from "./Components/Decks/DeckForm.js";
import AiInstructionsForm from "./Components/Decks/AiInstructionsForm.js";
import RoundHeader from "./Components/Cards/RoundHeader.js";
import RoundSettings from "./Components/Cards/RoundSettings.js";
import OneCardInPractice from "./Components/Cards/OneCardInPractice.js";
import OneCardInChallenge from "./Components/Cards/OneCardInChallenge.js";
import RoundSummary from "./Components/Cards/RoundSummary.js";
import Feed from "./Components/Feed/Feed.js";
import DeckDetails from "./Components/Feed/DeckDetails.js";
import Pricing from "./Components/Pricing.js";
import Tour from "./Components/Tour.js";
import Lost from "./Components/Lost.js";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <RoundSettingsProvider>
          <RedirectProvider>
            <Routes>
              <Route element={<PersistLogin />}>
                <Route element={<Navbar />}>
                  {/* Public routes */}
                  <Route path="/" element={<App />} />
                  <Route path="/tour" element={<Tour />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/sign-in" element={<SignInForm />} />
                  <Route path="/sign-up" element={<SignUpForm />} />
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
                    <Route
                      path="/profile/:userId"
                      element={<OtherUsersProfile />}
                    />
                    <Route path="/edit-profile" element={<ProfileForm />} />
                    <Route path="/my-xp" element={<XpHistory />} />
                    <Route path="/my-decks" element={<MyDecks />} />
                    <Route path="/my-decks/new" element={<DeckForm />} />
                    <Route
                      path="/my-decks/:deckId/edit"
                      element={<DeckForm />}
                    />
                    <Route
                      path="/my-decks/:deckId/fork"
                      element={<DeckForm />}
                    />
                    <Route
                      path="/my-decks/ai-assistant"
                      element={<AiInstructionsForm />}
                    />
                    <Route
                      path="/my-decks/:deckId/:mode"
                      element={<RoundHeader />}
                    >
                      <Route
                        path="/my-decks/:deckId/:mode/settings"
                        element={<RoundSettings />}
                      />
                      <Route
                        path="/my-decks/:deckId/:mode/:cardIndex/p"
                        element={<OneCardInPractice />}
                      />
                      <Route
                        path="/my-decks/:deckId/:mode/:cardIndex/c"
                        element={<OneCardInChallenge />}
                      />
                      <Route
                        path="/my-decks/:deckId/:mode/summary"
                        element={<RoundSummary />}
                      />
                    </Route>
                  </Route>

                  {/* Catch-all for invalid URLs */}
                  <Route path="*" element={<Lost />} />
                </Route>
              </Route>
            </Routes>
          </RedirectProvider>
        </RoundSettingsProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
