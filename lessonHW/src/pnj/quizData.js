export const quizData = [
  {
    question: "useState를 사용하여 상태를 초기화할 때 올바른 코드 형태는 무엇인가요?",
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
    question: "useEffect 훅은 언제 실행되나요?",
    options: [
      "컴포넌트가 언마운트될 때만",
      "렌더링 후 매번",
      "의존성 배열이 변경될 때만",
      "렌더링 전 항상",
    ],
    answer: 2,
    explanation:
      "useEffect는 기본적으로 컴포넌트가 마운트된 이후와 의존성 배열(deps)이 바뀔 때 실행됩니다.",
  },
  {
    question: "React에서 컴포넌트를 만드는 올바른 방법은?",
    options: [
      "function MyComponent[] {}",
      "const MyComponent = () => {}",
      "component MyComponent() {}",
      "let MyComponent = createComponent()",
    ],
    answer: 1,
    explanation:
      "React 함수형 컴포넌트는 일반적으로 화살표 함수나 function 키워드를 사용하여 정의합니다.",
  },
  {
    question: "JSX에서 class 속성을 사용할 때 올바른 방법은?",
    options: [
      "class",
      "css-class",
      "className",
      "styleClass",
    ],
    answer: 2,
    explanation: "JSX에서는 class 대신 className 속성을 사용합니다.",
  },
  {
    question: "React에서 key 속성은 왜 필요한가요?",
    options: [
      "컴포넌트 이름을 지정하려고",
      "렌더링 속도 증가",
      "DOM 요소의 고유성 확보",
      "배열 요소를 구분하기 위해",
    ],
    answer: 3,
    explanation:
      "key는 React가 어떤 항목이 변경, 추가 또는 제거되었는지 식별하는 데 도움을 줍니다. 주로 리스트 렌더링 시 사용됩니다.",
  },
];
