import React, { useState, useEffect } from "react";
import "./main.css";
import QuizTimer from "../Timer/QuizTimer";
import QuestionTimer from "../Timer/QuestionTimer";
import QuestionCard from "../Questions/QuestionCard";
import QuestionPicker, {
  handleQuestionQueue,
} from "../Questions/QuestionPicker";

/**
 * question data contains a question and the queue index from which the question
 * was picked
 */
const initialQuestionData = QuestionPicker(0);
let totalQuestions = 0; //Total number of questions answered during the session
export default function Main() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [currentQuestionData, setCurrentQuestionData] = useState(
    initialQuestionData
  );
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [questionSeconds, setQuestionSeconds] = useState(10);

  //For total quiz timer
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setShowScore(true);
    }
  });

  //For current question timer
  useEffect(() => {
    if (questionSeconds > 0) {
      setTimeout(() => setQuestionSeconds(questionSeconds - 1), 1000);
    } else {
      const nextQuestionNumber = currentQuestionNumber + 1;
      //totalQuestions+1 will always be greater tah nextQuestNumber that way questions will keep appearing until timer runs out
      if (nextQuestionNumber < totalQuestions + 1) {
        setCurrentQuestionNumber(nextQuestionNumber);
        setCurrentQuestionData(QuestionPicker());
      }
    }
  });
  const handleAnswerOptionClick = (questionData, isCorrect) => {
    // update algorithm related data structures
    handleQuestionQueue(questionData, isCorrect);
    totalQuestions++;
    //Increase score by 1 if answered correctly
    console.log("Q No.: " + totalQuestions);
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionNumber = currentQuestionNumber + 1;
    //totalQuestions+1 will always be greater tah nextQuestNumber that way questions will keep appearing until timer runs out
    if (nextQuestionNumber < totalQuestions + 1) {
      setCurrentQuestionNumber(nextQuestionNumber);
      setCurrentQuestionData(QuestionPicker());
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <text
        style={{
          color: "#F0178A",
          fontSize: 50,
        }}
      >
        Quiz
      </text>
      {showScore ? (
        <div className="app">
          <div className="score-section">
            {totalQuestions != 0 && (
              <>
                <p>
                  You answered {score} out of {totalQuestions} questions
                  correctly.
                </p>
                <p>You scored {((score / totalQuestions) * 100).toFixed(2)}%</p>
              </>
            )}
            {totalQuestions == 0 && (
              <>
                <p>
                  You answered {score} out of {totalQuestions} questions
                  correctly.
                </p>
                <p>You scored 0 %</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <QuizTimer seconds={seconds} />
          <div className="app">
            <div className="question-section">
              <QuestionTimer seconds={questionSeconds} />
              <QuestionCard
                question={currentQuestionData.question}
                handleAnswerOptionClick={(isCorrect) =>
                  handleAnswerOptionClick(currentQuestionData, isCorrect)
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}