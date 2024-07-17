import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const IntervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      IntervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(IntervalIdRef.current);
    };
  }, [isRunning]);

  //Start the timer Function

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  //Stop the timer Function

  function stop() {
    setIsRunning(false);
  }

  //Reset the timer Function

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  //Formatting time values

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  //   function formatmilliseconds() {
  //     let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  //     milliseconds = String(milliseconds).padStart(2, "0");

  //     return `${milliseconds}`;
  //   }

  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="flex flex-col items-center gap-10 lg:shadow-xl h-fit w-full lg:w-1/4 pb-5 lg:px-5 lg:rounded-xl p-2 lg:border">
        <div className="w-full mx-2 lg:w-5/6">
          <div className="lg:w-5/6 flex mx-auto">
            <h1 className=" text-[60px] w-fit">{formatTime()}</h1>
            {/* <h1>{formatmilliseconds()}</h1>  */}
          </div>
        </div>

        <div className="lg:flex lg:flex-row flex flex-col justify-between w-1/2 lg:w-full gap-3">
          <Button onClick={start} size="lg" color="success">
            START
          </Button>
          <Button onClick={stop} size="lg" color="warning">
            STOP
          </Button>
          <Button onClick={reset} size="lg" color="danger">
            RESET
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StopWatch;
