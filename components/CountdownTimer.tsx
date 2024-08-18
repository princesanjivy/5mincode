import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  startTime: Date;
  onTimeUp: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  startTime,
  onTimeUp,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes in seconds

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const difference = Math.max(start + 120000 - now, 0); // 2 minutes in milliseconds
      setTimeLeft(Math.floor(difference / 1000)); // Convert milliseconds to seconds
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div>
      <h1>Time Left: {timeLeft} seconds</h1>
    </div>
  );
};

export default CountdownTimer;
