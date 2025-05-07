import { useNavigate } from "react-router-dom";

// 统一封装前后端通信的方法
const apiRequest = () => {
  const navigate = useNavigate();

  // POST 请求封装
  const post = async (prefix: string, endpoint: string, formData: any, e?: any) => {
    if (e) e.preventDefault(); // 如果传入了事件对象，阻止默认行为
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // 如果存在 token，将其添加到请求头中
    if (token) {
      headers["Authorization"] = `${token}`;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/${prefix}/${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData), // 将表单数据序列化为 JSON
      });

      // 如果响应不成功，抛出错误
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "连接错误，请检查网络问题");
      }

      return await response.json(); // 返回解析后的 JSON 数据
    } catch (err: any) {
      // 如果 token 无效，跳转到登录页面
      if (err.message === "INVALIDTOKEN") {
        localStorage.removeItem("token");
        navigate("/login-page");
      }
      throw new Error(err.message); // 抛出其他错误
    }
  };

  // GET 请求封装
  const get = async (prefix: string, endpoint: string) => {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // 如果存在 token，将其添加到请求头中
    if (token) {
      headers["Authorization"] = `${token}`;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/${prefix}/${endpoint}`, {
        method: "GET",
        headers: headers,
      });

      // 如果响应不成功，抛出错误
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "连接错误，请检查网络问题");
      }

      return await response.json(); // 返回解析后的 JSON 数据
    } catch (err: any) {
      // 如果 token 无效，跳转到登录页面
      if (err.message === "INVALIDTOKEN") {
        localStorage.removeItem("token");
        navigate("/login-page");
      }
      throw new Error(err.message);
    }
  };

  return { post, get };
};

export default apiRequest;