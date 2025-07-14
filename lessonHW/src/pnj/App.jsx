// src/App.jsx
import React from "react";
import Quiz from "./Quiz.jsx";
import "./assets/scss/style.scss";

function App() {
  return (
    <div className="app">
      <h1>React 퀴즈</h1>
      <Quiz />
    </div>
  );
}

export default App;
