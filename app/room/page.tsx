"use client";

import CustomButton from "@/components/CustomButton";
import withAuth from "@/components/WithAuth";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const Room = () => {
  const router = useRouter();
  const [maxPlayers, setMaxPlayers] = useState<number>(5);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const endpoint = "http://localhost:8000/room";
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          max_players: maxPlayers,
          duration: 120,
          room_name: "testing",
          max_questions: 3,
        }),
      });

      const data = await response.json();
      console.log(data.roomId);
      router.push(`/room/${data.roomId}`);
    },
    [maxPlayers]
  );

  return (
    <div className="m-10">
      <h1 className="font-kronaOne text-xl">Room Creation page</h1>
      <form className="flex flex-col max-w-min" onSubmit={handleSubmit}>
        <div className="flex w-max">
          <label>Max participants: </label>
          <input
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
            placeholder="5"
            required
            type="number"
            className="px-2 border-b-2 border-black
        bg-transparent text-right text-2xl font-judson focus:outline-none"
          />
        </div>

        <label>Duration: </label>
        <label>Room Name: </label>
        <label>Max Questions: </label>
        <CustomButton name="Create" />
      </form>
    </div>
  );
};

export default withAuth(Room);
