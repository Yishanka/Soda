-- 创建activities表
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,            -- 自增主键
    title TEXT NOT NULL,              -- 活动标题（必填）
    time TIMESTAMP NOT NULL,          -- 活动时间（必填，精确到秒）
    location TEXT NOT NULL,           -- 活动地点（必填）
    tags TEXT,                        -- 活动标签（可选，逗号分隔存储）
    description TEXT,                 -- 活动描述（可选）
    status TEXT DEFAULT 'draft',      -- 活动状态（默认草稿，可选值：draft/published）
    creator_id UUID REFERENCES users(id), -- 创建者ID，关联用户表（需先创建users表）
    created_at TIMESTAMP DEFAULT NOW() -- 记录创建时间（自动填充）
);
