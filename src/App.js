import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import Dashboard from "./pages/Dashboard";

import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import Statistics from "./pages/Statistics";
import Transactions from "./pages/Transactions";
import Wallet from "./pages/Wallet";
import { persistor } from "./redux/store";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/register" />
        <Route element={<Dashboard />} path={"/dashboard"} />
        <Route element={<Employees />} path={"/employees"} />
        <Route element={<Statistics />} path="/statistics" />
        <Route element={<Transactions />} path="/transactions" />
        <Route element={<Wallet />} path="/wallet" />
        <Route element={<Settings />} path="/settings" />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </PersistGate>
  );
}

//all these are temporary
const NotFound = () => {
  return (
    <>
      {" "}
      <div>You&apos;ve entered a black hole, find your way out</div>
    </>
  );
};
export default App;
