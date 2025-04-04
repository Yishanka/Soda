import { useState, useEffect } from "react";
import { useNavigate, useLocation  }  from "react-router-dom";
import Select from 'react-select';
import TAG_OPTIONS from "../utils/TAG_OPTIONS.js";
import PageTitle from "../components/PageTitle.js";
import ApiRequest from "../utils/ApiRequest.js";
import Activity from "../models/Activity.js";

const STORAGE_KEY = "post_activity_draft"; // 本地存储键名

const PostActivity = () => {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { Post } = ApiRequest();
  const [isLoading, setIsLoading] = useState(false);
  const [isSave, setIsSave] = useState(false); // 🆕 追踪是否是用户手动输入
  const [formData, setFormData] = useState<Activity>({
      title: "",
      time: "",
      location: "",
      tags: "",
      description: "",
    }
  );

  // **进入页面时加载草稿**
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, []);

  // **输入时只在用户手动修改后保存**
  useEffect(() => {
    if (isSave) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  //表单提交处理函数
  const submitActivity = async (e: any) => {
    setIsLoading(true)
    e.preventDefault(); 
    try {
        await Post("activities", formData, true, e);
        localStorage.removeItem(STORAGE_KEY);
        navigate("/find-page");
    } catch (err: any) {
        setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 动态调整文本框高度
  const adjustTextareaHeight = (e:any) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  
  return (
    <div className="post-activity-page">
      <PageTitle
        pageTitle="创建你的活动"
        pageSubTitle= "“空谷传声，自有回音”"
      />
      <form className="form" onSubmit={submitActivity}>
        {/* 活动标题输入框 */}          
        <div className="input-container">
          <label className="label">活动标题</label>
          <br></br>
          <input 
            className="input"
            type="text"
            placeholder="例如：周五晚羽毛球局"
            value={formData.title}
            required // HTML5原生必填验证
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              setIsSave(true);
              }
            } 
          />
        </div>

        {/* 活动时间选择器 */}
        <div className="input-container">
          <label className="label">活动时间</label>
          <br></br>
          <input 
            className="time-select"
            type="datetime-local"
            value={formData.time}
            required
            onChange={(e) => {
              setFormData({ ...formData, time: e.target.value });
              setIsSave(true);
            }
          }
          />
        </div>
        
        {/* 活动地点输入框 */}
        <div className="input-container">
          <label className="label">活动地点</label>
          <br></br>
          <input 
            className="input"
            type="text"
            placeholder="地点"
            value={formData.location}
            required
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
              setIsSave(true);
            }
          }
          />
        </div>

        {/* 活动标签选择 */}
        <div className="input-container">
          <label className="label">活动标签</label>
          <br></br>
          <Select 
            isMulti={true}
            classNamePrefix="react-select"
            placeholder="选择标签..."
            value={TAG_OPTIONS.filter((tag) => formData.tags.includes(tag.value))}
            required
            options={TAG_OPTIONS}
            onChange={(selected) => {
              setFormData({ ...formData, tags: selected.map(tag => tag.value).join(",")});
              setIsSave(true);
            }
          }
          />
        </div>
        
        {/* 活动详细描述文本域 */}
        <div className="input-container">
          <label className="label">详细描述</label>
          <br></br>
          <textarea
            className="textarea"
            placeholder="请描述活动详情、要求等信息..."
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              setIsSave(true);
              adjustTextareaHeight(e);
            }}
            rows={3} // 初始行数
          />
        </div>

        {/* 提交按钮 */}
        <button type="submit" className="button">发布活动</button>
        {/* 错误提示（当error存在时显示） */}
        {error && <p style={{ color: 'red' }} className="error">{error}</p>}
      </form>

      {isLoading?(<span>发布中，请稍后</span>):<></>}
    </div>
  );
};

export default PostActivity;
