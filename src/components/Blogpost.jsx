import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "#000",
};

const Blogpost = ({ blogpost }) => {
  return (
    <div className="blogpost-details">
      <Link
        to={`/post/${blogpost._id}`}
        className="container-image"
        style={linkStyle}
      >
        <img src={`http://localhost:5000/${blogpost.cover}`} alt="image" />
      </Link>
      <div className="blogpost-desc">
        <Link to={`/post/${blogpost._id}`} style={linkStyle}>
          <p className="title">{blogpost.title}</p>
        </Link>
        <p className="summary">{blogpost.summary}</p>
      </div>
    </div>
  );
};

export default Blogpost;
