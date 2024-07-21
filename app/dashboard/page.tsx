"use client";

import CustomButton from "@/component/CustomButton";
import withAuth from "@/component/WithAuth";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        {/* TODO: Need to change the user to read from DB */}
        <h1>Hello, {user!.displayName}</h1>
        <h2>Email: {user!.email}</h2>
        <CustomButton name="SignOut" onClick={signOut} />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
