import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/login">로그인</Link>
      <Link to="/boardlist">전체글</Link>
      <Link to="/myposts">내 포스트</Link>
      <Link to="/logout">로그아웃</Link>
    </nav>
  );
};
export default NavBar;
