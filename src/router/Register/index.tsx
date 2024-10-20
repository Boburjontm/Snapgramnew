import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazily import Login and SignUp components
const Login = lazy(() => import("../../pages/Register/login/Login"));
const SignUp = lazy(() => import("../../pages/Register/singUp/SignUp")); // Fayl nomini to'g'irladik

const RegisterRoutes = () => {
  // useRoutes yordamida marshrutlarni aniqlash
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}> {/* Yuklanish jarayonida Loading... ko'rsatadi */}
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signUp",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <SignUp />
        </Suspense>
      ),
    },
  ]);
};

export default RegisterRoutes;
