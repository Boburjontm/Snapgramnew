import { useRoutes } from "react-router-dom";
import { lazy, LazyExoticComponent } from "react";
import { Suspense } from "react"; // React Suspense ni import qilish

const Login: LazyExoticComponent<any> = lazy(
  () => import("../../pages/Register/login/Login")
);
const SignUp: LazyExoticComponent<any> = lazy(() =>import("../../pages/Register/singUp/SignUp") // Fayl nomini to'g'irladik
);

const RegisterRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
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
