/*Screen to display the total quiz timer.
It takes seconds as its argument and converts it into mm:ss format
*/
import React from "react";

export default function QuizTimer({ seconds }) {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);
  var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return (
    <p
      style={{
        color: "white",
        fontSize: 17,
      }}
    >
      Total Time left: {hDisplay + mDisplay + sDisplay}
    </p>
  );
}
