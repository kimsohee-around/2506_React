import { useState } from 'react';
import './App.scss';

const quizData = [{
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
  },];

function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionClick = (index) => {
    if (selected !== null) return;

    setSelected(index);
    setShowExplanation(true);
    if (index === quizData[current].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowExplanation(false);
    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
    } else {
      setCurrent(quizData.length);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
  };

  return (
    <div className="app-wrapper">
      <div className="quiz-card">
        <h2>📘 React Hook 퀴즈</h2>

        {current < quizData.length ? (
          <>
            <h3>{quizData[current].question}</h3>
            <ul className="options">
              {quizData[current].options.map((opt, i) => (
                <li key={i}>
                  <button
                    className={`option-btn
                      ${selected !== null && i === quizData[current].answer ? 'correct' : ''}
                      ${selected !== null && i === selected && i !== quizData[current].answer ? 'wrong' : ''}
                    `}
                    onClick={() => handleOptionClick(i)}
                    disabled={selected !== null}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </ul>

            {showExplanation && (
              <>
                <p><strong>해설:</strong> {quizData[current].explanation}</p>
                <button className="next-btn" onClick={handleNext}>
                  {current + 1 < quizData.length ? '다음 문제' : '결과 보기'}
                </button>
              </>
            )}
          </>
        ) : (
          <div className="result">
            <h3>퀴즈 완료!</h3>
            <p>총 점수: {score} / {quizData.length}</p>
            <button className="next-btn" onClick={handleRestart}>다시 시작</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
