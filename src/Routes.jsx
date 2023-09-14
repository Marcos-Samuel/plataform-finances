import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { getItem } from "./utils/storage";

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ redirectTo }) => {
  const token = getItem("@dindin:token");
  return token ? <Outlet /> : <Navigate to={redirectTo} />;
};

function NotProtectedRoutes() {
  const token = getItem("@dindin:token");
  return token ? <Navigate to="/main" /> : <Outlet />;
}

export default function MyRoutes() {
  return (
    <Routes>
      <Route element={<NotProtectedRoutes />}>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path="/main" element={<Main />} />
      </Route>
    </Routes>
  );
}
