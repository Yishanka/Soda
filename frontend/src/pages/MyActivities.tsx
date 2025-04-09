import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest.js";
import MatchCard from "../components/MatchCard.js";
import PageTitle from "../components/PageTitle.js";
import ActivityInfo from "../interface/ActivityInfo.js";

const MyActivities = () => {
  const { get } = apiRequest();
  const [createdActivities, setCreatedActivities] = useState<ActivityInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getCreatedActivities = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    if (token) {
      headers["Authorization"] = `${token}`;
    }
    
    try {
      const data: [] = await get("activity", "get_creator_activities")
      setCreatedActivities(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCreatedActivities();
  }, []);
  
  return (
    <div className="my-activities-page">
      <PageTitle
          pageTitle="我的活动"
          pageSubTitle= "“最远处里，有最近的人”"
      />
      <div className='list-container'>
        <h1>我创建的活动</h1>
        <div className='list'>
          {error && <p style={{ color: "red" }}>{error}</p>}
            {isLoading ? (
              <p className="loading">玩命加载中...</p>
            ) : createdActivities.length > 0 ? (
              createdActivities.slice().reverse().map((activity) => (
                <MatchCard
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
      <div className='list-container'>
        <h1>我参与的活动</h1>
      </div>
      <PageTitle
          pageTitle="我的搭子"
          pageSubTitle= "“星河里有着你的回忆”"
      />
    </div>
  );
};

export default MyActivities;