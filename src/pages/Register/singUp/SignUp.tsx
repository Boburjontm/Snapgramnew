import { FormEvent, useState } from "react";
import { CreateNewUser, UserInfo } from "../../../types";
import { useCreateUserMutation } from "../../../redux/api/api";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../../../components/input/Input";
import { toast } from "react-toastify";
import { GoogleIcon } from "../../../../public/images";
import Image from "../../../../public/images/bg_image.png";

function SignUp() {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateNewUser>({
    full_name: "",
    email: "",
    username: "",
    password: "",
  });

  const SignUpInputsInfo: UserInfo[] = [
    { id: 1, span_name: "name", name: "full_name", type: "text" },
    { id: 2, span_name: "email", name: "email", type: "email" },
    { id: 3, span_name: "user Name", name: "username", type: "text" },
    { id: 4, span_name: "password", name: "password", type: "password" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createUser(formData).unwrap();
      toast.success("Account successfully created!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create account. Please try again.");
      console.error("Error creating account:", err);
    }
  }

  return (
    <section className="w-screen h-screen bg-dark-100 flex overflow-hidden">
      <div className="flex-1 h-screen overflow-y-auto flex items-center justify-center">
        <form onSubmit={handleFormSubmit} className="w-[400px] text-white">
          <div className="text-center space-y-[12px] mb-[32px]">
            <h1 className="font-bold text-3xl">Create a new account</h1>
            <p className="text-light-300">
              To use Snapgram, please enter your details.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {SignUpInputsInfo.map((item: UserInfo) => (
              <InputComponent
                key={item.id}
                item={item}
                value={formData[item.name as keyof CreateNewUser]}
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="mt-[30px] mb-[32px] flex flex-col space-y-5">
            <button
              type="submit"
              className="bg-primary_500 capitalize py-[13px] w-full rounded-lg font-semibold"
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </button>
            <button
              type="button"
              className="py-3 w-full text-black justify-center bg-white rounded-lg font-semibold flex items-center space-x-3"
            >
              <GoogleIcon />
              <span>Sign up with Google</span>
            </button>
          </div>

          <p className="text-center text-light-200 text-sm mt-5">
            Already have an account?{" "}
            <Link to="/" className="text-primary_500 font-semibold">
              Log In
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:flex md:flex-1">
        <img
          src={Image}
          className="w-full h-full object-cover"
          alt="Background"
        />
      </div>
    </section>
  );
}

export default SignUp;
