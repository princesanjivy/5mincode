"use client";

import CustomButton from "@/components/CustomButton";
import withoutAuth from "@/components/WithoutAuth";
import { signInWithEmailPassword } from "@/util/auth";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log("login page");
    setLoading(true);
    try {
      await signInWithEmailPassword(email, password).then(() =>
        setLoading(false)
      );
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/invalid-credential":
          toast.error("User not found");
          toast.info("Please register");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password");
          break;
        default:
          toast.error("An unexpected error occurred");
          break;
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="flex">
        {/* Column 1 */}
        <div className="h-screen flex flex-col justify-between pl-24 pt-24 pb-24">
          <div>
            <div className="w-14 h-14 bg-black mb-8"></div>
            <div className="font-kronaOne text-6xl leading-tight">
              Nobody should <br />
              wait to <br />
              code.
            </div>
          </div>
          <div>
            <Link
              className="font-kronaOne text-4xl underline"
              href="https://princeappstudio.in"
              target="_blank"
            >
              &copy;princeappstudio
            </Link>
          </div>
        </div>
        {/* Column 2 */}
        <div className="h-screen flex flex-grow flex-col justify-end items-end pr-24 pb-24">
          <div className="w-full flex flex-col gap-4 items-end relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@princeappstudio.in"
              required
              type="email"
              className="py-4 px-2 w-vw33 absolute  border-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
            />
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              className="py-4 px-2 w-vw33  absolute  top-24 border-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
            />
            <div className="my-24"></div>
            {/* <button
              className={`py-8 px-16 border-2 
        border-black shadow-custom 
        hover:shadow-hover hover:translate-x-0.5 hover:translate-y-0.5 
        font-kronaOne text-3xl`}
              onClick={onClick}
              disabled={showLoading}
            >
              {!showLoading ? (
                name
              ) : (
                <svg className="h-12 w-12 animate-spin" viewBox="0 0 100 100">
                  <circle
                    fill="none"
                    stroke-width="10"
                    className="stroke-current opacity-5"
                    cx="50"
                    cy="50"
                    r="40"
                  />
                  <circle
                    fill="none"
                    stroke-width="10"
                    className="stroke-current"
                    stroke-dasharray="250"
                    stroke-dashoffset="210"
                    cx="50"
                    cy="50"
                    r="40"
                  />
                </svg>
              )}
            </button> */}
            <CustomButton
              name="Login"
              showLoading={loading}
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default withoutAuth(LoginPage);
