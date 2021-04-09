import React from "react";
import "./QuestionCard.css";
/**
 * Makes a question display given a question
 *
 * @param {Object} object with the following fields:
 *  - question: question to display
 *  - handleAnswerOptionClick: decides what to do depending upon what answer the user clicked.
 */
const QuestionCard = ({ question, handleAnswerOptionClick }) => {
  return (
    <>
      <div className="question-text">{question.questionText}</div>
      <div className="answer-section">
        {question.answerOptions.map((answerOption) => (
          <button
            onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
          >
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </>
  );
};
export default QuestionCard;
