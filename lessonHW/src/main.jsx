import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./LimMS/App";
import App from "./pnj2/App";
import Quiz from "./osh/Quiz";
// import App from "./kmj/App";
// import './index.css'
// import App from "./App.jsx";
// import QuizApp from "./hsa/Quiz.jsx";
// import QuizApp from "./kwsy/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Quiz />
  </StrictMode>
);
