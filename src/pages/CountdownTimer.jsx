import { useState, useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import logo from '../assets/logo.png'
import "../styles/countdown-timer.css";

const CountdownTimer = ({ continueTrial }) => {
  const [eventDate, setEventDate] = useState(new Date(2025, 9, 21, 0, 0));
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeout, setTimeout] = useState(false);


  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const eventTime = new Date(eventDate).getTime();
      let remainingTime = eventTime - currentTime;

      if (remainingTime <= 0) {
        remainingTime = 0;
        clearInterval(countdownInterval);
        setTimeout(true);
      }

      setTimeRemaining(remainingTime);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdownStarted, timeRemaining]);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className="countdown-display">
        <div className="countdown-value">
          {days.toString().padStart(2, "0")} <span>days</span>
        </div>
        <div className="countdown-value">
          {hours.toString().padStart(2, "0")} <span> hours</span>
        </div>
        <div className="countdown-value">
          {minutes.toString().padStart(2, "0")} <span>minutes</span>
        </div>
        <div className="countdown-value">
          {seconds.toString().padStart(2, "0")} <span>seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div className="countdown-timer-container">
      <img src={logo} width={96} className="mb-5"></img>
      <h2 className="countdown-name">Smart Home Dashboard</h2>

      <div className="countdown-date mb-5">
        Hey dear, this App is running in trial mode. Your trial expires on
        <br></br><br></br>
        {formatDate(eventDate)}
      </div>

      <div className="mb-5">{formatTime(timeRemaining)}</div>
      <p className="countdown-date mb-10">Contact administrator to resolve</p>

      <button
        className={
          timeout
            ? "bg-red-600 text-white font-bold py-3 px-5 rounded-md"
            : `bg-violet-700 hover:bg-violet-600 text-white font-bold py-3 px-5 rounded-md`
        }
        disabled={timeout}
        onClick={continueTrial}
      >
        {timeout ?
        (<div className="flex item-center justify-between">
          <TriangleAlert />
          <span className="ms-2">Trial Ended</span>
        </div>
        ): "Continue in Trial Mode"}
      </button>
    </div>
  );
};

export default CountdownTimer;
