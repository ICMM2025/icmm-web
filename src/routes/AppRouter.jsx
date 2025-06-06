import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import useUserStore from "../stores/user-store";
import Landing from "../pages/Landing";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

const guestRouter = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Navigate to="/" /> },
]);

const userRouter = createBrowserRouter([
  { path: "/", element: <Admin /> },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function AppRouter() {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
