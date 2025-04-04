import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle.js";
import ApiRequest from "../utils/ApiRequest.js";
import Auth from "../models/Auth.js";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const { Post } = ApiRequest();
    const [formData, setFormData] = useState<Auth>({ email: "", password: "" });

    // 允许 `/login-page` 和 `/register-page`，否则强制跳回 `/login-page`
    useEffect(() => {
        const allowedPaths = ["/login-page", "/register-page"];
        if (!allowedPaths.includes(location.pathname)) {
            navigate("/login-page", { replace: true }); // 防止默认提交表单
        }
    }, [location.pathname]);

    // 拦截手动改 URL
    useEffect(() => {
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            if (!["/login-page", "/register-page"].includes(location.pathname)) return;
            return originalPushState.apply(window.history, args);
        };
    }, []);
    
    // 登录成功后才能跳转
    const submitLogin = async (e: any) => {
        setIsLoading(true)
        e.preventDefault();
        setError("");
        try {
            const data = await Post("login", formData, false, e);
            localStorage.setItem("token", data.token);
            navigate("/find-page"); // 只有登录成功才跳转
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <PageTitle pageTitle="登录" pageSubTitle="“在这里发现奇遇”" />
            <form className="form" onSubmit={submitLogin}>
                <div className="input-container">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <input
                        className="input"
                        type="email"
                        placeholder="邮箱"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        className="input"
                        type="password"
                        placeholder="密码"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="button">登录</button>
                <p className="mt-4 text-center">
                    没有账号？ <Link to="/register-page">去注册</Link>
                </p>
            </form>
            {isLoading?(<span>登陆中，请稍后</span>):<></>}
        </div>
    );
};

export default Login;