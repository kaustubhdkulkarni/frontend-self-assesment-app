import { Route } from "react-router-dom";
import Register from "@/pages/register";
import { ROUTE_PATHS } from "@/constants/enum";
import Login from "@/pages/auth/login";

export const publicRoutes = [
  <Route key="login" path={ROUTE_PATHS.LOGIN} element={<Login />} />,
  <Route key="register" path={ROUTE_PATHS.REGISTER} element={<Register />} />,
];