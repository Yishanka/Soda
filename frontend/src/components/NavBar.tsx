import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate()

  // 动态导航重载，防止自动提交表单
  const token = localStorage.getItem("token");
  const goTo = (e: React.FormEvent, page: string) => {
    e.preventDefault();
    if (!token) {
      navigate("/login-page");
    }
    else navigate(page);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button type = "button" onClick={(e) => {goTo(e,"find-page")}} className="nav-link">发现</button>
        <button type = "button" onClick={(e) => {goTo(e,"post-activity-page")}} className="nav-link">创建活动</button>
        <button type = "button" onClick={(e) => {goTo(e,"my-activities-page")}} className="nav-link">我的</button>
      </div>
    </nav>
  );
};

export default NavBar;