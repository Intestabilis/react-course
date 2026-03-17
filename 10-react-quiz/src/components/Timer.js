import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  // this will become an issue in production app since it'll re-render everything (from parent component) each second
  useEffect(
    function () {
      const timerId = setInterval(function () {
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
