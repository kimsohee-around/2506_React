import React, { useState, useEffect, useRef, useCallback } from "react";
import { quizData as originalQuizData } from "./quizData";

const TIME_LIMIT = 30;

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function prepareShuffledQuizData(data) {
  return data.map((q) => {
    const correctValue = q.options[q.answer];
    const shuffled = shuffleArray(q.options);
    const newAnswer = shuffled.indexOf(correctValue);
    return { ...q, options: shuffled, answer: newAnswer };
  });
}

function Quiz() {
  const [quizData, setQuizData] = useState(() =>
    shuffleArray(prepareShuffledQuizData(originalQuizData))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answerHistory, setAnswerHistory] = useState(
    quizData.map(() => ({ tries: 0, isCorrect: false, selected: null }))
  );
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [message, setMessage] = useState("");
  const [gifSrc, setGifSrc] = useState("");
  const [showTryAgainBtn, setShowTryAgainBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [canRetry, setCanRetry] = useState(false);

  const quizStartTime = useRef(Date.now());
  const timerId = useRef(null);
  const current = quizData[currentIndex];

  // 상태 변수들 정리
  const allDone = quizEndTime !== null;
  const allCorrect = allDone && score === quizData.length;
  const allWrong = allDone && score === 0;

  // 정답/오답 기록 업데이트
  const updateAnswerHistory = (idx, isCorrect, tries, selectedIdx) => {
    setAnswerHistory((prev) => {
      const newHistory = [...prev];
      newHistory[idx] = { tries, isCorrect, selected: selectedIdx };
      return newHistory;
    });
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleTimeout = useCallback(() => {
    const { isCorrect, tries } = answerHistory[currentIndex];
    if (isCorrect) return; // 정답 맞힌 경우 timeout 처리 안 함

    if (tries === 0) {
      setMessage("⏰ 시간 초과! 다시 시도해보세요.");
      setGifSrc("/images/try-again.gif");
      setShowTryAgainBtn(true);
      setCanRetry(false);
      updateAnswerHistory(currentIndex, false, tries + 1, selected);
    } else {
      setMessage("❌ 오답입니다! 다음 문제로 넘어가세요.");
      setGifSrc("/images/wrong.gif");
      setShowAnswer(true);
      setShowNextBtn(true);
      setShowTryAgainBtn(false);
      setCanRetry(false);
      updateAnswerHistory(currentIndex, false, tries + 1, selected);
    }
  }, [answerHistory, currentIndex, selected]);

  // 타이머 제어: 정답 맞추거나 2번 틀린 경우 타이머 중지
  useEffect(() => {
    if (quizEndTime) return;

    const tries = answerHistory[currentIndex]?.tries || 0;
    const isCorrect = answerHistory[currentIndex]?.isCorrect || false;

    if (isCorrect || tries >= 2) {
      clearInterval(timerId.current);
      setTimeLeft(0);
      return;
    }

    setTimeLeft(TIME_LIMIT);
    clearInterval(timerId.current);

    timerId.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerId.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [currentIndex, quizEndTime, answerHistory, handleTimeout]);

  const handleSelect = (idx) => {
    const tries = answerHistory[currentIndex].tries;
    if (
      showAnswer ||
      answerHistory[currentIndex].isCorrect ||
      tries >= 2 ||
      timeLeft === 0 ||
      (tries === 1 && !canRetry)
    )
      return;

    setCanRetry(false);
    setSelected(idx);

    if (idx === current.answer) {
      setShowAnswer(true);
      setMessage("✅ 정답입니다!");
      setGifSrc("/images/correct.gif");
      setShowTryAgainBtn(false);
      setShowNextBtn(true);
      updateAnswerHistory(currentIndex, true, tries + 1, idx);
    } else {
      if (tries === 0) {
        setMessage("❌ 오답입니다! 다시 시도해보세요.");
        setGifSrc("/images/try-again.gif");
        setShowTryAgainBtn(true);
        setShowAnswer(false);
        setCanRetry(false);
        updateAnswerHistory(currentIndex, false, tries + 1, idx);
      } else {
        setMessage("❌ 오답입니다! 다음 문제로 넘어가세요.");
        setGifSrc("/images/wrong.gif");
        setShowAnswer(true);
        setShowNextBtn(true);
        setShowTryAgainBtn(false);
        updateAnswerHistory(currentIndex, false, tries + 1, idx);
      }
    }
  };

  const handleTryAgain = () => {
    setSelected(null);
    setShowAnswer(false);
    setMessage("");
    setGifSrc("");
    setShowTryAgainBtn(false);
    setShowNextBtn(false);
    setCanRetry(true);
    setTimeLeft(TIME_LIMIT);
    clearInterval(timerId.current);
    timerId.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerId.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetState = (index) => {
    const prev = answerHistory[index];
    setSelected(prev.selected);
    setShowAnswer(prev.tries >= 2 || prev.isCorrect);
    setMessage("");
    setGifSrc("");
    setShowTryAgainBtn(prev.tries === 1 && !prev.isCorrect);
    setShowNextBtn(prev.tries >= 2 || prev.isCorrect);
    setCanRetry(false);
    setTimeLeft(TIME_LIMIT);
    clearInterval(timerId.current);
    timerId.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerId.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const goNext = () => {
    if (currentIndex < quizData.length - 1) {
      clearInterval(timerId.current);
      const next = currentIndex + 1;
      setCurrentIndex(next);
      resetState(next);
    } else {
      clearInterval(timerId.current);
      setQuizEndTime(Date.now());
    }
  };

  const handleRestart = () => {
    const shuffled = shuffleArray(prepareShuffledQuizData(originalQuizData));
    setQuizData(shuffled);
    setCurrentIndex(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setAnswerHistory(shuffled.map(() => ({ tries: 0, isCorrect: false, selected: null })));
    setTimeLeft(TIME_LIMIT);
    setMessage("");
    setGifSrc("");
    setShowTryAgainBtn(false);
    setShowNextBtn(false);
    setCanRetry(false);
    setQuizEndTime(null);
    quizStartTime.current = Date.now();
  };

  return (
    <div className="quiz">
      {!allDone && (
        <>
          <h3 className="quiz-progress">
            Quiz {currentIndex + 1} / {quizData.length} &nbsp; | &nbsp; 남은 시간: {timeLeft}s
          </h3>
          <h2>{current.question}</h2>
          <ul>
            {current.options.map((option, idx) => {
              const isCorrect = showAnswer && idx === current.answer;
              const isWrong = showAnswer && selected === idx && selected !== current.answer;
              const tries = answerHistory[currentIndex].tries;
              const disabled =
                tries >= 2 ||
                answerHistory[currentIndex].isCorrect ||
                (tries === 1 && !canRetry) ||
                timeLeft === 0;

              return (
                <li
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""} ${
                    disabled ? "disabled" : ""
                  }`}
                  style={{ pointerEvents: disabled ? "none" : "auto" }}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {(message || gifSrc) && !allDone && (
        <div className="feedback">
          <p>{message}</p>
          {gifSrc && <img src={gifSrc} alt="feedback gif" className="result-gif" />}
        </div>
      )}

      {answerHistory[currentIndex].tries === 1 && showTryAgainBtn && !allDone && (
        <button onClick={handleTryAgain} className="try-again-btn">
          다시 시도
        </button>
      )}

      {showNextBtn && !allDone && (
        currentIndex < quizData.length - 1 ? (
          <button onClick={goNext} className="next-btn">
            다음 문제로
          </button>
        ) : (
          <button
            onClick={() => setQuizEndTime(Date.now())}
            className="finish-btn"
          >
            결과 보기
          </button>
        )
      )}

      {/* 퀴즈 종료 화면 */}
      {allDone && (
        <div className="result">
          <h2>퀴즈 종료!</h2>
          <p>
            정답 개수: {score} / {quizData.length}
          </p>
          <p>소요 시간: {Math.floor((quizEndTime - quizStartTime.current) / 1000)}초</p>

          {allCorrect && (
            <>
              <img src="/images/congrats.gif" alt="축하" width="300" />
              <p>축하합니다! 전부 정답입니다! 🎉 수고하셨습니다.</p>
            </>
          )}

          {allWrong && (
            <>
              <img src="/images/the-end.gif" alt="끝" width="300" />
              <p style={{ color: "red", fontWeight: "bold", fontSize: "1.2rem" }}>
                NOOOOOOO!!! GOD!!! NO GOD PLEASE NO, NO! NO! NOOOOOOO!!!
              </p>
            </>
          )}

          {!allCorrect && !allWrong && (
            <>
              <img src="/images/gameover.gif" alt="결과" width="300" />
              <p>수고하셨습니다.</p>
            </>
          )}

          <button onClick={handleRestart} className="retry-btn">
            처음부터 다시 시작
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
