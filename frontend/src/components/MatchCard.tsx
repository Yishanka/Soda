// 引入 ActivityInfo 类型定义
import Activity from "../models/Activity.js";

// 定义 MatchCard 组件的属性接口
interface MatchCardProps extends Activity {
  // 可选的"联系TA"按钮点击回调函数
  onContact?: () => void;
}

const MatchCard = ({ 
  title, 
  time, 
  location, 
  tags, 
  creator_name,
  onContact 
}: MatchCardProps) => {
  return (
    <div className="card">
      {/* 卡片头部 - 包含标题和标签 */}
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span className="card-tag">{tags}</span>
      </div>
      
      {/* 活动详情 - 地点和时间 */}
      <div className="card-details">
        <div className="card-location">{location}</div>
        <div className="card-time">{time}</div>
      </div>
      
      {/* 卡片底部 - 创建者信息和联系按钮 */}
      <div className="card-footer">
        <span className="card-creator">
          By: {creator_name}
        </span>
        <button 
          className="button" 
          onClick={onContact}
        >
          联系TA
        </button>
      </div>
    </div>
  );
};

export default MatchCard;