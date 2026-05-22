import {
  useEffect,
  useState,
} from "react";

export default function ReservationTimer ({
  startTime,
}) {
  const [
    elapsed,
    setElapsed,
  ] = useState(0);

  useEffect(() => {
    const interval =
      setInterval(() => {
        const seconds =
          Math.floor(
            (
              new Date() -
              new Date(
                startTime
              )
            ) / 1000
          );

        setElapsed(seconds);
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [startTime]);

  const hours =
    Math.floor(
      elapsed / 3600
    );

  const minutes =
    Math.floor(
      (elapsed % 3600) /
      60
    );

  const seconds =
    elapsed % 60;

  return (
    <div className="font-semibold text-blue-600">
      {hours}h {minutes}m{" "}
      {seconds}s
    </div>
  );
}