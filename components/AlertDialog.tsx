// components/AlertDialog.tsx
import React from "react";
import CustomButton from "./CustomButton";

interface AlertDialogProps {
  title: string;
  description: string;
  action1Text: string;
  action2Text: string;
  onAction1: () => void;
  onAction2: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  description,
  action1Text,
  action2Text,
  onAction1,
  onAction2,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 max-w-screen-lg w-full">
        <h2 className="text-3xl font-bold mb-4 font-kronaOne">{title}</h2>
        <p className="mb-6 text-2xl font-judson">{description}</p>
        {/* <svg className="h-12 w-12 animate-spin" viewBox="0 0 100 100">
          <circle
            fill="none"
            stroke-width="10"
            className="stroke-current opacity-5"
            cx="50"
            cy="50"
            r="40"
          />
          <circle
            fill="none"
            stroke-width="10"
            className="stroke-current"
            stroke-dasharray="250"
            stroke-dashoffset="210"
            cx="50"
            cy="50"
            r="40"
          />
        </svg> */}
        <div className="flex justify-end space-x-4">
          <CustomButton
            name={action1Text}
            // className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onAction1}
          />
          <CustomButton
            name={action2Text}
            // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onAction2}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
