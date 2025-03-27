import { Link } from 'react-router-dom'; // 引入 Link 组件，用于路由跳转

// 定义我的活动页
const MyActivity = () => {
  return (
    <div className="my-activity-page">
      <h1>我的活动</h1>
      {/* 示例搭子数据 */}
      <div className="my-act-links">
        <Link to="/apply" className="my-act-link">申请活动</Link> {/* 跳转到申请活动页 */}
        <Link to="/participate" className="my-act-link">参与活动</Link> {/* 跳转到参与活动页 */}
      </div>
    </div>
  );
};

export default MyActivity;