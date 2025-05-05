import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();  
  
  // 动态导航重载，防止自动提交表单
  const token = localStorage.getItem("token");
  const goTo = (e: React.FormEvent, page: string) => {
    e.preventDefault();
    if (!token) {
      navigate("/login-page", {replace: true});
    }
    else navigate(page);
  };

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="logo-container">
            <img src="/images/SodaLogo.png" className="logo" />
            <span className="top-bar-title">速搭</span>
        </div>

        <div className="search-container">
            <img src="/icons/search.png" className="search-icon"></img>
            <input 
                type="text" 
                className="search-bar"
                placeholder="搜索..."
            />
        </div>

        <img
          src="/icons/avatar_origin.png" 
          className="avatar"
          onClick={(e) => goTo(e, "/profile-page")}
        /> 
        <button type = "button" onClick={(e) => goTo(e, "/profile-page")} className="profile-link"> 
          个人主页
        </button>
      </div>
    </div>
  );
};

export default TopBar;