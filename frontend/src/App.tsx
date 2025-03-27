import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React 路由功能
import NavBar from "./components/NavBar.js";
import Home from "./pages/Home.js";
import MyActivity from "./pages/MyActivity.js";
import Participate from "./pages/Participate.js";
import Apply from "./pages/Apply.js";
import Post from "./pages/Post.js";
import TopBar from "./components/TopBar.js";
import "./App.css"

const App = () => {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* 访问 "/" 时，显示 Home 页面 */}
        <Route path="/my-activity" element={<MyActivity />} />{/* 访问 "/post" 时，显示 Post 页面 */}
        <Route path="/post" element={<Post />} />{/* 访问 "/post" 时，显示 Post 页面 */}
        <Route path="/apply" element={<Apply />} />{/* 访问 "/post" 时，显示 Post 页面 */}
        <Route path="/participate" element={<Participate />} />{/* 访问 "/post" 时，显示 Post 页面 */}
      </Routes>
      <NavBar />
    </Router>

  );
};

export default App;
