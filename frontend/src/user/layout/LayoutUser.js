import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const LayoutUser = () => {
  return (
    <div className="layout">
      <div style={{ display: "flex" }}>
        <div className="sidebar" style={{ flex: "0.3" }}>
          <Sidebar />
        </div>
        <div className="layoutContent" style={{ width: "100%" }}>
          <div className="content" style={{ flex: "0.7" }}>
            <div>
              <Navbar />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LayoutUser;
