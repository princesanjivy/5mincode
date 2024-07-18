"use client";

import { Editor } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/component/WithAuth";
import CustomButton from "@/component/CustomButton";

const markdownContent = `
# Bingo Game

A small implementation of the Bingo game with multiplayer support using FastAPI.

## Features

- Multiplayer support without use of websocket
- Player (add, ready, unready, crossed)
- Random number generation for Bingo

## Requirements

- Python 3.8+
- FastAPI
- PrettyTable
- Requests
- Colorama
- Pydantic

# Bingo Game

A small implementation of the Bingo game with multiplayer support using FastAPI.

## Features

- Multiplayer support without use of websocket
- Player (add, ready, unready, crossed)
- Random number generation for Bingo

`;

const Home = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="p-12 h-screen overflow-hidden flex items-center justify-center">
      <div className="flex border-black border-2 h-full">
        {/* Section 1 */}
        <div className="w-1/12 border-r-2 border-black p-8 overflow-y-auto">
          <div className="flex flex-col justify-center items-center gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
              <img
                key={idx}
                src="/profile.jpeg"
                alt="Profile"
                className="w-auto"
              />
            ))}
          </div>
        </div>
        {/* Section 2 */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex flex-row items-center font-kronaOne">
            <h1 className="text-xl">Welcome, {user!.email}</h1>
            <h1 className="ml-4 text-3xl">1/3</h1>
          </div>
          <div className="mt-8 px-8 font-judson border-2 border-black flex-grow overflow-y-auto">
            <ReactMarkdown
              className="markdown-body text-xl leading-relaxed"
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-2xl font-kronaOne font-bold my-4"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-xl font-kronaOne font-semibold my-4"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => <p className="my-2" {...props} />,
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside my-2" {...props} />
                ),
                li: ({ node, ...props }) => <li className="my-1" {...props} />,
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
        {/* Section 3 */}
        <div className="flex-1 flex flex-col">
          <div className="h-1/2 mt-8 mr-8 border-2 border-black ">
            <Editor
              width="100%"
              height="100%"
              defaultLanguage="python"
              // className="bg-blue-50"
              defaultValue={`print("hello")\n\n`}
              options={{
                minimap: { enabled: false },
              }}
            />
          </div>
          <div className="h-1/2 mt-8 mr-8 border-2 border-black">
            <h1 className="p-8 text-2xl font-kronaOne text-right">
              Test Cases
            </h1>
          </div>
          <div className="h-1/6 my-8 mr-8 flex gap-8">
            <CustomButton
              name="Sign Out"
              customClass="flex-1"
              onClick={signOut}
            />
            <CustomButton name="Run" customClass="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
