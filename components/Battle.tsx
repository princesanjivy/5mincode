"use client";

import { Editor, OnMount } from "@monaco-editor/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import * as monaco from "monaco-editor";
import CountdownTimer from "./CountdownTimer";
import { QuestionProp } from "@/type/question";
import { UserInfo } from "@/type/room";

// const markdownContent = `
// # Bingo Game

// A small implementation of the Bingo game with multiplayer support using FastAPI.

// ## Features

// - Multiplayer support without use of websocket
// - Player (add, ready, unready, crossed)
// - Random number generation for Bingo

// ## Requirements

// - Python 3.8+
// - FastAPI
// - PrettyTable
// - Requests
// - Colorama
// - Pydantic

// # Bingo Game

// A small implementation of the Bingo game with multiplayer support using FastAPI.

// ## Features

// - Multiplayer support without use of websocket
// - Player (add, ready, unready, crossed)
// - Random number generation for Bingo

// `;

interface Props {
  userName: string;
  questionId: string;
  currentUsers: any;
  startTime: Date;
  onCompletion: () => void;
}

const Ide = ({
  userName,
  currentUsers,
  questionId,
  startTime,
  onCompletion,
}: Props) => {
  const { user, signOut } = useAuth();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const [output, setOutput] = useState<string>("");
  const [question, setQuestion] = useState<QuestionProp | null>(null);

  const getQuestion = useCallback(() => {
    const endpoint = `http://localhost:8000/ide/question/${questionId}`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const q = data.message;
        setQuestion(q);
      });
  }, [questionId]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  const handleRun = () => {
    console.log("Hoi");
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      console.log("Code from editor:", code);

      const endpoint = "http://localhost:8000/ide/run";

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code, userId: user!.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from server:", data);
          setOutput(data.message.join("\n"));
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleTimeUp = () => {
    console.log("calling server!");
    onCompletion();
  };

  // const startTime = new Date();

  return (
    <div className="p-12 h-screen overflow-hidden flex items-center justify-center">
      <div className="flex border-black border-2 h-full">
        {/* Section 1 */}
        <div className="w-1/12 border-r-2 border-black p-8 overflow-y-auto">
          <div className="flex flex-col justify-center items-center gap-8">
            {currentUsers.map((value: UserInfo, idx: number) => (
              <img
                key={idx}
                src={value.user.display_picture!}
                alt="Profile"
                className="object-cover border-black border-2 aspect-square"
              />
              // <h1>
              //   {value.user.user_name}
              // </h1>
            ))}
          </div>
        </div>
        {/* Section 2 */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex flex-row items-center font-kronaOne">
            <h1 className="text-xl text-blue-500">Welcome, {userName}</h1>
            <CountdownTimer startTime={startTime} onTimeUp={handleTimeUp} />
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
              {question ? question.content : `loading question...`}
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
              onMount={handleEditorDidMount}
            />
          </div>
          <h1 className="px-8 pt-8 pb-2 text-2xl font-kronaOne text-right">
            Test Cases
          </h1>
          <div className="h-1/2 mr-8 border-2 border-black overflow-y-auto">
            <div className="px-8 py-4 text-xl font-kronaOne text-left text-red-500">
              <pre className="font-judson">{output}</pre>
            </div>
          </div>
          <div className="h-1/6 my-8 mr-8 flex gap-8">
            <CustomButton
              name="Submit"
              customClass="flex-1 text-amber-500"
              onClick={signOut}
            />
            <CustomButton name="Run" customClass="flex-1" onClick={handleRun} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ide;
