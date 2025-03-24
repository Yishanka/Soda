import { Link } from 'react-router-dom'; // 引入 Link 组件，用于路由跳转

// 定义导航栏组件
const NavBar = () => {
  return (
    <nav className="navbar">
      {/* 网站 Logo */}
      <div className="logo">Soda 速搭</div>

      {/* 导航链接 */}
      <div className="nav-links">
        <Link to="/" className="nav-link">主页</Link> {/* 跳转到主页 */}
        <Link to="/post" className="nav-link">发布需求</Link> {/* 跳转到发布需求页面 */}
      </div>
    </nav>
  );
};

export default NavBar;
