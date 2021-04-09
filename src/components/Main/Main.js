import React, { useState, useEffect } from "react";
import "./main.css";
import QuizTimer from "../Timer/QuizTimer";
import QuestionTimer from "../Timer/QuestionTimer";
import QuestionCard from "../Questions/QuestionCard";
import questionPicker, {
  handleQuestionQueue,
} from "../Questions/QuestionPicker";
import config from "../../config.json";

/**
 * question data contains a question, queue index and question time from which the question
 * was picked
 */
const initialQuestionData = questionPicker(0);
let totalQuestions = 0; //Total number of questions answered during the session
export default function Main() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [currentQuestionData, setCurrentQuestionData] = useState(
    initialQuestionData
  );
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizSeconds, setQuizSeconds] = useState(config.quizTime);
  const [questionSeconds, setQuestionSeconds] = useState(
    initialQuestionData.questionTime
  );

  //For total quiz timer
  useEffect(() => {
    if (!showScore) {
      if (quizSeconds > 0) {
        const timer = setTimeout(() => setQuizSeconds(quizSeconds - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setShowScore(true);
      }
    }
  }, [showScore, quizSeconds]);

  //For individual question timer
  useEffect(() => {
    if (!showScore) {
      if (questionSeconds > 0) {
        const timer = setTimeout(
          () => setQuestionSeconds(questionSeconds - 1),
          1000
        );
        return () => clearTimeout(timer);
      } else {
        handleAnswerOptionClick(currentQuestionData, false);
      }
    }
  }, [questionSeconds, currentQuestionData]);

  /**
   * If question answered correctly, increase score by 1 and call handleQuestionQueue
   * to put the question data in the right queue.
   *
   * If question answered incorrectly, handleQuestionQueue puts the question data in queue[0]
   *
   * Set question data for the next question to be shown
   */
  const handleAnswerOptionClick = (questionData, isCorrect) => {
    handleQuestionQueue(questionData, isCorrect);
    totalQuestions++; //Increase total number of questions attempted by the user.

    //Increase score by 1 if answered correctly
    if (isCorrect) {
      setScore(score + 1);
    }

    //Set question data for next question to be presented to user
    setCurrentQuestionNumber(
      (currentQuestionNumber) => currentQuestionNumber + 1
    );
    questionData = questionPicker();
    let questionSeconds = questionData.questionTime;
    setCurrentQuestionData(questionData);
    setQuestionSeconds(questionSeconds);
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
          marginBottom: 10,
        }}
      >
        Quiz
      </text>
      {showScore ? (
        <div className="app">
          <div className="score-section">
            {totalQuestions !== 0 && (
              <>
                <p>
                  You answered {score} out of {totalQuestions} questions
                  correctly.
                </p>
                <p>You scored {((score / totalQuestions) * 100).toFixed(2)}%</p>
              </>
            )}
            {totalQuestions === 0 && (
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
          <QuizTimer seconds={quizSeconds} />
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
