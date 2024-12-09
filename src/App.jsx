// ProfileLayout.jsx
import React from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import { Outlet } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Navbar from "./components/common/Navbar";
import PostPropertyNavbar from "./components/common/PostPropertyNavbar";
import PropertyView from "./screens/PropertyView";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";
import PropertyPage from "./screens/PropertyPage";
import PostProperty from "./screens/PostProperty";
import PostPropertyBottomBar from "./components/common/PostPropertyBottomBar";
import PostPropertySteps from "./screens/PostPropertySteps";
import Profile from "./screens/Profile";
import Dashboard from "./screens/profile/Dashboard";
import MyListing from "./screens/profile/MyListing";
import Leads from "./screens/profile/Leads";
import AccountSettings from "./screens/profile/AccountSettings";
import HelpCentre from "./screens/profile/HelpCentre";
import HomeFooter from "./components/common/HomeFooter";
import Error from "./screens/Error";
import Bookmarks from "./screens/Bookmarks";
import SellerProfile from "./screens/SellerProfilePage";
import Articles from "./screens/Articles";
import SingleArticle from "./screens/article/SingleArticle";

const ProfileLayout = () => {
  return (
    <div className="flex px-12 gap-7 py-8">
      <ProfileSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes("/postProperty") ? (
        <PostPropertyNavbar />
      ) : (
        <Navbar />
      )}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<SingleArticle />} />
        <Route path="/properties/:mode" element={<PropertyView />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/postProperty" element={<PostProperty />} />
        <Route path="/postProperty/add" element={<PostPropertySteps />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/*" element={<Error />} />

        {/* Profile Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller/:sellerId" element={<SellerProfile />} />

        {/* Nested routes with ProfileLayout */}
        <Route element={<ProfileLayout />}>
          <Route path="/profile/dashboard" element={<Dashboard />} />
          <Route path="/profile/my-listing" element={<MyListing />} />
          <Route path="/profile/leads" element={<Leads />} />
          <Route
            path="/profile/account-settings"
            element={<AccountSettings />}
          />
          <Route path="/profile/help-centre" element={<HelpCentre />} />
        </Route>
      </Routes>
      {location.pathname === "/" ? (
        <HomeFooter />
      ) : location.pathname.includes("/postProperty") ? (
        <PostPropertyBottomBar />
      ) : (
        <Footer />
      )}
    </>
  );
}

export default App;
