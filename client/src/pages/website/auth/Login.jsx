import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Textinput from "../../../components/ui/Textinput";
import axios from "axios";
import { loginUserApi } from "../../../constant/apiRoutes";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/auth/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(loginUserApi, { ...data });
      if (res.success) {
        dispatch(
          setAuth({
            user: res.data.user,
            token: res.data.accessToken,
          })
        );
        navigate("/");
        toast.success(res.messgae);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error While login: ", error);
    }
  };

  return (
    <section className="container w-full h-screen flex items-center justify-center">
      <div className="lg:w-[500px] mx-auto w-full rounded-md bg-white flex flex-col justify-center md:px-10 md:py-10 p-5 border border-[#E0E0E0]">
        <div className="title-area flex flex-col justify-center items-center relative text-center">
          <h1 className="text-[34px] font-bold leading-[74px] text-black">
            {"User Login"}
          </h1>
          <div className="shape -mt-6">
            <svg
              width="172"
              height="29"
              viewBox="0 0 172 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                stroke="#FCBF49"
              />
            </svg>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5"
        >
          <div>
            <Textinput
              label={"Email"}
              name={"email"}
              placeholder="Enter your email address"
              register={register}
              type={"text"}
              error={errors.email}
              isRequired
            />
          </div>
          <div>
            <Textinput
              label={"Password"}
              name={"password"}
              placeholder="Enter your password"
              register={register}
              type={"password"}
              error={errors.password}
              isRequired
              hasicon
            />
          </div>
          <div className=" flex justify-end mt-4">
            <button
              type="submit"
              className={`w-1/3 btn btn-primary ${
                isSubmitting ? "cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
