import { Link } from 'react-router-dom'; // 引入 Link 组件，用于路由跳转
import PageTitle from '../components/PageTitle.js';
// 定义我的活动页
const MyActivities = () => {
  return (
    <div className="my-activities-page">
      <PageTitle
          pageTitle="我的活动"
          pageSubTitle= "“最远处里，有最近的人”"
      />
      <div className='lists-container'>
        <div className='list-container'>

        </div>
        <div className='list-container'>

        </div>
      </div>
      <div className="my-act-links">
        <Link to="/apply-page" className="my-act-link">申请活动</Link> {/* 跳转到申请活动页 */}
        <Link to="/participate-page" className="my-act-link">参与活动</Link> {/* 跳转到参与活动页 */}
      </div>
      <PageTitle
          pageTitle="我的搭子"
          pageSubTitle= "“星河里有着你的回忆”"
      />
    </div>
  );
};

export default MyActivities;