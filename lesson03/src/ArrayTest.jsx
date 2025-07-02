import { useRef, useState } from "react";

function App() {
  // 할일 목록 배열
  const initVal = [
    {
      id: 1,
      text: "리액트 수업 복습",
      checked: true,
    },
    {
      id: 2,
      text: "리액트 프로젝트 기획",
      checked: false,
    },
    {
      id: 3,
      text: "데이터베이스 테스트",
      checked: true,
    },
  ];
  const [todos, setTodos] = useState(initVal);
  const maxid = useRef(todos.length + 1);
  const [value, setValue] = useState("");

  function handleChecked(id) {
    // 배열 자체를 바꿔야 상태 변경됩니다.
    // 배열 특정 요소의 checked 값만 변경한 것을 새로운 배열로 하여 todos 변경
    // ! 연산자는 참은 거짓, 거짓은 참으로 변경
    const newtodos = todos.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    // 상태가 바뀝니다.
    setTodos(newtodos);
    console.log("handleChecked:", todos);  
    // 바로 반영된것이 보이지 않아요.(재렌더링하기 전의 값을 출력)
  }

  return (
    <div>
      {/* onClick 에서 실행할 함수안에서 handleChecked(1) 호출 */}
      <button onClick={() => handleChecked(1)}>id=1 checked 값 변경</button>
      <button onClick={() => handleChecked(2)}>id=2 checked 값 변경</button>
      <button onClick={() => handleChecked(3)}>id=3 checked 값 변경</button>
    </div>
  );
}

export default App;
