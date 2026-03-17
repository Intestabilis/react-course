import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  // this will become an issue in production app since it'll re-render everything (from parent component) each second
  useEffect(
    function () {
      const timerId = setInterval(function () {
        // console.log("1 second has passed");
        dispatch({ type: "tick" });
      }, 1000);
      return function () {
        clearInterval(timerId);
      };
    },
    [dispatch],
  );

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
