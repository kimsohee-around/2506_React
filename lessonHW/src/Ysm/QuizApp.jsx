import React, { useState } from "react";
import quizData from "./QuizData";
import "./App_V.css"; // 스타일 시트 임포트

function QuizApp() {
  // 현재 질문 인덱스를 관리하는 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 사용자의 점수를 관리하는 상태
  const [score, setScore] = useState(0);
  // 퀴즈가 끝났는지 여부를 관리하는 상태
  const [quizFinished, setQuizFinished] = useState(false);
  // 선택된 옵션의 인덱스를 관리하는 상태
  const [selectedOption, setSelectedOption] = useState(null);
  // 정답 여부를 표시하는 상태 (null: 선택 안함, true: 정답, false: 오답)
  const [isCorrect, setIsCorrect] = useState(null);
  // 정답 설명을 보여줄지 말지 결정하는 상태
  const [showExplanation, setShowExplanation] = useState(false);

  // 옵션 클릭 핸들러
  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    const isAnswerCorrect =
      optionIndex === quizData[currentQuestionIndex].answer;
    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true); // 옵션 선택 시 설명 표시

    if (isAnswerCorrect) {
      setScore(score + 1);
    }
  };

  // 다음 질문으로 넘어가는 핸들러
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null); // 다음 질문으로 넘어가면 선택 초기화
      setIsCorrect(null); // 정답 여부 초기화
      setShowExplanation(false); // 설명 숨기기
    } else {
      setQuizFinished(true); // 모든 질문을 풀면 퀴즈 종료
    }
  };

  // 퀴즈 재시작 핸들러
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  // 퀴즈가 종료되었을 때 표시할 내용
  if (quizFinished) {
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <h2>퀴즈 종료!</h2>
          <p>
            당신의 점수는 {score} / {quizData.length} 입니다.
          </p>
          <button onClick={handleRestartQuiz} className="restart-button">
            다시 시작
          </button>
        </div>
      </div>
    );
  }

  // 현재 질문 데이터
  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>React Hooks 퀴즈</h1>
        <p>
          질문 {currentQuestionIndex + 1} / {quizData.length}
        </p>
      </div>
      <div className="question-section">
        <p className="question-text">{currentQuestion.question}</p>
      </div>
      <div className="options-section">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button
              ${
                selectedOption !== null && index === currentQuestion.answer
                  ? "correct"
                  : ""
              }
              ${
                selectedOption === index &&
                selectedOption !== currentQuestion.answer
                  ? "incorrect"
                  : ""
              }
              ${
                selectedOption !== null &&
                selectedOption === index &&
                selectedOption === currentQuestion.answer
                  ? "selected-correct"
                  : ""
              }
              ${
                selectedOption !== null &&
                selectedOption === index &&
                selectedOption !== currentQuestion.answer
                  ? "selected-incorrect"
                  : ""
              }
            `}
            onClick={() => handleOptionClick(index)}
            disabled={selectedOption !== null} // 옵션 선택 후에는 버튼 비활성화
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption !== null && showExplanation && (
        <div
          className={`feedback-section ${
            isCorrect ? "feedback-correct" : "feedback-incorrect"
          }`}
        >
          <p className="feedback-message">
            {isCorrect ? "정답입니다!" : "오답입니다."}
          </p>
          <p className="explanation-text">
            <strong>설명:</strong> {currentQuestion.explanation}
          </p>
        </div>
      )}
      <div className="navigation-section">
        <button
          onClick={handleNextQuestion}
          className="next-button"
          disabled={selectedOption === null} // 옵션을 선택해야 다음 버튼 활성화
        >
          {currentQuestionIndex === quizData.length - 1
            ? "결과 보기"
            : "다음 질문"}
        </button>
      </div>
    </div>
  );
}

export default QuizApp;
