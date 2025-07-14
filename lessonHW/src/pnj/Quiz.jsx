import React, { useState } from "react";
import { quizData } from "./quizData";

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const current = quizData[currentIndex];

  const handleSelect = (index) => {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);

    if (index === current.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const isLast = currentIndex === quizData.length - 1;

  return (
    <div className="quiz">
      <h2>{current.question}</h2>
      <ul>
        {current.options.map((option, idx) => (
          <li
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`option 
              ${showAnswer && idx === current.answer ? "correct" : ""}
              ${showAnswer && selected === idx && selected !== current.answer ? "wrong" : ""}
            `}
          >
            {option}
          </li>
        ))}
      </ul>

      {showAnswer && (
        <div className="explanation">
          <strong>
            {selected === current.answer ? "✅ 정답입니다!" : "❌ 오답입니다."}
          </strong>
          <p>{current.explanation}</p>

          {!isLast ? (
            <button onClick={handleNext}>다음 문제</button>
          ) : (
            <div className="score">
              <p>🎉 모든 문제를 완료했습니다!</p>
              <p>
                📝 총 {quizData.length}문제 중 {score}문제를 맞췄습니다.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
