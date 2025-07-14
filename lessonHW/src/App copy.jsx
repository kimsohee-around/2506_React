import { useState, useEffect } from "react";

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
    question:
      "useState를 사용하여 상태를 업데이트할 때, 상태 업데이트 함수의 특징은 무엇인가요?",
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
    question:
      "useEffect의 의존성 배열을 빈 배열로 설정하면 어떤 결과가 발생하나요?",
    options: [
      "useEffect가 실행되지 않는다.",
      "useEffect가 컴포넌트가 처음 렌더링될 때만 실행된다.",
      "useEffect가 컴포넌트가 렌더링될 때마다 실행된다.",
      "useEffect가 컴포넌트가 언마운트될 때만 실행된다.",
    ],
    answer: 1,
    explanation:
      "빈 배열로 설정하면 useEffect는 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.",
  },
];

function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowAnswer(false);
  }, [currentIndex]);

  const currentQuiz = quizData[currentIndex];

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "40px auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ marginBottom: 12 }}>
          🧠 문제 {currentIndex + 1} / {quizData.length}
        </h2>
        <p style={{ fontWeight: "bold" }}>{currentQuiz.question}</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {currentQuiz.options.map((option, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              <label style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="option"
                  value={i}
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />{" "}
                {option}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAnswer(true)}
          disabled={selected === null}
          style={{
            marginTop: 16,
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          정답 확인
        </button>

        {showAnswer && (
          <div style={{ marginTop: 20 }}>
            {selected === currentQuiz.answer ? (
              <p style={{ color: "green" }}>✅ 정답입니다!</p>
            ) : (
              <p style={{ color: "red" }}>
                ❌ 오답입니다. <br />
                정답은:{" "}
                <strong>{currentQuiz.options[currentQuiz.answer]}</strong>
              </p>
            )}
            <p>
              <em>{currentQuiz.explanation}</em>
            </p>
            <div style={{ marginTop: 20 }}>
              {currentIndex < quizData.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  다음 문제 →
                </button>
              ) : (
                <p>🎉 모든 문제를 완료했습니다!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizApp;
