
import React from "react";
import logo from "../assets/logo.png";
import wave from "../assets/wave.svg";
import person from "../assets/loginpageasset.png";
import * as yup from "yup";
import { Formik, ErrorMessage, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../query/Auth.query";
import { toast } from "sonner";

const Register = () => {
  const [registerUser, registerUserResponse] = useRegisterUserMutation(); // Corrected this line

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(5, "password must be greater than 5 characters"),
  });

  const onSubmitHandler = async (values, { resetForm }) => {
    try {
      const { data, error } = await registerUser(values);
      if (error) {
        toast.error(error.data.message);
        return;
      }
      localStorage.setItem("token", data.token);
      toast.success("register Successfully");
      navigate("/");
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 h-[10vh] bg-slate-50">
        <div className="logo">
          <img src={logo} className="w-16 ml-3 mt-2" alt="logo" />
        </div>
        <div className="logo-name font-serif font-bold text-2xl">
          Inventory Management System
        </div>
      </div>
      <div className=" flex gap-1 justify-center bg-slate-50">
        <div className="w-[45vw] h-[69.5vh]">
          <div className="rounded-lg p-1 bg-white w-full h-[58vh] mt-8">
            <div className="text-3xl font-serif font-medium flex justify-center p-4">
              Register
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmitHandler}
            >
              {({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col p-4 gap-5"
                >
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-serif text-xl">
                      Name :-
                    </label>
                    <Field
                      id="name"
                      name="name"
                      className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"
                      placeholder="Enter name"
                    />
                    <ErrorMessage
                      component={"p"}
                      className="text-red-500 text-sm"
                      name="name"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-serif text-xl">
                      Email :-
                    </label>
                    <Field
                      id="email"
                      name="email"
                      className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"
                      placeholder="Enter Email Address"
                    />
                    <ErrorMessage
                      component={"p"}
                      className="text-red-500 text-sm"
                      name="email"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-serif text-xl" htmlFor="password">
                      Password :-
                    </label>
                    <Field
                      id="password"
                      name="password"
                      className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"
                      type="password"
                      placeholder="Enter password"
                    />
                    <ErrorMessage
                      component={"p"}
                      className="text-red-500 text-sm"
                      name="password"
                    />
                  </div>
                  <button
                    className="justify-center w-28 font-serif text-xl bg-green-600 rounded-lg p-1 border"
                    type="submit"
                  >
                    Submit
                  </button>
                  <div className="flex">
                    <p className="font-serif">Already have an Account? </p>
                    <Link to={"/login"} className="font-semibold text-blue-600">
                      Login
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="w-[45vw] h-[69vh]">
          <img
            className="absolute h-[80vh] w-[38vw] z-10"
            src={person}
            alt="person"
          />
        </div>
      </div>
      <div className="absolute bottom-0">
        <img className="bg-slate-50 w-[100vw]" src={wave} alt="wave" />
      </div>
    </>
  );
};

export default Register;
