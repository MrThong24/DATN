import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PageOvertime from "./user/Pages/PageOvertime/PageOvertime";
import PageOvertimeDetail from "./user/Pages/PageOvertime/PageOvertimeUpdate";
import Profile from "./user/Pages/PageProfile/PageProfile";
import PageProject from "./user/Pages/PageProject/PageProject";
import PageProjectId from "./user/Pages/PageProject/DetailPageProject";
import LayoutUser from "./user/layout/LayoutUser";

import "react-datetime/css/react-datetime.css";
import "./scss/volt.scss";

import Overtime from "./admin/pages/PageOvertime/PageOvertime";
import LayoutAdmin from "./admin/Layout/Layout";
import HomeAdmin from "./admin/pages/HomeDashboard";
import Project from "./admin/pages/PageProject/PageProject";
import ProjectId from "./admin/pages/PageProject/PageDetailProject";
import PageDepartment from "./admin/pages/PageDepartment/PageDepartment";
import PageEmployee from "./admin/pages/PageEmployee/PageEmployee";
import PageDetailEmployee from "./admin/pages/PageEmployee/PageDetailEmployee";
import { useSelector } from "react-redux";
import PageOvertimeUpdate from "./user/Pages/PageOvertime/PageOvertimeUpdate";

import LayoutManager from "./userManager/layout/LayoutManager";
import PageProfileManager from "./userManager/pages/PageProfile/PageProfileManager";
import PageOvertimeManager from "./userManager/pages/PageOvertime/PageOvertimeManager";
import PageOvertimeManagerUpdate from "./userManager/pages/PageOvertime/PageOvertimeManagerUpdate";

// import history from "./utils/history";

const SignIn = React.lazy(() => import("./admin/pages/SignIn"));

function App() {
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
  }, [userInfo]);

  return (
    <Routes>
      <Route element={<LayoutUser />}>
        <Route path="/" index element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/overtime" element={<PageOvertime />} />
        <Route path="/overtime/:id" element={<PageOvertimeUpdate />} />
        <Route path="/project" element={<PageProject />} />
        <Route path="/project/id" element={<PageProjectId />} />
      </Route>

      <Route element={<LayoutManager />}>
        <Route path="/manager/profile" element={<PageProfileManager />}></Route>
        <Route
          path="/manager/overtime"
          element={<PageOvertimeManager />}
        ></Route>
        <Route
          path="/manager/overtime/:id"
          element={<PageOvertimeManagerUpdate />}
        ></Route>
      </Route>

      <Route element={<LayoutAdmin />}>
        <Route path="/dashboard" index element={<HomeAdmin />} />
        <Route path="/dashboard/employee" index element={<PageEmployee />} />
        <Route
          path="/dashboard/employee/:id"
          element={<PageDetailEmployee />}
        />
        <Route path="/dashboard/project" index element={<Project />} />
        <Route path="/dashboard/project/:id" index element={<ProjectId />} />
        <Route path="/dashboard/overtime" index element={<Overtime />} />
        <Route
          path="/dashboard/department"
          index
          element={<PageDepartment />}
        />
      </Route>
      <Route exact path="/sign-in" name="Login Page" element={<SignIn />} />
    </Routes>
  );
}

export default App;
