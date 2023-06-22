import React from "react";
import { ToastContainer } from "react-toastify";

import LandingPage from "./components/CommonComponent/LandingPage";
import Login from "./components/CommonComponent/Login";
import Register from "./components/CommonComponent/Register";
import Profile from './components/CommonComponent/MyPofile';

import Enrichment from "./components/Enrichment";
import QueryStatus from "./components/QueryStatus";
import Sidebar from "./components/CommonComponent/Sidebar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchRate from "./components/MatchRate";
import Analytics from "./components/Analytics";
import ConsumerAdmin from "./components/Admin/ConsumerAdmin";
import ProviderAdmin from "./components/Admin/ProviderAdmin/ProviderAdmin";
import Videos from "./components/Videos";
import PrivacyPolicy from "./components/CommonComponent/CommonPages/PrivacyPolicy";
import TermsAndConditions from "./components/CommonComponent/CommonPages/TermsAndConditions";

// import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

          <Route
            path="*"
            element={
              <Sidebar>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/queryform" element={<Enrichment />} />
                  <Route path="/querystatus" element={<QueryStatus />} />
                  <Route path="/publisherform" element={<MatchRate />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/consumer-admin" element={<ConsumerAdmin />} />
                  <Route path="/provider-admin" element={<ProviderAdmin />} />
                  <Route path="/veiw-all-videos" element={<Videos />} />
                  <Route path="/my-profile" element={<Profile />} />

                </Routes>
              </Sidebar>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
