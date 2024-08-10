"use client";

import CustomButton from "@/components/CustomButton";
import Menu from "@/components/Menu";
import withoutAuth from "@/components/WithoutAuth";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      {/* Section 1 */}
      <div className="flex justify-between px-24 pt-24">
        {/* Heading  */}
        <header>
          <div className="w-14 h-14 bg-black mb-8"></div>
          <div className="font-kronaOne text-6xl leading-tight">
            Nobody should <br />
            wait to <br />
            code.
          </div>
        </header>
        {/* Side menu */}
        <div className="absolute right-24 top-24">
          <Menu />
        </div>
      </div>
      {/* Section 2 */}
      <div className="flex gap-8 justify-between px-24">
        {/* Disabling this card for now */}
        <div className="border-2 border-black p-8 w-1/3 opacity-0">
          <p className="text-4xl font-judson">
            Lorem ipsum dolor sit amet consectetur. Quisque lectus vitae
            faucibus varius. Lorem ipsum dolor sit amet consectetur. Quisque
            lectus vitae faucibus varius.
          </p>
        </div>
        <div className="flex flex-col gap-8 items-end justify-end pb-24">
          <CustomButton name="Join a battle" />
          <div className="flex gap-8">
            <CustomButton name="Register" onClick={handleRegister} />
            <CustomButton name="Login" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withoutAuth(Home);
