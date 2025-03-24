import MatchCard from "../components/MatchCard.js";// 引入导航栏组件
import NavBar from "../components/MatchCard.js";// 引入导航栏组件

// 定义主页
const Home = () => {
  return (
    <div className="home">
      <h1>欢迎来到 Soda 速搭</h1>
      <p>在这里，你可以快速找到你的搭子！</p>

      {/* 示例搭子数据 */}
      <div className="match-list">
        <MatchCard name="小明" description="想找人一起健身 💪" />
        <MatchCard name="小红" description="求一位考研搭子 📖" />
      </div>
    </div>
  );
};

export default Home;