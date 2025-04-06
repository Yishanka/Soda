import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login-page" || location.pathname === "/register-page";
  const isLoggedIn = !(localStorage.getItem("token") === null);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link
          to="/find-page"
          className="nav-link"
          onClick={(e) => !isLoggedIn && isAuthPage && e.preventDefault()} // 未登录时拦截
        >
          发现
        </Link>

        <Link
          to="/post-activity-page"
          className="nav-link"
          onClick={(e) => !isLoggedIn && isAuthPage && e.preventDefault()}
        >
          创建活动
        </Link>

        <Link
          to="/my-activities-page"
          className="nav-link"
          onClick={(e) => !isLoggedIn && isAuthPage && e.preventDefault()}
        >
          我的
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;