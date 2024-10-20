import Image from "../../../../public/images/bg_image.png";
import { GoogleIcon, SnapgramIcon } from "../../../../public/images";
import { LoginUser, UserInfo } from "../../../types";
import { FormEvent, useContext } from "react";
import InputComponent from "../../../components/input/InputComponent";
import { useLoginUserMutation } from "../../../redux/api/users-api";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../context/Context";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const context = useContext(Context);
  const navigate = useNavigate();

  const LoginInputInfo: UserInfo[] = [
    {
      id: 1,
      span_name: "user name",
      name: "username",
      type: "text",
    },
    {
      id: 2,
      span_name: "password",
      name: "password",
      type: "password",
    },
  ];

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = new FormData(e.currentTarget);
    const username = target.get("username") as string;
    const password = target.get("password") as string;

    const data: LoginUser = {
      username,
      password,
    };

    try {
      const res = await loginUser(data).unwrap();

      toast.success(
        <div className="flex items-center">
          Welcome back, {username}!
        </div>,
        {
          className: "rounded-lg bg-black_500 text-white shadow-lg",
          position: "top-center",
          autoClose: 3000,
        }
      );

      window.localStorage.setItem("accessToken", res.accessToken);
      window.localStorage.setItem("refreshToken", res.refreshToken);
      context?.setToken(true);
      navigate("/"); // Muvaffaqiyatli kirgandan so'ng asosiy sahifaga yo'naltirish

    } catch (err) {
      toast.error(
        <div className="flex items-center">
          Something went wrong, please try again.
        </div>,
        {
          className: "rounded-lg bg-black_500 text-white shadow-lg",
          position: "top-center",
          autoClose: 3000,
        }
      );

      console.error("Login Error:", err);
    }
  }

  return (
    <section className="w-screen h-screen bg-dark-100 flex overflow-hidden">
      <div className="flex-1 h-screen overflow-y-auto flex items-center justify-center">
        <form onSubmit={handleFormSubmit} className="w-[90%] max-w-[400px] text-white px-4 md:px-0">
          <span className="flex items-center justify-center mb-[68px]">
            <SnapgramIcon />
          </span>
          <div className="text-center space-y-[12px] mb-[32px]">
            <h1 className="font-bold text-3xl">Log in to your account</h1>
            <p className="text-light-300">
              Welcome back! Please enter your details.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {LoginInputInfo.map((item: UserInfo) => (
              <InputComponent item={item} key={item.id} />
            ))}
          </div>
          <div className="mt-[30px] mb-[32px] flex flex-col space-y-5">
            <button
              type="submit"
              className="bg-primary_500 capitalize py-[13px] w-full rounded-lg font-semibold"
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
            <button
              type="button"
              className="py-3 w-full text-black justify-center bg-white rounded-lg font-semibold flex items-center space-x-3"
            >
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>
          </div>

          {/* Foydalanuvchi ma'lumotlarini ko'rsatish */}
          <div className="text-center text-light-200 text-sm mt-5">
            <p>Username: <strong>John</strong></p>
            <p>Password: <strong>55555555</strong></p>
          </div>

          <p className="text-center text-light-200 text-sm mt-5">
            Don’t have an account?{" "}
            <Link to="/signUp" className="text-primary_500 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:flex md:flex-1">
        <img src={Image} className="w-full h-full object-cover" alt="Background" />
      </div>
    </section>
  );
}

export default Login;
