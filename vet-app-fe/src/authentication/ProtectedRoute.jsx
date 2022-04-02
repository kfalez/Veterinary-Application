import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isActive = localStorage.getItem("isActive");
  console.log("this", isAuthenticated);
  console.log("isActive", isActive);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
