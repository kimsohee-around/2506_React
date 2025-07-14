import React, { useState } from 'react';

// App 컴포넌트 정의
function App() { // App.jsx 파일이므로 컴포넌트 이름을 App으로 변경했습니다.
  // 퀴즈 데이터 정의 (컴포넌트 내부에서 직접 정의)
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
      answer: 2, // 0부터 시작하는 인덱스
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

  // 각 질문에 대한 사용자의 선택을 저장
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // 결과 표시 여부 저장?
  const [showResults, setShowResults] = useState(false);
  // 최종 점수를 저장
  const [score, setScore] = useState(0);

  // 사용자가 옵션을 선택했을 때 호출되는 핸들러
  const handleOptionChange = (questionIndex, optionIndex) => {
    // 이전 상태를 복사하고, 특정 질문에 대한 답변만 업데이트
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: optionIndex,
    }));
  };

  // '결과 확인' 버튼 클릭 시 호출되는 핸들러
  const handleSubmitQuiz = () => {
    let newScore = 0;
    // 모든 퀴즈 데이터를 순회하며 점수 계산
    quizData.forEach((question, index) => {
      // 사용자가 해당 질문에 답변했고, 그 답변이 정답과 일치하는지 확인
      if (selectedAnswers[index] !== undefined && selectedAnswers[index] === question.answer) {
        newScore++;
      }
    });
    setScore(newScore); // 점수 업데이트
    setShowResults(true); // 결과 화면 표시
  };

  // '다시 시작' 버튼 클릭 시 호출되는 핸들러
  const restartQuiz = () => {
    setSelectedAnswers({}); // 답변 초기화
    setShowResults(false);  // 결과 화면 숨기기
    setScore(0);            // 점수 초기화
  };

  return (
    <div style={styles.container}>
      <h1>React 퀴즈</h1>
      {/* 퀴즈 문제들 (배열)을 가져와서 나열해 페이지에 띄우는 부분 */}
      {quizData.map((q, qIndex) => (
        <div key={qIndex} style={styles.questionBlock}>
          {/* 인덱스로 문제 번호(배열은 0부터시작이므로 +1을 해준다.) . 문제 내용 */}
          <h2>{qIndex + 1}. {q.question}</h2>
          <div style={styles.optionsContainer}>
            {/* 각 문제에 할당된 선택지도 같은 방법(map)으로 생성 및 호출 */}
            {q.options.map((option, oIndex) => (
              <button
                key={oIndex}
                style={{
                  ...styles.optionButton,
                  // 사용자가 현재 옵션을 선택했으면 배경색 변경
                  backgroundColor:
                    selectedAnswers[qIndex] === oIndex
                      ? '#f022aa' // 선택된 옵션
                      : '#000000', // 기본
                  // 결과가 표시될 때 정답과 오답에 따라 배경색 변경
                  ...(showResults && oIndex === q.answer && { backgroundColor: '#d4edda' }), // 정답
                  ...(showResults && selectedAnswers[qIndex] === oIndex && oIndex !== q.answer && { backgroundColor: '#f8d7da' }), // 오답
                }}
                onClick={() => handleOptionChange(qIndex, oIndex)}
                disabled={showResults} // 결과가 표시되면 버튼 비활성화
              >
                {option}
              </button>
            ))}
          </div>
          {showResults && ( // 결과가 표시될 때만 설명 표시
            <div style={styles.explanation}>
              <p><strong>설명:</strong> {q.explanation}</p>
            </div>
          )}
        </div>
      ))}

      <hr style={styles.divider} />

      {!showResults ? ( // 결과가 아직 표시되지 않았을 때만 '결과 확인' 버튼 표시
        <button
          style={{
            ...styles.button,
            // 모든 질문에 답했을 때만 버튼 활성화
            ...(Object.keys(selectedAnswers).length !== quizData.length && styles.buttonDisabled),
          }}
          onClick={handleSubmitQuiz}
          disabled={Object.keys(selectedAnswers).length !== quizData.length}
        >
          결과 확인
        </button>
      ) : ( // 결과가 표시될 때 점수와 '다시 시작' 버튼 표시
        <div style={styles.resultsContainer}>
          <h2>퀴즈 완료!</h2>
          <p>당신의 점수: {score} / {quizData.length}</p>
          <button style={styles.button} onClick={restartQuiz}>
            다시 시작
          </button>
        </div>
      )}
    </div>
  );
}

// 컴포넌트 내부에 스타일 객체 정의
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#000',
    textAlign: 'center',
  },
  questionBlock: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '15px',
    alignItems: 'center',
  },
  optionButton: {
    width: '90%',
    padding: '12px 18px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    wordBreak: 'keep-all',
  },
  explanation: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#e9ecef',
    borderLeft: '4px solid #007bff',
    textAlign: 'left',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#333',
  },
  divider: {
    margin: '40px 0',
    borderColor: '#eee',
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  resultsContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e2e6ea',
  }
};

export default App;