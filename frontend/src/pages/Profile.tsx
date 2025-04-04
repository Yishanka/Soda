import PageTitle from "../components/PageTitle.js";
import { useNavigate } from "react-router-dom";
// 定义个人信息页
const Profile = () => {
  const navigate = useNavigate();

  const logout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
    }
    navigate("/login-page"); // 无论是否有 token，都跳转到登录界面
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