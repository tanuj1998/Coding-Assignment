import React from "react";

export default function QuizTimer({ seconds }) {
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);
  var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes: ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return (
    <p
      style={{
        color: "white",
        fontSize: 17,
      }}
    >
      Total Time left: {mDisplay + sDisplay}
    </p>
  );
}
