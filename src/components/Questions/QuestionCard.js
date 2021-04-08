import React from "react";
/**
 * Makes a question display given a question
 *
 * @param {Object} question Question to display
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
