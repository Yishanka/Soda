import MatchCard from "../components/MatchCard.js";
import PageTitle from "../components/PageTitle.js";
import { useEffect, useState } from "react";
import Activity from "../models/Activity.js";
import ApiRequest from "../utils/ApiRequest.js";

const Find = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { Get } = ApiRequest();

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const data: Activity[] = await Get("activities");
      setActivities(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="find-page">
      <PageTitle
        pageTitle="发现活动"
        pageSubTitle="“抛向人海的漂流瓶，在等着有心人拾起”"
      />

      <div className="list-container">
        {/* 刷新按钮 */}
        <img
          src="/icons/refresh.png"
          onClick={fetchActivities}
          className="refresh-button" 
        >
        </img>

        {/* 滚动容器 */}
        <div className="list">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {isLoading ? (
            <p className="loading">玩命加载中...</p>
          ) : activities.length > 0 ? (
            activities.slice().reverse().map((activity) => (
              <MatchCard
                key={activity.id}
                title={activity.title}
                time={activity.time}
                location={activity.location}
                tags={activity.tags}
                creator_name={activity.creator_name}
              />
            ))
          ) : (
            <p>暂无活动，快去创建吧！</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Find;