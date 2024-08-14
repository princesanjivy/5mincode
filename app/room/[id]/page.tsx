"use client";

import { use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import withAuth from "@/components/WithAuth";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/type/user";
import { RoomInfo, UserInfo } from "@/type/room";

import CustomButton from "@/components/CustomButton";
import Ide from "@/components/Battle";
import My from "@/components/My";
import AlertDialog from "@/components/AlertDialog";
// import My from "../../../component/My";

const Battle = () => {
  const router = useRouter();
  const { user } = useAuth();
  const id = usePathname().split("/").at(-1);
  const [messages, setMessages] = useState<string[]>([]);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [input, setInput] = useState("");
  const [connectedUsers, setConnectedUsers] = useState<UserInfo[]>([]);

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [showBattleBtn, setShowBattleBtn] = useState<boolean>(false);
  const [myUser, setMyUser] = useState<User | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAction1 = () => {
    console.log("Action 1 executed");
    setIsDialogOpen(false);
  };

  const handleAction2 = () => {
    console.log("Action 2 executed");
    setIsDialogOpen(false);
  };

  useEffect(() => {
    let ws: WebSocket | undefined = undefined;

    const validateIdNInitWebSocket = async () => {
      try {
        const response = await fetch(`http://localhost:8000/room/exist/${id}`);
        const data = await response.json();

        if (!data.exists) {
          router.push("/");
          return;
        }

        ws = new WebSocket(`ws://localhost:8000/room/${id}/ws/${user!.id}`);
        setSocket(ws);

        ws.onopen = () => {
          console.log("Connected to WebSocket");
          if (ws) ws.send(JSON.stringify({ message: "hello,server" }));
        };

        // ws.onmessage = (event) => {
        //   const newMessage = event.data;
        //   setMessages((prevMessages) => [...prevMessages, newMessage]);
        // };

        ws.onmessage = (event) => {
          console.log(event.data);
          const messageData = JSON.parse(event.data);

          if (messageData.method === "ROOMINFO") {
            const roomInfo: RoomInfo = messageData.message;
            console.log(roomInfo.user_info);

            const u = roomInfo.user_info.find(
              (data: UserInfo) => data.user.id === user!.id
            )!.user;
            setMyUser(u);
            setShowBattleBtn(roomInfo.owner_id === user!.id);

            //
            if (roomInfo.is_started) {
              setIsStarted(true);
            }

            setConnectedUsers(roomInfo.user_info);
          } else if (messageData.method === "START") {
            console.log("to do");
            // console.log(messageData.message);
            // console.log("battle");
            // setIsStarted(true);
            // router.push(`/room/${id}/battle`);
          } else {
            //   console.log(messageData);
            //   const u = messageData.message.find(
            //     (data: User) => data.id === user!.uid
            //   );
            //   setMyUser(u);
            //   setShowBattleBtn(u.isRoomOwner);
            //   setConnectedUsers(messageData.message);

            console.error("unknow method");
          }
        };

        ws.onclose = () => {
          console.log("Disconnected from WebSocket");
        };
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
        router.push("/");
      }
    };

    const timer = setTimeout(() => {
      validateIdNInitWebSocket();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (ws) {
        ws.close();
      }
    };
  }, [id]);

  const sendMessage = () => {
    if (socket && input) {
      socket.send(input);
      setInput("");
    }
  };

  const handlePlay = () => {
    // setIsDialogOpen(true);
    // notify server to start the game
    if (socket) {
      socket.send(JSON.stringify({ message: "START" }));
    }
  };

  // const tempUsers = [{ name: "Sanjivy" }, { name: "Nirai" }];
  if (isStarted && myUser !== null) {
    // // return (
    // //   <div>
    // //     <h1 className="m-10 text-green-500 font-kronaOne text-4xl">
    // //       Hello, world
    // //     </h1>
    // //   </div>
    // // );
    // return <My />;
    return (
      <Ide
        userName={myUser.user_name!}
        currentUsers={connectedUsers}
        questionId={"NAtMrXgsHbyGNthtw8GV"}
      />
    );
  }

  return (
    <div>
      <h1 className="p-8 text-2xl font-kronaOne text-green-500">
        Room Id: {id}
      </h1>
      <h2>User Id: {user!.id}</h2>
      <h3>Connected Users:</h3>
      <ul>
        {connectedUsers.map((userInfo, idx) => (
          <li key={userInfo.user.id}>
            {idx + 1}.{userInfo.user.user_name}
          </li>
        ))}
      </ul>
      {showBattleBtn ? (
        <CustomButton name="Battle" onClick={handlePlay} />
      ) : null}

      {isDialogOpen && (
        <AlertDialog
          title="Alert Title"
          description="This is an alert dialog description."
          action1Text="Cancel"
          action2Text="Confirm"
          onAction1={handleAction1}
          onAction2={handleAction2}
        />
      )}
    </div>
  );
};

export default withAuth(Battle);
