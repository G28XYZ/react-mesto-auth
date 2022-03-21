import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ Component, loggedIn, ...props }) => {
  return (
    <>{loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />}</>
  );
};

export default ProtectedRoute;
