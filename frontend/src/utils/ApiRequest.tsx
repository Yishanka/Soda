const ApiRequest = () => {

  const Post = async (endpoint: string, formData: any, auth = true, e?: any) => {
    if (e) e.preventDefault();
    const token = localStorage.getItem("token");

    if (auth && !token) {
      throw new Error("请先登录");
    }

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (auth && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "连接错误，请检查网络问题");
      }

      return await response.json();
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const Get = async (endpoint: string, auth = true) => {
    const token = localStorage.getItem("token");

    if (auth && !token) {
      throw new Error("请先登录");
    }

    try {
      const headers: Record<string, string> = {};
      if (auth && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "连接错误，请检查网络问题");
      }

      return await response.json();
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return { Post, Get };
};

export default ApiRequest;