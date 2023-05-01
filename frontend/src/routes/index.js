import React from "react";
import { Route } from "react-router";

import SignIn from "../admin/pages/SignIn";
import SignUp from "../admin/pages/SignUp";
const Routes = () => {
  return (
    <>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </>
  );
};

export default Routes;
