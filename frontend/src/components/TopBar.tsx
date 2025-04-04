import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
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
          onClick={() => navigate("/profile-page")}
        /> 
        <Link to={"/profile-page"} className="profile-link"> 
          个人主页
        </Link>
      </div>
    </div>
  );
};

export default TopBar;