import { useState } from "react";

const Post = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`发布成功！\n搭子名称: ${name}\n描述: ${description}`);
  };

  return (
    <div className="post">
        <h1>发布你的搭子需求</h1>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="你的名字"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="需求描述"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="btn">发布</button>
      </form>
    </div>
  );
};

export default Post;
