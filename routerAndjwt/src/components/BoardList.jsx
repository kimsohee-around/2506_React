import { useEffect, useState } from "react";
import REQ_URL from "../js/request";

const BoardList = () => {
  // 게시판 글 서버 응답 저장
  const [boards, setBoards] = useState([]);
  // 페이지 설정
  const [currentPage, setCurrentPage] = useState(1);
  const boardPerPage = 5; // 1페이지에 5개

  useEffect(() => {
    // 요청 함수
    async function fetchBoards() {
      const token = localStorage.getItem("token");
      const response = await fetch(`${REQ_URL}/api/boards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json(); //json 문자열 body 를 js객체로
        setBoards(data);
      }
    } // 여기까지는 api 요청 함수 정의

    fetchBoards(); // 함수 실행
  }, []); // [] 의존성리스트가 비어있으면 처음 랜더링 할때 한번만 실행됨.
  console.log(boards); // 로그 출력은 여기서만 확인 가능

  
  return (
    <div>
      <h1>BoardList</h1>
    </div>
  );
};

export default BoardList;
