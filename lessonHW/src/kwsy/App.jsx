import React, { useState } from "react";

const quizData = [
  {
    question:
      "useState를 사용하여 상태를 초기화할 때 올바른 코드 형태는 무엇인가요?",
    options: [
      "const [state, setState] = useState();",
      "const state = useState();",
      "const [state, setState] = useState(initialValue);",
      "const setState = useState(initialValue);",
    ],
    answer: 2,
    explanation:
      "useState는 상태와 상태를 업데이트하는 함수를 반환합니다. 초기값을 설정하려면 useState(initialValue)를 사용해야 하며, [state, setState] 형태로 구조분해 할당합니다.",
  },
  {
    question: "useEffect는 어떤 상황에서 실행되나요?",
    options: [
      "컴포넌트가 처음 렌더링될 때만 실행된다.",
      "컴포넌트가 렌더링될 때마다 실행된다.",
      "의존성 배열에 명시된 값이 변경될 때 실행된다.",
      "컴포넌트가 언마운트될 때만 실행된다.",
    ],
    answer: 2,
    explanation:
      "useEffect는 의존성 배열을 기반으로 실행됩니다. 특정 값이 포함되어 있으면 해당 값이 변경될 때 실행됩니다.",
  },
  {
    question: "useEffect에서 반환된 함수는 언제 실행되나요?",
    options: [
      "컴포넌트가 처음 렌더링될 때",
      "컴포넌트가 언마운트될 때",
      "의존성 배열의 값이 변경될 때",
      "컴포넌트가 업데이트될 때",
    ],
    answer: 1,
    explanation:
      "useEffect에서 반환된 함수는 컴포넌트가 언마운트될 때 실행되며, 의존성 배열 값이 변경될 때도 이전 효과를 정리하기 위해 실행됩니다.",
  },
  {
    question: "useState 상태 업데이트 함수의 특징은?",
    options: [
      "현재 상태를 직접 수정한다.",
      "비동기적으로 상태를 업데이트한다.",
      "상태를 즉시 업데이트한다.",
      "상태를 초기화한다.",
    ],
    answer: 1,
    explanation:
      "useState의 상태 업데이트 함수는 비동기적으로 작동하며, 상태를 직접 수정하지 않고 새로운 값을 설정합니다.",
  },
  {
    question: "useEffect의 의존성 배열을 빈 배열로 설정하면?",
    options: [
      "useEffect가 실행되지 않는다.",
      "처음 렌더링될 때만 실행된다.",
      "렌더링될 때마다 실행된다.",
      "언마운트될 때만 실행된다.",
    ],
    answer: 1,
    explanation:
      "빈 배열로 설정하면 useEffect는 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.",
  },
];

export default function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizData[currentIndex];

  const handleOptionChange = (selectedIndex) => {
    const updatedAnswers = { ...userAnswers };
    updatedAnswers[currentIndex] = selectedIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(userAnswers).length < quizData.length) {
      alert("모든 문제를 풀어주세요!");
      return;
    }
    setShowResults(true);
  };

  const isCorrect = (questionIndex) => {
    return userAnswers[questionIndex] === quizData[questionIndex].answer;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>React 퀴즈</h1>
      <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
        <h3>
          {currentIndex + 1}. {currentQuestion.question}
        </h3>
        {currentQuestion.options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name={`question-${currentIndex}`}
                value={index}
                disabled={showResults}
                checked={userAnswers[currentIndex] === index}
                onChange={() => handleOptionChange(index)}
              />
              {option}
            </label>
          </div>
        ))}
        {showResults && (
          <div style={{ marginTop: "10px" }}>
            {isCorrect(currentIndex) ? (
              <p style={{ fontWeight: "bold", color: "green" }}>정답</p>
            ) : (
              <p style={{ fontWeight: "bold", color: "red" }}>
                오답. 정답: {currentQuestion.answer + 1}번
              </p>
            )}
            <p style={{ fontStyle: "italic" }}>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          이전
        </button>{" "}
        <button onClick={handleNext} disabled={currentIndex === quizData.length - 1}>
          다음
        </button>
      </div>

      {/* Submit */}
      {!showResults && currentIndex === quizData.length - 1 && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px" }}>
            정답 확인
          </button>
        </div>
      )}
    </div>
  );
}
