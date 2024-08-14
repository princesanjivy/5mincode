"use client";

import CustomButton from "@/components/CustomButton";
import Menu from "@/components/Menu";
import withAuth from "@/components/WithAuth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleRoomCreate = async () => {
    router.push(`/room/`);
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      {/* Section 1 */}
      <div className="flex justify-between px-24 pt-24">
        {/* Heading  */}
        <header>
          <div className="w-14 h-14 bg-black mb-8"></div>
          <div className="font-kronaOne text-6xl leading-tight">
            {user!.user_name!.toLowerCase()}
          </div>
          <div className="mx-10 mt-8 flex gap-8">
            <img
              src={user!.display_picture!}
              className="object-cover aspect-square w-28 h-28 border-black border-2"
            />
            <div className="w-28 h-28 border-black border-2 font-judson flex flex-col items-center justify-center text-lg">
              <span className="font-bold">{user!.current_streak}</span>
              <span>Streaks</span>
            </div>
            <div className="w-28 h-28 border-black border-2 font-judson flex flex-col items-center justify-center text-lg">
              <span className="font-bold">{user!.total_coins}</span>
              <span>Coins</span>
            </div>
          </div>
        </header>
        {/* Side menu */}
        <div className="absolute right-24 top-24">
          <Menu />
        </div>
      </div>
      {/* Section 2 */}
      <div className="flex gap-8 justify-end px-24 mb-16">
        <CustomButton name="Logout" onClick={signOut} />
        <CustomButton
          name="Create Room"
          customClass="text-green-500"
          onClick={handleRoomCreate}
        />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
