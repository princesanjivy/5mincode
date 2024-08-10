"use client";

import CustomButton from "@/components/CustomButton";
import withoutAuth from "@/components/WithoutAuth";
import { User } from "@/type/user";
import { signUpWithEmailPassword } from "@/util/auth";
import { addEntryToFirestore } from "@/util/firebaseFirestore";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await signUpWithEmailPassword(email, userName, password).then(
        async (userData) => {
          const data: User = {
            id: userData!.uid,
            user_name: userData!.displayName,
            current_streak: 0,
            display_picture: "",
            total_coins: 0,
            // joined_on: new Date(),
          };
          await addEntryToFirestore("user", data);
          setLoading(false);
        }
      );
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/email-already-in-use":
          toast.error("Email already exist, please login");
          break;
        default:
          toast.error("An unexpected error occurred");
          break;
      }
      setLoading(false);
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
          <div
            className="w-full flex flex-col gap-4 items-end"
            onSubmit={handleRegister}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@princeappstudio.in"
              required
              type="email"
              className="py-4 px-2 w-vw33 border-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
            />
            <input
              value={userName}
              type="name"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="John Doe"
              required
              className="py-4 px-2 w-vw33 border-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
            />
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              className="py-4 px-2 w-vw33 border-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
            />
            <CustomButton
              name="Register"
              onClick={handleRegister}
              showLoading={loading}
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

export default withoutAuth(RegisterPage);
