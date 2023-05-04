import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageOvertime from "./user/Pages/PageOvertime/PageOvertime";
import Profile from "./user/Pages/PageProfile/PageProfile";
import PageProject from "./user/Pages/PageProject/PageProject";
import PageProjectId from "./user/Pages/PageProject/DetailPageProject";
import LayoutUser from "./user/layout/LayoutUser";

import "react-datetime/css/react-datetime.css";
import "./scss/volt.scss";

import Employee from "./admin/pages/PageEmployee/PageEmployee";
import Overtime from "./admin/pages/PageOvertime/PageOvertime";
import LayoutAdmin from "./admin/Layout/Layout";
import HomeAdmin from "./admin/pages/HomeDashboard";
import Project from "./admin/pages/PageProject/PageProject";
import ProjectId from "./admin/pages/PageProject/PageDetailProject";
import Department from "./admin/pages/PageDepartment/PageDepartment";
import EmployeeId from "./admin/pages/PageEmployee/PageDetailEmployee";
import PageDepartment from "./admin/pages/PageDepartment/PageDepartment";
import PageEmployee from "./admin/pages/PageEmployee/PageEmployee";
import PageDetailEmployee from "./admin/pages/PageEmployee/PageDetailEmployee";
import { ToastContainer } from "react-bootstrap";
// import history from "./utils/history";

const SignIn = React.lazy(() => import("./admin/pages/SignIn"));
const SignUp = React.lazy(() => import("./admin/pages/SignUp"));

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutUser />}>
            <Route path="/" index element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/overtime" element={<PageOvertime />} />
            <Route path="/project" element={<PageProject />} />
            <Route path="/project/id" element={<PageProjectId />} />
          </Route>
          <Route element={<LayoutAdmin />}>
            <Route path="/dashboard" index element={<HomeAdmin />} />
            <Route
              path="/dashboard/employee"
              index
              element={<PageEmployee />}
            />
            <Route
              path="/dashboard/employee/id"
              element={<PageDetailEmployee />}
            />
            <Route path="/dashboard/project" index element={<Project />} />
            <Route path="/dashboard/project/id" index element={<ProjectId />} />
            <Route path="/dashboard/overtime" index element={<Overtime />} />
            <Route
              path="/dashboard/department"
              index
              element={<PageDepartment />}
            />
          </Route>
          <Route exact path="/sign-up" name="Login Page" element={<SignUp />} />
          <Route exact path="/sign-in" name="Login Page" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
