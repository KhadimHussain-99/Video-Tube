import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Textinput from "../../../components/ui/Textinput";
import Fileinput from "../../../components/ui/Fileinput";
import axios from "axios";
import { registerUser } from "../../../constant/apiRoutes";
import noData from "../../../assets/images/vectors/no-data.webp";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),

  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email().required("Email is required"),
  avatar: yup
    .mixed()
    .required("Avatar File is required")
    .test(
      "fileSize",
      "The file size is too large provide a max 5mb file",
      (value) => {
        if (!value?.length) return true;
        return value[0]?.size <= 5000000;
      }
    ),
  coverImage: yup
    .mixed()
    .test(
      "fileSize",
      "The file size is too large provide a max 5mb file",
      (value) => {
        if (!value?.length) return true;
        return value[0]?.size <= 5000000;
      }
    ),
  password: yup.string().min(8).max(32),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const [avatar, setAvatar] = useState(null);
  const [err, setErr] = useState({});
  const [coverImage, setCoverImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    if (!avatar) {
      setErr((prev) => ({
        ...prev,
        [avatar]: { message: `avatar file is required` },
      }));
      return;
    }

    try {
      const res = await axios.post(registerUser, {
        ...data,
        avatar,
        coverImage,
      });
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    setErr((prev) => ({ ...prev, [name]: null }));
    if (!file) {
      setErr((prev) => ({
        ...prev,
        [name]: { message: `${name} file is required` },
      }));
      return;
    }
    if (name === "avatar") setAvatar(file);
    if (name === "coverImage") setCoverImage(file);
  };

  return (
    <section className="container w-full py-8">
      <div className="lg:w-[700px] mx-auto w-full rounded-md bg-white flex flex-col justify-center md:px-10 p-5 border border-[#E0E0E0]">
        <div className="title-area flex flex-col justify-center items-center relative text-center">
          <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
            {"User Sign Up"}
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
          className="grid grid-cols-2 gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2">
            <Textinput
              register={register}
              name={"firstname"}
              placeholder="Enter your First Name"
              type="text"
              label={"First Name"}
              onChange={(e) => setValue("firstname", e.target.value)}
              error={errors.firstname}
              isRequired
            />
          </div>
          <div className="col-span-1">
            <Textinput
              register={register}
              name={"FullName"}
              placeholder="Enter your Full Name"
              type="text"
              label={"Full Name"}
              onChange={(e) => setValue("fullName", e.target.value)}
              error={errors.fullName}
              isRequired
            />
          </div>
          <div className="col-span-1">
            <Textinput
              register={register}
              name={"email"}
              placeholder="Enter your Email"
              type="email"
              label={"Email"}
              onChange={(e) => setValue("email", e.target.value)}
              error={errors.email}
              isRequired
            />
          </div>
          <div className="col-span-1 border-2 border-dashed p-2">
            <Fileinput
              register={register}
              name={"avatar"}
              label="Avatar Image"
              placeholder="Choose avatar file"
              onChange={(e) => handleFileChange(e, "avatar")}
              preview
              isRequired
              selectedFile={avatar}
            />
            {err?.avatar?.message && (
              <p className=" mt-2 text-danger-500 block text-sm self-start">
                {err?.avatar?.message}
              </p>
            )}
            {!avatar && (
              <div className="w-[80%] h-[200px] mx-auto mt-2">
                <img
                  src={noData}
                  className="w-full h-full object-contain"
                  alt="No Data"
                />
              </div>
            )}
          </div>
          <div className="col-span-1 border-2 border-dashed p-2">
            <Fileinput
              register={register}
              name={"coverImage"}
              label="Cover Image"
              placeholder="Choose coverImage file"
              onChange={(e) => handleFileChange(e, "coverImage")}
              preview
              selectedFile={coverImage}
            />
            {!coverImage && (
              <div className="w-[80%] h-[200px] mx-auto mt-2">
                <img
                  src={noData}
                  className="w-full h-full object-contain"
                  alt="No Data"
                />
              </div>
            )}
          </div>
          <div className="col-span-1">
            <Textinput
              name="password"
              register={register}
              type="text"
              label={"Password"}
              placeholder="password"
              onChange={(e) => setValue("password", e.target.value)}
              error={errors.password}
              isRequired
              hasicon
            />
          </div>
          <div className="col-span-1">
            <Textinput
              name="confirmPassword"
              register={register}
              type="text"
              label={"Confirm Password"}
              placeholder="confirm password"
              onChange={(e) => setValue("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              isRequired
              hasicon
            />
          </div>
          <div className="col-span-2 flex justify-end">
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

export default Signup;
