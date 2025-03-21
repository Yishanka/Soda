from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os

# 读取环境变量中的数据库 URL
DATABASE_URL = os.getenv("DIRECT_DB_URL")

# 创建数据库异步引擎
engine = create_async_engine(DATABASE_URL, future=True, echo=True)

# 创建数据库会话
SessionLocal = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# 依赖注入：获取数据库会话
async def get_db():
    async with SessionLocal() as session:
        yield session