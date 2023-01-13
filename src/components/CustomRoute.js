import React from "react";
import { Route } from "react-router-dom";
import HomeLayout from "./Home/HomeLayout";

const CustomRoute = ({ component, title, ...props }) => {
  return (
    <Route
      {...props}
      render={() => <HomeLayout Component={component} title={title} {...props} />}
    />
  );
};

export default CustomRoute;
