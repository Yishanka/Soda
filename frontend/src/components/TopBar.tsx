import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="logo-container">
            <img src="/images/SodaLogo.png" alt="Soda 速搭" className="logo" />
            <span className="title">速搭</span>
        </div>

        <div className="search-container">
            <img src="\icons\search.png" className="search-icon"></img>
            <input 
                type="text" 
                className="search-bar" 
                placeholder="搜索..."
            />
        </div>

        <img
          src="/icons/avatar_origin.png" 
          alt="个人头像"
          className="avatar"
          onClick={() => navigate("/profile")}
        /> 
      </div>
    </div>
  );
};

export default TopBar;