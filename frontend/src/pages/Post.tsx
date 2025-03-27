// 导入React核心库和状态管理钩子，以及路由跳转钩子
import { useState } from "react";
import { useNavigate }  from "react-router-dom";
import Select from 'react-select';
import TagOptions from "../utils/TagOptions.js";

// 定义发布活动界面
const Post = () => {
  // 使用useState管理表单数据，包含标题、时间、地点、标签、描述字段
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    location: '',
    tags: '',
    description: '',
  });

  // 动态调整文本框高度
  const adjustTextareaHeight = (e:any) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // 错误状态，用于显示提交时的错误信息
  const [error, setError] = useState('');
  // 使用useNavigate实现页面跳转
  const navigate = useNavigate();

  //表单提交处理函数
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // 阻止默认表单提交行为
    try {
      // 发送POST请求到后端接口
      const response = await fetch('http://localhost:5000/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // 设置请求头为JSON格式
        body: JSON.stringify(formData), // 将表单数据转为JSON字符串
      });
      // 如果响应状态码非2xx，抛出错误
      if (!response.ok) throw new Error('发布失败');
      // 跳转到用户活动管理页面
      navigate('/my-activity');
    } catch (err: any) {
      // 捕获错误并更新错误状态
      setError(err.message);
    }
  }; 
  
  return (
    <div className="post-page">
        <h1 className="page-title">发布你的搭子请求</h1>
        <form className="post-form" onSubmit={handleSubmit}>
        
        <div className="input-container">
          <label className="label">活动标题</label>
          <br></br>
          <input 
            className="input"
            type="text"
            placeholder="例如：周五晚羽毛球局"
            required // HTML5原生必填验证
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* 活动时间选择器 */}
        <div className="input-container">
          <label className="label">活动时间</label>
          <br></br>
          <input 
            className="input"
            type="datetime-local"
            required
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
            required
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        {/* 活动标签选择 */}
        <div className="input-container">
          <label className="label">活动标签</label>
          <br></br>
          <Select 
              classNamePrefix="react-select"
              isMulti={true}
              options={TagOptions}
              onChange={(selected) => setFormData({ ...formData, tags: selected.map(tag => tag.value).join(",")})}
              placeholder="选择标签..."
            />
        </div>
        
        {/* 活动详细描述文本域 */}
        <div className="input-container">
          <label className="label">详细描述</label>
          <br></br>
          <textarea
          className="textarea"
            placeholder="请描述活动详情、要求等信息..."
            // style={{ ...styles.input, ...styles.textarea }}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
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
    </div>
  );
};

export default Post;
