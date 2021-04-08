import React from "react";

export default function QuestionTimer({ seconds }) {
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
      Question time left: {mDisplay + sDisplay}
    </p>
  );
}
