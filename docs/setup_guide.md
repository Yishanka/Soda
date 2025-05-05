# 🛠️ SodaSpeedMatch 开发环境搭建指南

本指南详细介绍 **SodaSpeedMatch** 的开发环境安装、数据库配置及运行步骤。

---

## 1️⃣ **安装开发环境**

### 1.2 **安装 Node.js 18+**（运行前端 & Electron）

- 下载安装：[Node.js 官网](https://nodejs.org/)
- 检查是否安装成功：
  ```bash
  node -v
  npm -v
  ```

---

## 2️⃣ **配置 Supabase 远程数据库**

本项目使用 **Supabase 托管的 PostgreSQL**，无需本地运行数据库。

### 2.1 **创建 Supabase 项目**

1. 访问 [Supabase 官网](https://supabase.com/)，注册并创建一个新项目。
2. 进入项目 **Dashboard**，点击 `Database` 选项卡。
3. 复制 `Connection String`（格式如下）：
   ```
   postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_ID].supabase.co:5432/postgres
   ```

### 2.2 **配置环境变量**

1. 在 `backend/.env` 文件中添加数据库连接信息：

```ini
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_ID].supabase.co:5432/postgres
```

2. **在 GitHub 上共享数据库信息的方法**（避免直接暴露密码）：
   - **方法 1**：让团队成员手动创建 `.env` 文件，并私下分享 `DATABASE_URL`。

---

## 3️⃣ **安装 & 运行前端（React + Electron）**

### 3.1 **安装前端依赖**

```bash
cd frontend
npm install
```

### 3.2 **运行前端**

```bash
npm run dev
```

---

## 4️⃣ **GitHub 相关配置**

### 4.1 **初始化 Git 仓库**

```bash
git init
git add .
git commit -m "Initial commit"
```

### 4.2 **添加远程仓库**

```bash
git remote add origin https://github.com/你的GitHub用户名/SodaSpeedMatch.git
git branch -M main
git push -u origin main
```

### 4.3 **创建 ****`.gitignore`****（忽略不必要的文件）**

在 `SodaSpeedMatch/.gitignore` 添加：
supabase_config.json

__pycache__/
*.exe
*.app
*.asar

.idea/

.DS_Store
Thumbs.db

node_modules/

dist/
dist-electron/

.env
.env.local
.env.development
.env.production

.vite/
.cache/
out/
build/
tsconfig.tsbuildinfo

.DS_Store
Thumbs.db
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

.vscode/

---

## 5️⃣ **常见问题 & 解决方案**

### ❓ `npm install` 失败？

✅ 解决方案：

```bash
rm -rf node_modules package-lock.json
npm install
```

### ❓ Supabase 连接失败？
supabase的连接需要检查网络环境，家中由于是IPv4网络，因此无法通过direct connection。
后续如果部署到服务器，需要用IPv6，并直接使用direct connection的uri，需要修改！！！！
tsc 编译前端

cd backend
pip install flask
---

✅ **现在，你的环境已准备就绪！开始开发吧 🚀！**

