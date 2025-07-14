// 2025-07-12 4주차 과제
// useState, useEffect 이용해서 ui 및 기능 구현
// option, select

// quizData : 배열객체
// question : String
// options : String[]
// answer : number
// explanation : String

import { useEffect, useState } from "react";
import "./App.css";
import OptionsList from "./components/OptionsList.jsx";

function App() {
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

  const [quiz, setQuiz] = useState(quizData);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedAnswer[currentIdx] !== undefined) {
      console.log(
        `선택한 보기: ${selectedAnswer[currentIdx]}, 정답: ${quiz[currentIdx].answer}`
      );
    }
  }, [currentIdx, selectedAnswer, quiz]);


  function handleSelect(idx) {
    setSelectedAnswer((prev) => ({
      ...prev,
      [currentIdx]: idx // 현재 문제의 선택값을 저장
    }))
  }

  function buttonPrev() {
    if (currentIdx > 0) {
      console.log(currentIdx);
      setCurrentIdx((prev) => prev - 1); // 비동기 업데이트가 여러 번 몰려도 꼬이지 않음.
      setIsSubmitted(false) // 문제 넘기면 정답 숨기기
    } else {
      window.alert("첫 번째 문제입니다.");
    }
  }

  function buttonNext() {
    if (currentIdx < 4) {
      console.log(currentIdx);
      setCurrentIdx((prev) => prev + 1); // 비동기 업데이트가 여러 번 몰려도 꼬이지 않음.
      setIsSubmitted(false) // 문제 넘기면 정답 숨기기

    } else {
      window.alert("마지막 문제입니다.");
    }
  }



  return (
    <>
      {/* question + options list */}
      <div>
        <OptionsList option={quiz}
          current={currentIdx}
          selected={selectedAnswer[currentIdx]}
          handleSelect={handleSelect}
        />
      </div>

      {isSubmitted && selectedAnswer[currentIdx] !== undefined && (
        <div>
          {selectedAnswer[currentIdx] === quiz[currentIdx].answer ? (
            <p style={{ color: "green" }}> 정답입니다!</p>
          ) : (
            <p style={{ color: "red" }}> 오답입니다. {quiz[currentIdx].answer + 1}</p>
          )}
          <p>👉 {quiz[currentIdx].explanation}</p>
        </div>
      )}

      <div>
        <button onClick={() => buttonPrev()} type="button">
          prev
        </button>
        <button onClick={() => buttonNext()} type="button">
          next
        </button>
        <button onClick={() => setIsSubmitted(true)} type="button">
          정답 제출
        </button>

      </div>


    </>
  );
}

export default App;

/* 
React 함수 컴포넌트는 “상태(State) → UI” 흐름이 핵심이에요.
setter(setCurrentIdx)를 호출해야 React 내부의 상태 큐에 “다음 값”이 들어가고, 그걸 기준으로 다시 렌더링이 일어납니다.


1. React 상태는 반드시 setter로만 변경한다.
2.setter에 새 값을 넘기면 React가 그걸 저장→재렌더.
*/
