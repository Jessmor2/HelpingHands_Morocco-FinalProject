import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

import DonatePage from "./pages/donatepage";
import { Single } from "./pages/single";
import AboutUs from "./pages/aboutUs";
import { ThankYou } from "./pages/thank-you-page";
import { Contact } from "./pages/contact";
import injectContext, { Context } from "./store/appContext";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ChangePassword from "./pages/change-password";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import { Dashboard } from "./pages/dashboard";
import { DashboardHistory } from "./pages/dashboard-history";
import ChatBox from "./component/chatBox";
import CircularProgressBar from "./pages/circularProgressBar";
import NotFound from "./pages/notFound";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<DonatePage />} path="/donatepage" />
                        <Route element={<Home />} path="/home" />
                        <Route element={<AboutUs />} path="/aboutUs" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<ChangePassword />} path="/change-password" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<ResetPassword />} path="/reset-password" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<ThankYou />} path="/thank-you-page" />
                        {localStorage.getItem('access_token') != null && <Route element={<Dashboard />} path="/dashboard" />}
                        {localStorage.getItem('access_token') != null && <Route element={<DashboardHistory />} path="/dashboard-history" />}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                    <ChatBox />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
