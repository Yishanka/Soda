import MatchCard from "../components/MatchCard.js";// 引入导航栏组件

// 定义主页
const Home = () => {
  return (
    <div className="home-page">
      <h1 className="page-title">最新活动</h1>
      {/* 示例搭子数据 */}
      <div className="match-list">
        <MatchCard name="小明" description="想找人一起健身 💪" />
        <MatchCard name="小红" description="求一位考研搭子 📖" />
      </div>
    </div>
  );
};

export default Home;