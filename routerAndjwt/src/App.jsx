import { BrowserRouter, Route, Routes } from "react-router-dom";
//  ㄴ 🎫클라이언트 사이드 라우터 지원
//  ㄴ ㄴ ㄴ프론트엔드 endpoint(url) 과 component 를 매핑
import Home from "./components/Home";
import Login from "./components/Login";
import BoardList from "./components/BoardList";
import MyPosts from "./components/MyPosts";
import Logout from "./components/Logout";
import Layout from "./components/Layout";


const App = () => {
  return (
    <BrowserRouter>
      <h1>....</h1>
      <Routes>
        {/* Layout 을 적용하기 위한 Route 들을 감싸면, 자식 Route 가 렌더링 될때 Layout 이 같이 보임 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
