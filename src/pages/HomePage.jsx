import Blogposts from "../components/Blogposts";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="page blogposts_page">
      <div className="btn-group">
        <Link to={userInfo ? "/create_post" : "/login"}>
          <button className="btn-create-post">Create a blog post</button>
        </Link>
      </div>
      <Blogposts />
    </div>
  );
};

export default HomePage;
