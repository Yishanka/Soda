import PageTitle from "../components/PageTitle.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const logout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
    }
    navigate("/login-page");
  };

  return (
    <div className="profile-page">
        <PageTitle
          pageTitle="个人主页"
          pageSubTitle="“输入你的个性签名”"
        />
        <button onClick={logout} className="button">退出登录</button>
    </div>
  );
};
  
export default Profile;