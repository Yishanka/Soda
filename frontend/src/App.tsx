import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React 路由功能
import NavBar from "./components/NavBar.js";
import Home from "./pages/Home.js";
import Post from "./pages/Post.js";
import "./App.css"

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* 访问 "/" 时，显示 Home 页面 */}
        <Route path="/post" element={<Post />} />{/* 访问 "/post" 时，显示 Post 页面 */}
      </Routes>
    </Router>
  );
};

export default App;
