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

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); 
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (selectedIdx) => {
    const newAnswers = [...answers, { selected: selectedIdx }];
    setAnswers(newAnswers);

    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const correctCount = quizData.filter((q, i) => answers[i]?.selected === q.answer).length;
    const wrongCount = quizData.length - correctCount;

    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>채점 결과</h1>
        <h2>총 점수: {correctCount} / {quizData.length}</h2>
        <p>✅ 맞춘 문제 수: {correctCount}</p>
        <p>❌ 틀린 문제 수: {wrongCount}</p>

        {quizData.map((q, idx) => {
          const userAnswer = answers[idx]?.selected;
          const isCorrect = userAnswer === q.answer;
          return (
            <div
              key={idx}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px",
                backgroundColor: isCorrect ? "#e0ffe0" : "#ffe0e0",
              }}
            >
              <h3>{idx + 1}. {q.question}</h3>
              <p><strong>내 답:</strong> {userAnswer + 1}. {q.options[userAnswer]}</p>
              <p><strong>정답:</strong> {q.answer + 1}. {q.options[q.answer]}</p>
              {!isCorrect && (
                <p style={{ color: "#555" }}>
                  <strong>해설:</strong> {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const question = quizData[current];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>문제 {current + 1} / {quizData.length}</h2>
      <h3>{question.question}</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {question.options.map((opt, idx) => (
          <li key={idx} style={{ marginBottom: "8px" }}>
            <button
              onClick={() => handleAnswer(idx)}
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                cursor: "pointer",
                background: "#f8f8f8"
              }}
            >
              {idx + 1}. {opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
