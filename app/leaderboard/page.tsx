"use client";

import CustomButton from "@/component/CustomButton";
import Menu from "@/component/Menu";
import { ProfileCardProps } from "@/type/profileCard";

const ProfileCard = ({ name, coin, profile }: ProfileCardProps) => {
  return (
    <div className="border-2 border-black py-4 pl-4 pr-24 inline-block">
      <div className="flex items-center gap-4">
        <img src={profile} className="h-16 w-16 object-cover" alt={profile} />
        <div className="flex flex-col">
          <h2 className="text-3xl font-judson">{name}</h2>
          <div className="flex items-center">
            <h3 className="text-3xl font-judson">{coin}</h3>
            <img src="coin.png" className="ml-2 w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="h-screen flex justify-between overflow-hidden">
      {/* Section 1 */}
      <div className="px-24 pt-24 flex flex-col">
        {/* Heading  */}
        <header>
          <div className="w-14 h-14 bg-black mb-8"></div>
          <div className="font-kronaOne text-6xl leading-tight mb-8">
            Leaderboard
          </div>
        </header>
        {/* Content  */}
        <div className="overflow-x-auto flex-grow mb-8">
          <div className="grid grid-cols-3 grid-flow-row gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <ProfileCard
                key={item}
                name="John Doe"
                coin={item}
                profile="profile.jpeg"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between py-24 pr-24">
        <Menu />
      </div>
    </div>
  );
};

export default Leaderboard;
