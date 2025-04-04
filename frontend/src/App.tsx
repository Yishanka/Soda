import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar.js";
import TopBar from "./components/TopBar.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Find from "./pages/Find.js";
import MyActivities from "./pages/MyActivities.js";
import Participate from "./pages/Participate.js";
import Applied from "./pages/Applied.js";
import PostActivity from "./pages/PostActivity.js";
import Profile from "./pages/Profile.js";
import "./App.css";

// **全局身份验证拦截**
const AuthGuard = ({ setBlocking }: { setBlocking: (value: boolean) => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const publicPaths = ["/login-page", "/register-page"];
    if (!token && !publicPaths.includes(location.pathname)) {
      setBlocking(true);
      setTimeout(() => {
        navigate("/login-page");
        setBlocking(false);
      }, 3000);
    }
  }, [location.pathname]);

  return null; // 这个组件不渲染 UI，仅用于权限控制
};

const App = () => {
  const [isBlocking, setBlocking] = useState(false);
  // **全局禁止交互：阻止所有点击事件**
  useEffect(() => {
    if (isBlocking) {
      const blockEvent = (event: Event) => event.preventDefault();
      document.addEventListener("click", blockEvent, true);
      document.addEventListener("keydown", blockEvent, true);
      return () => {
        document.removeEventListener("click", blockEvent, true);
        document.removeEventListener("keydown", blockEvent, true);
      };
    }
  }, [isBlocking]);

  return (
    <Router>
      {/* 启用身份验证拦截 */}
      <AuthGuard setBlocking={setBlocking} />
      {/* 在 isBlocking 时，仅显示当前页面，禁止切换 */}
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
      <TopBar />
      {!isBlocking && (
        <div className="main">
          <Routes>
            <Route path="/login-page" element={<Login />} />
            <Route path="/register-page" element={<Register />} />
            <Route path="/find-page" element={<Find />} />
            <Route path="/my-activities-page" element={<MyActivities />} />
            <Route path="/post-activity-page" element={<PostActivity />} />
            <Route path="/apply-page" element={<Applied />} />
            <Route path="/participate-page" element={<Participate />} />
            <Route path="/profile-page" element={<Profile />} />
          </Routes>
        </div>
      )}
      <NavBar />

      {/* 遮罩层，阻止交互 */}
      {isBlocking && (
        <h1>未登录，3 秒后跳转到登录页面...</h1>
      )}
    </Router>
  );
};

export default App;
