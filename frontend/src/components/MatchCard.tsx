import { useState } from "react";
import ActivityInfo from "../interface/ActivityInfo.js";

const MatchCard = ({title, time, location, tags, creator_name}: ActivityInfo) => {
  const Apply = async () => {
  };
  // const [isApply, setIsApply] = useState(false)
  return (
    <div className="card">
      {/* 卡片头部 - 包含标题和标签 */}
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <div className="card-tags">
          {tags.length>1 ? (
            tags.slice().map((tag) => (<span className="card-tag">{tag}</span>))
            ):(
              <span className="card-tag">{tags}</span>
          )}
        </div>
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
          onClick={Apply}
        >
          联系TA
        </button>
      </div>
    </div>
  );
};

export default MatchCard;