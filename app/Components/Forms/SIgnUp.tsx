import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "@/app/Firebase/firebase";
import { useGlobalStore } from "@/app/store/GlobalStore";
import { useAuthStore } from "@/app/store/AuthStore";
import { CircularProgress } from "@mui/material";

interface SignUpValues {
  name: string;
  email: string;
  password: string;
}
function SIgnUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const validateSchema = Yup.object({
    name: Yup.string().required("Required Field"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Required Field"),
    password: Yup.string()
      .required("Required field")
      .matches(/[0-9]/)
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .min(6, "min 6 characters required"),
  });

  const handleSignup = async (values: SignUpValues) => {
    const { email, password, name } = values;
    try {
      setLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredentials.user, {
        displayName: name,
      });

      useAuthStore.getState().setUser({
        name: name,
        uid: userCredentials.user.uid,
        username: name,
        email: userCredentials.user.email,
      });
      console.log("hi", userCredentials.user);
      console.log(userCredentials.user.displayName);

      useGlobalStore.getState().closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    try {
      const credentials = await signInAnonymously(auth);

      useAuthStore.getState().setUser({
        name: "Guest",
        uid: credentials.user.uid,
        email: "guest@gm.com" || "",
        username: "Guest",
      });

      useGlobalStore.getState().closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validateSchema}
        onSubmit={handleSignup}
      >
        <Form className="pt-10 pb-20 px-4 sm:px-20">
          <h1 className="text-3xl font-bold mb-10">Create your account</h1>

          <div className="w-full space-y-5 mb-10">
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className="w-full h-14 border border-gray-200 outline-none px-3 rounded-sm focus:border-amber-200 transition "
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 p-2 m-2 text-lg"
            ></ErrorMessage>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full h-14 border border-gray-200 outline-none px-3 rounded-sm focus:border-amber-200 transition "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 p-2 m-2 text-lg"
            ></ErrorMessage>
            <div className="w-full h-14 border border-gray-200 outline-none px-3 rounded-sm focus-within:border-amber-200 transition flex items-center overflow-hidden">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-full  outline-none"
              />

              <div
                className="w-7 h-7 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </div>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 p-2 m-2 text-lg"
            ></ErrorMessage>
          </div>
          <button
            type="submit"
            className="bg-amber-300 text-white h-12 rounded-full shadow-md w-full mb-5 cursor-pointer"
          >
            {loading ? <CircularProgress size={20} sx={{color: "white"}}/> : "Sign Up"}
          </button>
          <span className="mb-5 text-sm text-center block">Or</span>
          <button
            type="button"
            onClick={handleGuest}
            className="bg-amber-300 text-white h-12 rounded-full shadow-md w-full mb-5 cursor-pointer"
          >
            Log in as Guest
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default SIgnUp;
