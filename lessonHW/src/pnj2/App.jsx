// src/App.jsx

import React from "react";
import Quiz from "./Quiz.jsx";
import "./assets/scss/style.scss"; // 전역 스타일 import

/**
 * App 컴포넌트
 * - 전체 애플리케이션의 루트 컴포넌트
 * - 퀴즈 제목과 <Quiz /> 컴포넌트를 렌더링
 */
function App() {
  return (
    <div className="app">
      <h1>React 퀴즈</h1>
      <Quiz />
    </div>
  );
}

export default App;
