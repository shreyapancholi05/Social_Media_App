import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { auth, db } from "@/app/Firebase/firebase";
import { useGlobalStore } from "@/app/store/GlobalStore";
import { useAuthStore } from "@/app/store/AuthStore";
import { CircularProgress } from "@mui/material";

interface LoginValues {
  email: string;
  password: string;
}
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const validateSchema = Yup.object({
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

  const handleLogin = async (values: LoginValues) => {
    const { email, password } = values;

    try {
      setLoading(true);
      const loginCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("Logged In user: ", loginCredentials);
      console.log("Username: ", loginCredentials.user.displayName);

      useAuthStore.getState().setUser({
        uid: loginCredentials.user.uid,
        username: loginCredentials.user.displayName || "",
        name: loginCredentials.user.displayName || "",
        email: loginCredentials.user.email,
      });
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
          email: "",
          password: "",
        }}
        validationSchema={validateSchema}
        onSubmit={handleLogin}
      >
        <Form className="pt-10 pb-20 px-4 sm:px-20">
          <h1 className="text-3xl font-bold mb-10">Log in to Busy Bee</h1>

          <div className="w-full space-y-5 mb-10">
            <Field
              type="email"
              name="email"
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
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full h-full  outline-none"
                autoComplete="true"
              />

              <div
                className="w-7 h-7 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </div>
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 p-2 m-2 text-lg"
            ></ErrorMessage>
          </div>
          <button
            type="submit"
            className="bg-amber-300 text-white h-12 rounded-full shadow-md w-full mb-5 cursor-pointer"
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Log In"
            )}
          </button>
          <span className="mb-5 text-sm text-center block">Or</span>
          <button
            type="submit"
            className="bg-amber-300 text-white h-12 rounded-full shadow-md w-full mb-5 cursor-pointer"
            onClick={handleGuest}
          >
            Log in as Guest
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
