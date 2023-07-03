import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "#000",
};

const Blogpost = ({ blogpost }) => {
  const random = Math.floor(Math.random() * 3) + 1;

  return (
    <div className="blogpost-details">
      <Link
        to={`/post/${blogpost._id}`}
        className="container-image"
        style={linkStyle}
      >
        <img
          className={blogpost.cover && "cover-image"}
          src={
            blogpost.cover
              ? `http://localhost:5000/${blogpost.cover}`
              : `/assets/${random}.jpg`
          }
          alt="image"
        />
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
