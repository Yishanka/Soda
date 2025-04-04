import PageTitle from "../components/PageTitle.js";
import { Link } from "react-router-dom";

// 定义已申请列表
const Applied = () => {
    return (
      <div className="apply-page">
        <PageTitle
          pageTitle="已申请列表"
          pageSubTitle="“抛向人海的漂流瓶，在等着有心人拾起”"
        />
        <Link to="/my-activities-page" className="button">返回</Link>
      </div>
    );
  };
  
  export default Applied;