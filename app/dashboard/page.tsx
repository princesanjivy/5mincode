"use client";

import CustomButton from "@/components/CustomButton";
import Menu from "@/components/Menu";
import withAuth from "@/components/WithAuth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";

interface RoomDetail {
  maxPlayers: number;
  duration: number;
  roomName: string;
  maxQuestions: number;
}

const Dashboard = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState<RoomDetail>({
    duration: 200,
    maxPlayers: 5,
    maxQuestions: 3,
    roomName: "5mincode",
  });

  const handleRoomCreate = useCallback(async () => {
    const endpoint = "http://localhost:8000/room";
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        max_players: roomInfo.maxPlayers,
        duration: roomInfo.duration,
        room_name: roomInfo.roomName,
        max_questions: roomInfo.maxQuestions,
      }),
    });

    const data = await response.json();
    console.log(data.roomId);
    router.push(`/room/${data.roomId}`);
  }, [roomInfo]);

  const handleRoomInfo = async () => {
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRoomInfo({
      ...roomInfo,
      [name]: name === "roomName" ? value : Number(value),
    });
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
        <CustomButton
          name="Logout"
          customClass="text-red-500"
          onClick={signOut}
        />
        <CustomButton name="Create Room" onClick={handleRoomInfo} />
      </div>
      {isDialogOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 max-w-screen-lg w-full">
              <h2 className="text-3xl font-bold mb-4 font-kronaOne">Setup</h2>
              {/* 1st input */}
              <div className="flex items-end gap-4">
                <label className="font-judson text-2xl">Max participants</label>
                <input
                  name="maxPlayers"
                  value={roomInfo.maxPlayers}
                  onChange={handleInputChange}
                  type="number"
                  className="py-4 px-2 border-b-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
                />
              </div>
              {/* 2nd input */}
              <div className="flex items-end gap-4">
                <label className="font-judson text-2xl">Duration</label>
                <input
                  name="duration"
                  value={roomInfo.duration}
                  onChange={handleInputChange}
                  type="number"
                  className="py-4 px-2 border-b-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
                />
              </div>
              {/* 3rd input */}
              <div className="flex items-end gap-4">
                <label className="font-judson text-2xl">Room Name</label>
                <input
                  name="roomName"
                  value={roomInfo.roomName}
                  onChange={handleInputChange}
                  type="text"
                  className="py-4 px-2 border-b-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
                />
              </div>
              {/* 4th input */}
              <div className="flex items-end gap-4">
                <label className="font-judson text-2xl">Max Questions</label>
                <input
                  name="maxQuestions"
                  value={roomInfo.maxQuestions}
                  onChange={handleInputChange}
                  type="number"
                  className="py-4 px-2 border-b-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
                />
              </div>
              <div className="mt-8 flex justify-end gap-8">
                <CustomButton
                  name="Cancel"
                  customClass="text-red-500"
                  onClick={handleCancel}
                />
                <CustomButton name="Create" onClick={handleRoomCreate} />
              </div>
              {/* End */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(Dashboard);
